---
name: add-api-feature
description: Scaffold a new CQRS feature (query or command) in integrations-dotnet-api following the project's Clean Architecture + MediatR conventions. Use when adding a new endpoint, query, or command to the .NET API.
---

# Add a CQRS feature to integrations-dotnet-api

The .NET API uses Clean Architecture with MediatR (CQRS), FluentValidation, and AutoMapper. Every read is a **Query** and every write is a **Command**, each living in its own feature folder. Handlers, validators, and AutoMapper profiles are **auto-registered by assembly scanning** in `src/Application/ConfigureServices.cs` — never wire them up manually in DI.

## Folder & file layout

Create one folder per use case under `src/Application/<Feature>/{Queries|Commands}/<UseCaseName>/`:

- `<UseCaseName>Query.cs` (or `Command.cs`) — contains **both** the request and its handler in one file.
- `<UseCaseName>QueryValidator.cs` — `AbstractValidator<TRequest>` (FluentValidation). Always add one; the `ValidationBehaviour` pipeline runs it automatically before the handler.
- `<Dto>.cs` — only for queries that return data; implements `IMapFrom<TEntity>`.

## Patterns to copy

**Request + handler** (mirror `Application/Articles/Queries/GetArticle/GetArticleQuery.cs`):

```csharp
namespace Application.<Feature>.Queries.<UseCaseName>;

public class <UseCaseName>Query : IRequest<<Dto>>
{
    public string Slug { get; set; } = string.Empty;
}

public class <UseCaseName>QueryHandler : IRequestHandler<<UseCaseName>Query, <Dto>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationCosmosDbContext _cosmosDbContext;

    public <UseCaseName>QueryHandler(IMapper mapper, IApplicationCosmosDbContext cosmosDbContext)
    {
        _mapper = mapper;
        _cosmosDbContext = cosmosDbContext;
    }

    public async Task<<Dto>> Handle(<UseCaseName>Query request, CancellationToken cancellationToken)
    {
        var entity = await _cosmosDbContext.Articles.FirstOrDefaultAsync(x => x.Slug == request.Slug);
        return _mapper.Map<<Dto>>(entity);
    }
}
```

- Inject persistence through the **interfaces** in `Application/Common/Interfaces/Persistence/` (`IApplicationDbContext` for SQL Server, `IApplicationCosmosDbContext` for Cosmos) and outbound HTTP via `Common/Interfaces/ApiServices/` — never reference the Infrastructure project directly.
- Throw `NotFoundException` / `ValidationException` from `Application/Common/Exceptions/` rather than returning nulls or status codes; `GlobalExceptionHandler` maps them to ProblemDetails.

**DTO** (`IMapFrom<T>` auto-creates the AutoMapper map; override `Mapping(Profile)` only for custom member maps):

```csharp
public class <Dto> : IMapFrom<TEntity>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
}
```

**Validator**:

```csharp
public class <UseCaseName>QueryValidator : AbstractValidator<<UseCaseName>Query>
{
    public <UseCaseName>QueryValidator()
    {
        RuleFor(x => x.Slug).NotEmpty().MaximumLength(255);
    }
}
```

Validators may inject `IApplicationDbContext` and use `MustAsync` for DB-backed rules.

## Wire up the endpoint

Add an action to the matching controller in `src/WebApi/Controllers/`. Controllers inherit `ApiControllerBase` (exposes the MediatR `Mediator`/`Sender`) and must stay thin — dispatch and return, no business logic:

```csharp
[HttpGet]
public async Task<ActionResult<<Dto>>> Get([FromQuery] <UseCaseName>Query query)
    => await Mediator.Send(query);
```

## Verify

Run `dotnet build integrations-dotnet-api.sln` from the API project root. If the feature touches entity shape, add a migration (see the `ef-migration` skill).

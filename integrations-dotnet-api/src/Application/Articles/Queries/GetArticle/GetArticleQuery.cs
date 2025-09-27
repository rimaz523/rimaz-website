using Application.Common.Interfaces.Persistence;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Queries.GetArticle;

public class GetArticleQuery : IRequest<ArticleDto>
{
    public string Slug { get; set; } = string.Empty;
}

public class GetArticleQueryHandler : IRequestHandler<GetArticleQuery, ArticleDto>
{
    private readonly IMapper _mapper;
    private readonly IApplicationCosmosDbContext _cosmosDbContext;

    public GetArticleQueryHandler(IMapper mapper, IApplicationCosmosDbContext cosmosDbContext)
    {
        _mapper = mapper;
        _cosmosDbContext = cosmosDbContext;
    }

    public async Task<ArticleDto> Handle(GetArticleQuery request, CancellationToken cancellationToken)
    {
        var result = await _cosmosDbContext.Articles.Where(x => x.Slug == request.Slug).FirstOrDefaultAsync();
        return _mapper.Map<ArticleDto>(result);
    }
}

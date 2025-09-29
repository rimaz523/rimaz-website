using System.Text.Json.Serialization;
using Application.Common.Interfaces.ApiServices;
using Application.Common.Interfaces.Persistence;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Queries.GetArticle;

public class GetArticleQuery : IRequest<ArticleDto>
{
    public string Slug { get; set; } = string.Empty;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public SourceType Source { get; set; } = SourceType.Cosmos;
}

public class GetArticleQueryHandler : IRequestHandler<GetArticleQuery, ArticleDto>
{
    private readonly IMapper _mapper;
    private readonly IApplicationCosmosDbContext _cosmosDbContext;
    private readonly IWordpressApiService _wordpressApiService;

    public GetArticleQueryHandler(IMapper mapper, IApplicationCosmosDbContext cosmosDbContext, IWordpressApiService wordpressApiService)
    {
        _mapper = mapper;
        _cosmosDbContext = cosmosDbContext;
        _wordpressApiService = wordpressApiService;
    }

    public async Task<ArticleDto> Handle(GetArticleQuery request, CancellationToken cancellationToken)
    {
        Article? result = request.Source switch
        {
            SourceType.Cosmos => await _cosmosDbContext.Articles
                .FirstOrDefaultAsync(x => x.Slug == request.Slug),

            SourceType.Wordpress => await _wordpressApiService
                .GetArticleContentAsync(request.Slug),

            _ => throw new NotSupportedException($"Unsupported source type: {request.Source}")
        };
        return _mapper.Map<ArticleDto>(result);
    }
}

using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Articles.Queries.GetArticle;
public class GetArticleQuery : IRequest<ArticleDto>
{
    public string Slug { get; set; } = string.Empty;
}

public class GetArticleQueryHandler : IRequestHandler<GetArticleQuery, ArticleDto>
{
    private readonly IMapper _mapper;

    public GetArticleQueryHandler(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<ArticleDto> Handle(GetArticleQuery request, CancellationToken cancellationToken)
    {
        var result = new Article()
        {
            Id = Guid.NewGuid(),
            Title = "Test Article",
            Slug = request.Slug,
        };
        result.Sections = new List<Section>()
        {
            new Section
            {
                Id = Guid.NewGuid(),
                Type = "segment",
                Contents = new List<string>() {
                    "In this tutorial I will be showing you how you can quickly set up minikube on your local windows machine, and then deploy a docker image successfully in it.",
                    "This tutorial continues from my previous post Containerize a .NET Core Web Api App with Docker."
                }
            },
            new Section
            {
                Id = Guid.NewGuid(),
                Type = "heading",
                Contents = new List<string>() {
                    "Enabling Hyper-V"
                }
            }
        };
        return _mapper.Map<ArticleDto>(result);
    }
}

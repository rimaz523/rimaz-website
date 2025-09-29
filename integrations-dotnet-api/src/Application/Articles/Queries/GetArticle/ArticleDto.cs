using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Articles.Queries.GetArticle;

public class ArticleDto : IMapFrom<Article>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public ICollection<Section> Sections { get; set; } = new List<Section>();
}

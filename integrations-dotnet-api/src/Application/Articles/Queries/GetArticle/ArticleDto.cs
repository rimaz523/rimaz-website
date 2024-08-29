using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Articles.Queries.GetArticle;
public class ArticleDto : IMapFrom<Article>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public IEnumerable<Section> Sections { get; set; } = Enumerable.Empty<Section>();
}

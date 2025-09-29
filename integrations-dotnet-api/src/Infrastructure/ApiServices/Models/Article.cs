namespace Infrastructure.ApiServices.Models;

public class ArticleDto
{
    public string Slug { get; set; } = string.Empty;
    public ArticleContentDto Content { get; set; } = new ArticleContentDto();
}

public class ArticleContentDto
{
    public string Rendered { get; set; } = string.Empty;
}

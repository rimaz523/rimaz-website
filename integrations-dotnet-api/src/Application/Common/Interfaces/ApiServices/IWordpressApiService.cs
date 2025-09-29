using Domain.Entities;

namespace Application.Common.Interfaces.ApiServices;

public interface IWordpressApiService
{
    Task<Article> GetArticleContentAsync(string Slug);
}

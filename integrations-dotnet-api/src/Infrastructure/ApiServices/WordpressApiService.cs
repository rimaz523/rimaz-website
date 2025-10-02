using System.Net;
using System.Net.Http.Json;
using Application.Common.Exceptions;
using Application.Common.Interfaces.ApiServices;
using Application.Common.Interfaces.Persistence;
using Domain.Entities;
using Infrastructure.ApiServices.Models;
using Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infrastructure.ApiServices;

public class WordpressApiService : IWordpressApiService
{
    private readonly HttpClient _httpClient;
    private readonly IOptions<IntegrationOptions> _options;
    private readonly IApplicationDbContext _dbContext;
    public WordpressApiService(HttpClient httpClient, IOptions<IntegrationOptions> options, IApplicationDbContext dbContext)
    {
        _httpClient = httpClient;
        _options = options;
        _httpClient.BaseAddress = new Uri(_options.Value.WordpressApiUrl);
        _dbContext = dbContext;
    }

    public async Task<Article> GetArticleContentAsync(string Slug)
    {
        try
        {
            var articleDto = await _httpClient.GetFromJsonAsync<ArticleDto>($"posts/slug:{Slug}");

            var blogPreview = await _dbContext.BlogPosts.Where(x => x.Slug == Slug).FirstOrDefaultAsync();
            if (articleDto is null || blogPreview is null)
            {
                throw new NotFoundException();
            }


            return new Article
            {
                Id = blogPreview.Id,
                Title = blogPreview.Title,
                Image = blogPreview.Image,
                Slug = articleDto.Slug,
                Content = articleDto.Content
            };
        }
        catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            throw new NotFoundException();
        }
    }
}

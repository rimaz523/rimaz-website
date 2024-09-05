using Application.Articles.Queries.GetArticle;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticleController : ApiControllerBase
{
    private readonly ILogger<BlogPreviewsController> _logger;

    public ArticleController(ILogger<BlogPreviewsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ArticleDto>> GetArticleBySlug([FromQuery] GetArticleQuery query)
    {
        return await Mediator.Send(query);
    }
}

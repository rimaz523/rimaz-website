using Application.SocialHandles.Queries.GetSocialHandlesInDisplayOrder;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SocialHandlesController : ApiControllerBase
{
    private readonly ILogger<SocialHandlesController> _logger;

    public SocialHandlesController(ILogger<SocialHandlesController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<SocialHandleDto>>> GetSocialHandles([FromQuery] GetSocialHandlesInDisplayOrderQuery query)
    {
        return await Mediator.Send(query);
    }
}

using Application.Messages.Commands;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ApiControllerBase
{
    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(SendMessagesCommand command)
    {
        await Mediator.Send(command);
        return NoContent();
    }
}

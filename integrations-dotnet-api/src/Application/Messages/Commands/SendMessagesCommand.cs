using Application.Common.Interfaces.ApiServices;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Messages.Commands;

public class SendMessagesCommand : IRequest<Unit>
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public class SendMessagesCommandHandler : IRequestHandler<SendMessagesCommand, Unit>
{
    private readonly IMapper _mapper;
    private readonly ILogicAppApiService _logicAppApiService;

    public SendMessagesCommandHandler(IMapper mapper, ILogicAppApiService logicAppApiService)
    {
        _mapper = mapper;
        _logicAppApiService = logicAppApiService;
    }

    public async Task<Unit> Handle(SendMessagesCommand request, CancellationToken cancellationToken)
    {
        var message = new Message
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Subject = "Someone just reached out to you on rimaz.dev",
            Content = request.Content
        };
        await _logicAppApiService.SendEmailAsync(message);
        return Unit.Value;
    }
}

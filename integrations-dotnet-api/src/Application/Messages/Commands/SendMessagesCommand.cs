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

    public SendMessagesCommandHandler(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<Unit> Handle(SendMessagesCommand request, CancellationToken cancellationToken)
    {
        var message = new Message
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Content = request.Content
        };
        return Unit.Value;
    }
}

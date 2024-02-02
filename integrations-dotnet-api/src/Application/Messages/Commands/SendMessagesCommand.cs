using Application.Common.Interfaces.ApiServices;
using Application.Common.Interfaces.Persistence;
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
    private readonly IApplicationDbContext _dbContext;

    public SendMessagesCommandHandler(IMapper mapper, ILogicAppApiService logicAppApiService, IApplicationDbContext dbContext)
    {
        _mapper = mapper;
        _logicAppApiService = logicAppApiService;
        _dbContext = dbContext;
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
        await _dbContext.Messages.AddAsync(message);
        await _dbContext.SaveChangesAsync(cancellationToken);
        await _logicAppApiService.SendEmailAsync(message);
        return Unit.Value;
    }
}

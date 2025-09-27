using FluentValidation;

namespace Application.Messages.Commands;

public class SendMessagesCommandValidator : AbstractValidator<SendMessagesCommand>
{
    public SendMessagesCommandValidator()
    {
        RuleFor(sendMessageCommand => sendMessageCommand.Name)
            .NotEmpty()
            .MaximumLength(255);
        RuleFor(sendMessageCommand => sendMessageCommand.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);
        RuleFor(sendMessageCommand => sendMessageCommand.Content)
            .NotEmpty()
            .MaximumLength(500);
    }
}

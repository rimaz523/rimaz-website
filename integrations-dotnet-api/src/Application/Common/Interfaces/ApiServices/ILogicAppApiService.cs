using Domain.Entities;

namespace Application.Common.Interfaces.ApiServices;

public interface ILogicAppApiService
{
    Task SendEmailAsync(Message message);
}

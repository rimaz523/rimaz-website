using System.Text;
using System.Text.Json;
using Application.Common.Interfaces.ApiServices;
using Domain.Entities;
using Infrastructure.Common;
using Microsoft.Extensions.Options;

namespace Infrastructure.ApiServices;

public class LogicAppApiService : ILogicAppApiService
{
    private readonly HttpClient _httpClient;
    private readonly IOptions<IntegrationOptions> _options;
    public LogicAppApiService(HttpClient httpClient, IOptions<IntegrationOptions> options)
    {
        _httpClient = httpClient;
        _options = options;
        _httpClient.BaseAddress = new Uri(_options.Value.LogicAppDomain);
    }


    public async Task SendEmailAsync(Message message)
    {
        var content = new StringContent(JsonSerializer.Serialize(message), Encoding.UTF8, "application/json");
        await _httpClient.PostAsync(_options.Value.LogicAppSendEmailUrl, content);
    }
}

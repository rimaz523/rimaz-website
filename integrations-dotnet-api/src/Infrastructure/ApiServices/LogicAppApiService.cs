using System.Net.Http.Json;
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
        await _httpClient.PostAsJsonAsync(_options.Value.LogicAppSendEmailUrl, message);
    }
}

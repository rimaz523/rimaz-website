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
    public LogicAppApiService(HttpClient httpClient, IOptions<IntegrationOptions> options)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(options.Value.LogicAppApiUrl);
        _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", options.Value.LogicAppApiSubscriptionKey);
    }


    public async Task SendEmailAsync(Message message)
    {
        var content = new StringContent(JsonSerializer.Serialize(message), Encoding.UTF8, "application/json");
        await _httpClient.PostAsync(string.Empty, content);
    }
}

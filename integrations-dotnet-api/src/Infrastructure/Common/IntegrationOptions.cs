namespace Infrastructure.Common;

public class IntegrationOptions
{
    public string LogicAppApiUrl { get; set; } = string.Empty;
    public string LogicAppApiSubscriptionKey { get; set; } = string.Empty;
    public string WordpressApiUrl { get; set; } = string.Empty;
    public string WordpressAuthToken { get; set; } = string.Empty;
}

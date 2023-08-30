using Application.Common.Interfaces.ApiServices;
using Infrastructure.ApiServices;
using Infrastructure.Common;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddHttpClient<ILogicAppApiService, LogicAppApiService>();
            services.ConfigureOptions<IntegrationOptionsSetup>();
            return services;
        }
    }
}

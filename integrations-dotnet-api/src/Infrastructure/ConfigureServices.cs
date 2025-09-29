using Application.Common.Interfaces.ApiServices;
using Application.Common.Interfaces.Persistence;
using Infrastructure.ApiServices;
using Infrastructure.Common;
using Infrastructure.Persistence;
using Infrastructure.Persistence.CosmosDb;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;

namespace Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient<ILogicAppApiService, LogicAppApiService>()
                .SetHandlerLifetime(TimeSpan.FromMinutes(1))
                .AddPolicyHandler(GetRetryPolicy());
            services.ConfigureOptions<IntegrationOptionsSetup>();
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetSection("Persistence").GetSection("SqlServerConnectionString").Value,
                providerOptions =>
                {
                    providerOptions.EnableRetryOnFailure();
                    providerOptions.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                }));
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            services.AddScoped<ApplicationDbContextInitialiser>();
            services.AddDbContext<ApplicationCosmosDbContext>(options =>
                options.UseCosmos(
                    configuration.GetSection("Persistence").GetSection("CosmosAppEndpoint").Value,
                    configuration.GetSection("Persistence").GetSection("CosmosAppReadOnlyKey").Value,
                    configuration.GetSection("Persistence").GetSection("CosmosAppDatabase").Value
                    ));
            services.AddScoped<IApplicationCosmosDbContext>(provider => provider.GetRequiredService<ApplicationCosmosDbContext>());
            services.AddHttpClient<IWordpressApiService, WordpressApiService>()
                .SetHandlerLifetime(TimeSpan.FromMinutes(1))
                .AddPolicyHandler(GetRetryPolicy());
            return services;
        }

        static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
                .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }
    }
}

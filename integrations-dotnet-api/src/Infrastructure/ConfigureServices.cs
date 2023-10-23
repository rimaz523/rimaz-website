using Application.Common.Interfaces.ApiServices;
using Application.Common.Interfaces.Persistence;
using Infrastructure.ApiServices;
using Infrastructure.Common;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Polly;
using Polly.Extensions.Http;

namespace Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddHttpClient<ILogicAppApiService, LogicAppApiService>()
                .SetHandlerLifetime(TimeSpan.FromMinutes(1))
                .AddPolicyHandler(GetRetryPolicy());

            services.ConfigureOptions<IntegrationOptionsSetup>();
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer("Server=tcp:rimaz-dev-app-db-server.database.windows.net,1433;Initial Catalog=app-db;Persist Security Info=False;User ID=rimaz;Password=Blog@!23;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
            //services.AddScoped<ApplicationDbContextInitialiser>();


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

﻿using Application.Common.Interfaces.ApiServices;
using Infrastructure.ApiServices;
using Infrastructure.Common;
using Microsoft.Extensions.DependencyInjection;
using Polly.Extensions.Http;
using Polly;

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

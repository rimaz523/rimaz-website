﻿using Application.BlogPreviews.Queries.GetAllBlogPreviews;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services) 
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetAllBlogPreviewsQuery>());
            return services;
        }
    }
}

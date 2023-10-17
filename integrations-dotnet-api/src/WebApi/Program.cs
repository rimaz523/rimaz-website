using Application;
using Infrastructure;
using Infrastructure.Persistence;

namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddApplication();
        builder.Services.AddInfrastructure();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        //if (app.Environment.IsDevelopment())
        //{
        //    // Initialise and seed database
        //    using (var scope = app.Services.CreateScope())
        //    {
        //        var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
        //        initialiser.InitialiseAsync().GetAwaiter().GetResult();
        //        initialiser.SeedAsync().GetAwaiter().GetResult();
        //    }
        //}

        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}

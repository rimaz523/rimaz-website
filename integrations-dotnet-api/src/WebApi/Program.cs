using Application;
using Azure.Identity;
using Infrastructure;
using Infrastructure.Persistence;
using WebApi.Infrastructure;

namespace WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        // SWAGGER_GEN is set by the CreateSwaggerJson build target: generating the spec needs no secrets,
        // so skip Key Vault to keep `dotnet swagger tofile` independent of Azure sign-in.
        if (builder.Configuration["SWAGGER_GEN"] != "true")
        {
            var credentialOptions = new DefaultAzureCredentialOptions();
            builder.Configuration.AddAzureKeyVault(
                new Uri(builder.Configuration["KeyVault:Uri"] ?? throw new InvalidOperationException("KeyVault:Uri configuration is missing.")),
                new DefaultAzureCredential(credentialOptions));
        }

        // Add services to the container.
        builder.Services.AddApplication();
        builder.Services.AddInfrastructure(builder.Configuration);

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        //builder.Services.AddSwaggerGen();
        builder.Services.AddSwaggerGen(c =>
        {
            c.UseInlineDefinitionsForEnums();
        });

        // Configure Exception Handlers
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();

        // Define the AllowAllOrigins Cors policy that will be activated in development environment only
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins",
                builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            // Initialise and seed database
            using (var scope = app.Services.CreateScope())
            {
                var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
                initialiser.InitialiseAsync().GetAwaiter().GetResult();
                initialiser.SeedAsync().GetAwaiter().GetResult();
            }
            // Allow All Origins for Cors in dev mode
            app.UseCors("AllowAllOrigins");
        }

        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.UseExceptionHandler();
        app.MapControllers();

        app.Run();
    }
}

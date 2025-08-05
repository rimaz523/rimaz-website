using InitTool.Services;
using InitTool.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InitTool;

internal class Program
{
    static async Task Main(string[] args)
    {
        using IHost host = Host.CreateDefaultBuilder(args)
            .
            ConfigureAppConfiguration((context, config) =>
            {
                var basePath = AppContext.BaseDirectory;
                config.SetBasePath(basePath);
                config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            })
            .ConfigureServices((context, services) =>
            {
                services.AddLogging(builder => builder.AddConsole());
                services.AddSingleton<IBlobStorageService, BlobStorageService>();
            })
            .Build();

        var configuration = host.Services.GetRequiredService<IConfiguration>();
        var blobSeeder = host.Services.GetRequiredService<IBlobStorageService>();

        string seedPath = configuration["AzureStorage:SeedFolderPath"];
        if (string.IsNullOrWhiteSpace(seedPath))
        {
            throw new InvalidOperationException("Missing 'AzureStorage:SeedFolderPath' in appsettings.json.");
        }

        var rootPath = Path.Combine(Path.GetDirectoryName(typeof(Program).Assembly.Location)!, seedPath);

        await blobSeeder.SeedContainersFromFolderAsync(rootPath);
    }
}

using Azure.Storage.Blobs;
using InitTool.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace InitTool.Services;

internal class BlobStorageService : IBlobStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly ILogger<BlobStorageService> _logger;

    public BlobStorageService(IConfiguration config, ILogger<BlobStorageService> logger)
    {
        var connectionString = config["AzureStorage:ConnectionString"];
        _blobServiceClient = new BlobServiceClient(connectionString);
        _logger = logger;
    }

    public async Task SeedContainersFromFolderAsync(string rootPath)
    {
        if (!Directory.Exists(rootPath))
        {
            _logger.LogError("Seed folder path does not exist: {Path}", rootPath);
            return;
        }

        var containerDirs = Directory.GetDirectories(rootPath);

        foreach (var dir in containerDirs)
        {
            string containerName = Path.GetFileName(dir).ToLowerInvariant();
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

            var createResponse = await containerClient.CreateIfNotExistsAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
            if (createResponse != null)
                _logger.LogInformation("Created container: {Container}", containerName);
            else
                _logger.LogWarning("Warning - Container already exists: {Container}", containerName);

            // Upload files in this directory
            var files = Directory.GetFiles(dir);
            foreach (var filePath in files)
            {
                var fileName = Path.GetFileName(filePath);
                var blobClient = containerClient.GetBlobClient(fileName);

                await blobClient.UploadAsync(filePath, overwrite: true);
                _logger.LogInformation("Uploaded: {File} to container: {Container}", fileName, containerName);
            }
        }
    }
}

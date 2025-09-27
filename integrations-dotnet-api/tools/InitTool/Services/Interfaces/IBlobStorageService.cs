namespace InitTool.Services.Interfaces;

public interface IBlobStorageService
{
    Task SeedContainersFromFolderAsync(string rootPath);
}

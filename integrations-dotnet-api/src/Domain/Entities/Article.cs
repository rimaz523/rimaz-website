namespace Domain.Entities;

public class Article
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public ICollection<Section> Sections { get; set; } = new List<Section>();
}

public class Section
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string[] Contents { get; set; } = Array.Empty<string>();
}

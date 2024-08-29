namespace Domain.Entities;
public class Article
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public IEnumerable<Section> Sections { get; set; } = Enumerable.Empty<Section>();
}

public class Section
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public IEnumerable<string> Contents { get; set; } = Enumerable.Empty<string>();
}



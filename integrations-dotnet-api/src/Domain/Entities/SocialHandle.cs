﻿namespace Domain.Entities;
public class SocialHandle
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int? DisplayOrder { get; set; }
}

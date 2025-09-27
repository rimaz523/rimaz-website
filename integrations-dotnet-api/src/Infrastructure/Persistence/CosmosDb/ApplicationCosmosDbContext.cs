using Application.Common.Interfaces.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.CosmosDb;

public class ApplicationCosmosDbContext : DbContext, IApplicationCosmosDbContext
{
    public ApplicationCosmosDbContext(DbContextOptions<ApplicationCosmosDbContext> options) : base(options)
    {
    }
    public DbSet<Article> Articles => Set<Article>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>().ToContainer("articles")
        .HasPartitionKey(o => o.Slug)
            .HasNoDiscriminator();

        modelBuilder.Entity<Article>(entity =>
        {
            entity.ToContainer("articles");  // Ensure container name is always the same

            // Map each property to a JSON property name with a specific case
            entity.Property(e => e.Id)
                .ToJsonProperty("id");

            entity.Property(e => e.Title)
                .ToJsonProperty("title");

            entity.Property(e => e.Slug)
                .ToJsonProperty("slug");

            // Configure the relationship with the 'Section' entity
            entity.OwnsMany(e => e.Sections, section =>
            {
                section.ToJsonProperty("sections");
                section.Property(p => p.Id).ToJsonProperty("id");
                section.Property(p => p.Type).ToJsonProperty("type");
                section.Property(p => p.Contents).ToJsonProperty("contents");
            });

        });
    }
}

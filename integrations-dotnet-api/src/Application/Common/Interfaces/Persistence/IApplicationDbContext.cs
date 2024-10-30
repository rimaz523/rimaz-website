using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces.Persistence;

public interface IApplicationDbContext
{
    DbSet<BlogPost> BlogPosts { get; }
    DbSet<Message> Messages { get; }
    DbSet<SocialHandle> SocialHandles { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

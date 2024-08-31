using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces.Persistence;
public interface IApplicationCosmosDbContext
{
    DbSet<Article> Articles { get; }
}

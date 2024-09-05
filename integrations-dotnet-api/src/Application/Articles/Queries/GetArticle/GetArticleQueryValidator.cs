using Application.Common.Interfaces.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Queries.GetArticle;
public class GetArticleQueryValidator : AbstractValidator<GetArticleQuery>
{
    private readonly IApplicationDbContext _dbContext;
    public GetArticleQueryValidator(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;

        RuleFor(getArticleQuery => getArticleQuery.Slug)
            .NotEmpty()
            .MaximumLength(255)
            .MustAsync(SlugExists).WithMessage("Slug does not exist.");
    }

    private async Task<bool> SlugExists(string slug, CancellationToken cancellationToken)
    {
        return await _dbContext.BlogPosts.AnyAsync(x => x.Slug == slug);
    }
}

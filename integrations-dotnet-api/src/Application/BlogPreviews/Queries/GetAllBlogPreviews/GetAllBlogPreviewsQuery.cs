﻿using Application.Common.Interfaces.Persistence;
using AutoMapper;
using MediatR;

namespace Application.BlogPreviews.Queries.GetAllBlogPreviews;

public class GetAllBlogPreviewsQuery : IRequest<List<BlogPreviewDto>>
{
    public int? Limit { get; set; }
}

public class GetAllBlogPreviewsQueryHandler : IRequestHandler<GetAllBlogPreviewsQuery, List<BlogPreviewDto>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationDbContext _dbContext;

    public GetAllBlogPreviewsQueryHandler(IMapper mapper, IApplicationDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<List<BlogPreviewDto>> Handle(GetAllBlogPreviewsQuery request, CancellationToken cancellationToken)
    {
        var results = request.Limit.HasValue ?
            _dbContext.BlogPosts.Take(request.Limit.Value).OrderByDescending(x => x.PublishedDate).ToList()
            : _dbContext.BlogPosts.OrderByDescending(x => x.PublishedDate).ToList();
        return _mapper.Map<List<BlogPreviewDto>>(results);
    }
}

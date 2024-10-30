using Application.Common.Interfaces.Persistence;
using AutoMapper;
using MediatR;

namespace Application.SocialHandles.Queries.GetSocialHandlesInDisplayOrder;
public class GetSocialHandlesInDisplayOrderQuery : IRequest<List<SocialHandleDto>>
{
}

public class GetSocialHandlesInDisplayOrderQueryHandler : IRequestHandler<GetSocialHandlesInDisplayOrderQuery, List<SocialHandleDto>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationDbContext _dbContext;

    public GetSocialHandlesInDisplayOrderQueryHandler(IMapper mapper, IApplicationDbContext dbContext)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<List<SocialHandleDto>> Handle(GetSocialHandlesInDisplayOrderQuery request, CancellationToken cancellationToken)
    {
        var results = _dbContext.SocialHandles.OrderBy(x => x.DisplayOrder).ToList();
        return _mapper.Map<List<SocialHandleDto>>(results);
    }
}

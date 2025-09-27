using Application.Common.Mappings;
using Domain.Entities;

namespace Application.SocialHandles.Queries.GetSocialHandlesInDisplayOrder;

public class SocialHandleDto : IMapFrom<SocialHandle>
{
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public int? DisplayOrder { get; set; }
}

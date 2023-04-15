using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetId(this ClaimsPrincipal principal)
        {
            return new Guid(principal.Claims.First(e => e.Type.Contains("nameidentifier")).Value);
        }
    }
}

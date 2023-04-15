using Microsoft.Identity.Client;

namespace API.Logic.DTO.Account
{
    public class AccountRegDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
}

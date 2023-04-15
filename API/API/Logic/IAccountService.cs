using API.Logic.DTO.Account;
using Logic.Helpers;

namespace API.Logic
{
    public interface IAccountService
    {
        public Task<Result<string>> RegisterAsync(AccountRegDTO regDto);
        public Task<Result<string>> LoginAsync(AccountAuthDTO authDto);
    }
}

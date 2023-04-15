using API.Logic;
using API.Logic.DTO.Account;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterAsync(AccountRegDTO regDto)
        {
            var response = await accountService.RegisterAsync(regDto);

            return response.IsSuccess ? Ok(response.Value) 
                : BadRequest(response.Error);
        }

        [HttpGet]
        public async Task<IActionResult> LoginAsync(AccountAuthDTO authDto)
        {
            var response = await accountService.LoginAsync(authDto);

            return response.IsSuccess ? Ok(response.Value)
                : BadRequest(response.Error);
        }
    }
}

using API.DAL.Entities;
using API.Extensions;
using API.Logic;
using API.Logic.DTO.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }
        
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RegisterAsync(AccountRegDTO regDto)
        {
            var response = await accountService.RegisterAsync(regDto);

            return response.IsSuccess
                ? Ok(new {token = response.Value})
                : BadRequest(response.Error);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync(AccountAuthDTO authDto)
        {
            var response = await accountService.LoginAsync(authDto);

            return response.IsSuccess
                ? Ok(new {token = response.Value})
                : BadRequest(response.Error);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetToken()
        {
            return Ok(new { id = HttpContext.User.GetId() });
        }
    }
}

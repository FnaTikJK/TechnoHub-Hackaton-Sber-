using System.Security.Claims;
using API.Extensions;
using API.Logic;
using API.Logic.DTO.Room;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsService roomsService;

        public RoomsController(IRoomsService roomsService)
        {
            this.roomsService = roomsService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateRoomAsync(RoomCreateDTO createDto)
        {
            createDto.CreatorId = HttpContext.User.GetId();
            return Ok(await roomsService.CreateRoomAsync(createDto));
        }
    }


}

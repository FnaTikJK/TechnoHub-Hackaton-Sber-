using System.Security.Claims;
using API.DAL;
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
        [HttpGet("{roomId:Guid}")]
        public async Task<IActionResult> GetRoomByIdAsync([FromRoute] Guid roomId)
        {
            return Ok(await roomsService.GetRoomByIdAsync(roomId, HttpContext.User.GetId()));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateRoomAsync(RoomCreateDTO createDto)
        {
            createDto.CreatorId = HttpContext.User.GetId();
            return Ok(await roomsService.CreateRoomAsync(createDto));
        }

        [Authorize]
        [HttpDelete("{roomId:Guid}")]
        public async Task<IActionResult> DeleteRoomAsync([FromRoute] Guid roomId)
        {
            await roomsService.DeleteRoom(roomId, HttpContext.User.GetId());
            return NoContent();
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> CloseRoomAsync(RoomCloseDTO closeDto)
        {
            closeDto.CreatorId = HttpContext.User.GetId();
            await roomsService.CloseRoomAsync(closeDto);
            return NoContent();
        }
    }
}

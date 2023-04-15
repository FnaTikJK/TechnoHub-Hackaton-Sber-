using API.Logic.DTO.Room;

namespace API.Logic
{
    public interface IRoomsService
    {
        public Task<Guid> CreateRoomAsync(RoomCreateDTO createDto);
        public Task DeleteRoom(DeleteRoomDTO deleteRoom);
        public Task CloseRoomAsync(RoomCloseDTO closeDto);
        public Task AddUser(RoomUserDTO roomUser);
        public Task DeleteUser(RoomUserDTO roomUser);
    }
}

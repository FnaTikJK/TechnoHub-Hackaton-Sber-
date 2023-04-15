using API.DAL;
using API.DAL.Entities;
using API.Logic.DTO.Room;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Logic
{
    public class RoomService : IRoomsService
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public RoomService(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        public async Task<Guid> CreateRoomAsync(RoomCreateDTO createDto)
        {
            var room = mapper.Map<Room>(createDto);
            await dataContext.Rooms.AddAsync(room);
            return room.Id;
        }

        public Task DeleteRoom(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task CloseRoom(RoomCloseDTO closeDto)
        {
            throw new NotImplementedException();
        }

        public Task AddUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUser(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}

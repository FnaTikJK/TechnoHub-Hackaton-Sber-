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

        public async Task DeleteRoom(DeleteRoomDTO deleteDto)
        {
            var room = dataContext.Rooms.Include(e => e.Users)
                .FirstOrDefault(e => e.Id == deleteDto.RoomId && e.Users.First().Id == deleteDto.CreatorId);
            if (room != null)
                dataContext.Rooms.Remove(room);
        }

        public async Task CloseRoomAsync(RoomCloseDTO closeDto)
        {
            var room = await dataContext.Rooms.Include(e => e.Users)
                .FirstOrDefaultAsync(e => e.Id == closeDto.RoomId && e.Users.First().Id == closeDto.CreatorId);
            if (room != null)
            {
                mapper.Map(closeDto, room);
            }
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

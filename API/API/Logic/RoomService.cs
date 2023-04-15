using API.DAL;
using API.DAL.Entities;
using API.Logic.DTO.Room;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

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

        public async Task AddUser(RoomUserDTO roomUser)
        {
            var room = await dataContext.Rooms.FindAsync(roomUser.RoomId)
                ?? throw new KeyNotFoundException($"Комната {roomUser.RoomId} не существует");
            var user = await dataContext.Users.FindAsync(roomUser.UserId)
                ?? throw new KeyNotFoundException($"Юзера {roomUser.UserId} не существует");

            if (room.Users.Contains(user))
                throw new Exception($"Юзер {user.Id} уже добавлен в комнату {room.Id}");

            room.Users.Add(user);
            user.Rooms.Add(room);
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteUser(RoomUserDTO roomUser)
        {
            var room = await dataContext.Rooms.FindAsync(roomUser.RoomId)
                ?? throw new KeyNotFoundException($"Комната {roomUser.RoomId} уже удалена");
            var user = await dataContext.Users.FindAsync(roomUser.UserId)
                ?? throw new KeyNotFoundException($"Юзера {roomUser.UserId} не существует");

            if (!room.Users.Contains(user))
                throw new Exception($"Юзера {user.Id} нет в комнате {room.Id}");

            room.Users.Remove(user);
            user.Rooms.Remove(room);
            await dataContext.SaveChangesAsync();
        }
    }
}

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

        public async Task DeleteRoom(Guid id)
        {
            var room = await dataContext.Rooms.FindAsync(id)
                ?? throw new KeyNotFoundException($"Комната {id} уже удалена");
            dataContext.Rooms.Remove(room);
            await dataContext.SaveChangesAsync();
        }

        public Task CloseRoom(RoomCloseDTO closeDto)
        {
            throw new NotImplementedException("Вопросы ебануть в кудато там нахуй");
        }

        public async Task AddUser(Guid roomId, Guid userId)
        {
            var room = await dataContext.Rooms.FindAsync(roomId)
                ?? throw new KeyNotFoundException($"Комната {roomId} уже удалена");
            var user = await dataContext.Users.FindAsync(userId)
                ?? throw new KeyNotFoundException($"Юзера {userId} не существует");
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
            room.Users.Remove(user);
            user.Rooms.Remove(room);
            await dataContext.SaveChangesAsync();
        }
    }
}

using API.DAL;
using API.DAL.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Hubs
{
    public class RoomHub : Hub
    {
        private readonly DataContext dataContext;

        public RoomHub(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task Send(string message)
        {
            await Clients.All.SendAsync("Send", message);
        }

        public async Task JoinRoom(string roomId, string userId, string name)
        {
            var room = dataContext.Rooms
                .Include(e => e.Users)
                .FirstOrDefault(e => e.Id == new Guid(roomId));
            room.Users.Add(await dataContext.Users.FirstOrDefaultAsync(e => e.Id == new Guid(userId)));
            await dataContext.SaveChangesAsync();
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await this.Clients.OthersInGroup(roomId)
                .SendAsync("JoinUser",userId, name);
        }

        public async Task LeaveRoom(string roomId, string userId)
        {
            var room = dataContext.Rooms
                .Include(e => e.Users)
                .FirstOrDefault(e => e.Id == new Guid(roomId));
            room.Users.Remove(await dataContext.Users.FirstOrDefaultAsync(e => e.Id == new Guid(userId)));
            await dataContext.SaveChangesAsync();
            await Clients.OthersInGroup(roomId)
                .SendAsync("LeaveUser", userId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }

        public async Task NextQuestion(string roomId, Question question)
        {
            await Clients.OthersInGroup(roomId)
                .SendAsync("NextQuestion", question);
        }
    }
}

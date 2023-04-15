using API.DAL.Entities;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class RoomHub : Hub
    {
        public async Task JoinRoom(string roomId, string userId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await this.Clients.OthersInGroup(roomId)
                .SendAsync("JoinUser", userId);
        }

        public async Task LeaveRoom(string roomId, string userId)
        {
            await this.Clients.OthersInGroup(roomId)
                .SendAsync("LeaveUser", userId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        }
    }
}

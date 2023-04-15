using API.DAL.Entities;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class RoomHub : Hub
    {
        public async Task Send(string message)
        {
            await Clients.All.SendAsync("Send", message);
        }

        public async Task JoinRoom(string roomId, string userId,string name)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await this.Clients.OthersInGroup(roomId)
                .SendAsync("JoinUser",userId, name);
        }

        public async Task LeaveRoom(string roomId, string userId)
        {
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

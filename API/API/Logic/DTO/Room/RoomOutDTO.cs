using API.DAL.Entities;
using API.Logic.DTO.User;

namespace API.Logic.DTO.Room
{
    public class RoomOutDTO
    {
        public string Name { get; set; }
        public List<Question> Questions { get; set; }
        public List<UserOutDTO> Users { get; set; }
    }
}

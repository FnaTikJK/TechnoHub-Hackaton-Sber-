using API.DAL.Entities;

namespace API.Logic.DTO.Room
{
    public class RoomCreateDTO
    {
        public string Name { get; set; }
        public Guid? CreatorId { get; set; } = null;
    }
}

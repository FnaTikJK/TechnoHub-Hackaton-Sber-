namespace API.Logic.DTO.Room
{
    public class DeleteRoomDTO
    {
        public Guid? CreatorId { get; set; }
        public Guid RoomId { get; set; }
    }
}

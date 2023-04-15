namespace API.Logic.DTO.Room
{
    public class RoomCloseDTO
    {
        public Guid RoomId { get; set; }
        public Guid CreatorId { get; set; }
        public List<Guid> QuestionsId { get; set; }
    }
}

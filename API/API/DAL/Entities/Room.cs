namespace API.DAL.Entities
{
    public class Room : Entity<Guid>
    {
        public string Name { get; set; }
        public List<Question> Questions { get; set; }
        public List<User> Users { get; set; }
    }
}

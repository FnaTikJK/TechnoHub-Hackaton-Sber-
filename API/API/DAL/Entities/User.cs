namespace API.DAL.Entities
{
    public class User : Entity<Guid>
    {
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
    }
}

namespace API.DAL
{
    public class UserDTO: Entities.Entity<Guid>
    {
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }

    }
}

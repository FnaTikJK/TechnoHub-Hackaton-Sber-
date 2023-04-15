using API.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DAL
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            //Init();
        }

        private void Init()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<User> Users => Set<User>();
    }
}

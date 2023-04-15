using System.Net.Mime;
using API.DAL.Enums;

namespace API.DAL.Entities
{
    public class Question : Entity<Guid>
    {
        public Category Category { get; set; }
        public string Title { get; set; }
        public string Meaning { get; set; }
        public string Text { get; set; }
        public byte[]? Image { get; set; }

        public List<Room> Rooms { get; set; }
    }
}

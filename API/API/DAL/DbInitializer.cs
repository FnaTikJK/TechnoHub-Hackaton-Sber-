using API.DAL.Entities;
using API.DAL.Enums;

namespace API.DAL
{
    public class DbInitializer
    {
        public static void Initialize(DataContext dataContext)
        {
            dataContext.Database.EnsureDeleted();
            dataContext.Database.EnsureCreated();
            AddQuestions(dataContext);
        }

        private static void AddQuestions(DataContext dataContext)
        {
            for (int i = 0; i < 20; i++)
            {
                dataContext.Questions.Add(new Question()
                {
                    Category = Category.AtmosphereCreation,
                    Title = $"{i} title",
                    Meaning = $"{i} meaning",
                    Text = $"{i} Random text"
                });
            }

            for (int i = 0; i < 10; i++)
            {
                dataContext.Questions.Add(new Question()
                {
                    Category = Category.Rofl,
                    Title = $"{i} title",
                    Meaning = $"{i} meaning",
                    Text = $"{i} Random text"
                });
            }

            dataContext.SaveChanges();
        }
    }
}

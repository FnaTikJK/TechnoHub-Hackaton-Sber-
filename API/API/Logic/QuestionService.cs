using API.DAL;
using API.DAL.Entities;
using API.DAL.Enums;
using API.Logic.DTO;
using Logic.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Logic
{
    public class QuestionService : IQuestionService
    {
        private readonly DataContext dataContext;

        public QuestionService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<Result<Question>> GetQuestionByIdAsync(Guid id)
        {
            var existed = await dataContext.Questions.FirstOrDefaultAsync(e => e.Id == id);
            if (existed == null)
                return Result.Fail<Question?>("Такого вопроса не существует");

            return Result.Ok(existed);
        }

        public IEnumerable<Question> GetRandomQuestionsByCategories(GetQuestionsDTO getQuestionsDto)
        {
            var questions = new List<Question>();
            var used = new HashSet<Guid>();
            var current = 0;
            while(current < getQuestionsDto.TotalQuestionsCount())
            {
                var category = current != 0 && current % getQuestionsDto.roflQuestionsFrequency == 0 ?
                    Category.Rofl :
                    Category.AtmosphereCreation;

                var newQuestion = dataContext.Questions
                    .Where(e => e.Category == category && !used.Contains(e.Id))
                    .GetRandom();
                questions.Add(newQuestion);
                used.Add(newQuestion.Id);
                current++;
            }

            return questions;
        }

        //private async Task<Question> GetNextRndQuestion(HashSet<Guid> used)
        //{

        //}
    }

    public static class LINQExtensions
    {
        public static T GetRandom<T>(this IEnumerable<T> enumerable)
        {
            return enumerable
                .Skip(new Random().Next(0, enumerable.Count()-1))
                .First();
        }
    }
}

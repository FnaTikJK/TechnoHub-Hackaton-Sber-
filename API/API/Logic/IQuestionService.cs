using API.DAL.Entities;
using API.Logic.DTO;
using Logic.Helpers;

namespace API.Logic
{
    public interface IQuestionService
    {
        public Task<Result<Question>> GetQuestionByIdAsync(Guid id);
        public IEnumerable<Question> GetRandomQuestionsByCategories(GetQuestionsDTO getQuestionsDto);
    }
}

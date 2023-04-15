using API.DAL;
using API.DAL.Enums;
using API.Logic;
using API.Logic.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService questionService;

        public QuestionsController(IQuestionService questionService)
        {
            this.questionService = questionService;
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetQuestionById(Guid id)
        {
            return Ok(await questionService.GetQuestionByIdAsync(id));
        }

        [HttpGet]
        public async Task<IActionResult> GetRandomQuestionsAsync([FromQuery] GetQuestionsDTO getQuestionsDto)
        {
            return Ok(questionService.GetRandomQuestionsByCategories(getQuestionsDto));
        }
    }
}

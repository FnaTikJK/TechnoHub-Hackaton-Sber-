namespace API.Logic.DTO
{
    public class GetQuestionsDTO
    {
        public int normalQuestionsCount { get; set; }

        public int roflQuestionsFrequency { get; set; }
        public int TotalQuestionsCount() => normalQuestionsCount + roflQuestionsFrequency;

    }
}

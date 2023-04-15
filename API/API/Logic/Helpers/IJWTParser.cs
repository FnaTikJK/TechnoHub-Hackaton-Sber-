namespace API.Logic.Helpers
{
    public interface IJWTParser
    {
        public string CreateToken(Guid id);
    }
}

using API.DAL;
using API.DAL.Entities;
using API.Logic.Helpers;
using AutoMapper;
using Logic.Helpers;
using System.Data;
using API.Logic.DTO.Account;
using Logic.Services.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Logic
{
    public class AccountService : IAccountService
    {
        private readonly DataContext dataContext;
        private readonly IJWTParser jwtParser;
        private readonly IMapper mapper;

        public AccountService(DataContext dataContext, IJWTParser jwtParser, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.jwtParser = jwtParser;
            this.mapper = mapper;
        }

        public async Task<Result<string>> RegisterAsync(AccountRegDTO regDto)
        {
            var existed = await dataContext.Users.FirstOrDefaultAsync(e => e.Login == regDto.Login);
            if (existed != null)
                return Result.Fail<string>("Аккаунт с таким логином уже существует");

            await dataContext.AddAsync(mapper.Map<User>(regDto));
            await dataContext.SaveChangesAsync();

            return await LoginAsync(mapper.Map<AccountAuthDTO>(regDto));
        }

        public async Task<Result<string>> LoginAsync(AccountAuthDTO authDto)
        {
            var existed = await dataContext.Users.FirstOrDefaultAsync(e => e.Login == authDto.Login);
            if (existed == null)
                return Result.Fail<string>("Аккаунта с таким логином не существует");

            var isCorrectPassword = PasswordHasher.ComparePasswordWithHashed(existed.PasswordHash, authDto.Password);
            if (!isCorrectPassword)
                return Result.Fail<string>("Неправильный пароль");

            return Result.Ok(jwtParser.CreateToken(existed.Id));
        }
    }
}

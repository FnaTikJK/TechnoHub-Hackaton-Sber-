using API.DAL.Entities;
using API.Logic.DTO.Account;
using AutoMapper;
using Logic.Services.Helpers;

namespace API.Logic.Helpers.Mapper
{
    public class AccountMappingProfile : Profile
    {
        public AccountMappingProfile()
        {
            CreateMap<AccountRegDTO, User>()
                .ForMember(dest => dest.PasswordHash,
                    opt => opt.ConvertUsing<AccountConverter, string>(src => src.Password));
            CreateMap<AccountRegDTO, AccountAuthDTO>();
            //CreateMap<AccountAuthDTO, User>();
        }

        public class AccountConverter : IValueConverter<string, string>
        {
            public string Convert(string sourceMember, ResolutionContext context)
                => PasswordHasher.ComputeHash(sourceMember);
        }
    }
}

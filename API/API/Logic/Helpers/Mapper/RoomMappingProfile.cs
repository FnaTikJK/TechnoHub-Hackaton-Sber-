using API.DAL;
using API.DAL.Entities;
using API.Logic.DTO.Room;
using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;

namespace API.Logic.Helpers.Mapper
{
    public class RoomMappingProfile : Profile
    {
        public RoomMappingProfile()
        {
            CreateMap<RoomCreateDTO, Room>()
                .ForMember(dest => dest.Users, opt => opt.ConvertUsing<UserConverter, Guid?>(src => src.CreatorId))
                .ForMember(dest => dest.Questions, opt => 
                    opt.ConvertUsing<QuestionsConverter, List<Guid>>(src => src.QuestionsId));
            CreateMap<RoomCloseDTO, Room>()
                .ForMember(dest => dest.Questions, opt =>
                    opt.ConvertUsing<QuestionsConverter, List<Guid>>(src => src.QuestionsId));
        }
    }

    public class UserConverter : IValueConverter<Guid?, List<User>>
    {
        private readonly DataContext dataContext;

        public UserConverter(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        public List<User> Convert(Guid? sourceMember, ResolutionContext context)
        {
            return new List<User>() {dataContext.Users.FirstOrDefault(e => e.Id == sourceMember)};
        }
    }

    public class QuestionsConverter : IValueConverter<List<Guid>, List<Question>>
    {
        private readonly DataContext dataContext;
        public QuestionsConverter(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public List<Question> Convert(List<Guid> sourceMember, ResolutionContext context)
        {
            return sourceMember
                .Select(guid => dataContext.Questions
                    .FirstOrDefault(e => e.Id == guid))
                .Where(existed => existed != null).ToList();
        }
    }
}

using API.DAL;
using API.DAL.Entities;
using API.Logic.DTO.Room;
using API.Logic.DTO.User;
using AutoMapper;
using Microsoft.AspNetCore.Routing.Constraints;

namespace API.Logic.Helpers.Mapper
{
    public class RoomMappingProfile : Profile
    {
        public RoomMappingProfile()
        {
            CreateMap<RoomCreateDTO, Room>()
                .ForMember(dest => dest.Users, opt => opt.ConvertUsing<UserConverter, Guid?>(src => src.CreatorId));
            CreateMap<RoomCloseDTO, Room>()
                .ForMember(dest => dest.Questions, opt =>
                    opt.ConvertUsing<QuestionsConverter, List<Guid>>(src => src.QuestionsId));
            CreateMap<Room, RoomOutDTO>()
                .ForMember(dest => dest.Users, opt =>
                    opt.ConvertUsing<UserConverter, List<User>>(src => src.Users));
        }
    }

    public class UserConverter : 
        IValueConverter<Guid?, List<User>>,
        IValueConverter<List<User>, List<UserOutDTO>>
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

        public List<UserOutDTO> Convert(List<User> sourceMember, ResolutionContext context)
        {
            return sourceMember
                .Select(e => new UserOutDTO { Id = e.Id, Name = e.Name })
                .ToList();
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

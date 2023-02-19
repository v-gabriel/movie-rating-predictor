using AutoMapper;
using MovieRatingPredictor.DAL.Entities;
using MovieRatingPredictor.Model.Models.BindingModels;
using MovieRatingPredictor.Model.Models.Dtos;

namespace MovieRatingPredictor.Model.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<MLScoreRequestBindingModel, UserStatistic>();
        CreateMap<UserStatistic, UserStatisticDto>();
    }
}
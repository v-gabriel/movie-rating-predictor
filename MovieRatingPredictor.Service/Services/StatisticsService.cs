using AutoMapper;
using MovieRatingPredictor.DAL.Context;
using MovieRatingPredictor.DAL.Entities;
using MovieRatingPredictor.Model.Models;
using MovieRatingPredictor.Model.Models.BindingModels;
using MovieRatingPredictor.Model.Models.Dtos;
using MovieRatingPredictor.Model.Models.Statistics;

namespace MovieRatingPredictor.Service.Services;

public class StatisticsService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public StatisticsService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task SavePredictionData(MLScoreRequestBindingModel scoreRequestBindingModel,
        MLScoreResult? result = null)
    {
        var userStatistics = _mapper.Map<UserStatistic>(scoreRequestBindingModel);
        userStatistics.ImdbRating = result.ImdbRating;

        _context.UserStatistics.Add(userStatistics);
        await _context.SaveChangesAsync();
    }

    public UserStatisticDto[] GetUserStatistic()
    {
        IEnumerable<UserStatistic> userStat = _context.UserStatistics.ToList();

        return _mapper.Map<UserStatisticDto[]>(userStat);
    }

    public Statistics GetDetailedStatistics()
    {
        var statistics = new Statistics();

        statistics = PopulateCategoryStatistics(statistics);
        statistics = PopulateRuntimeStatistics(statistics);
        statistics = PopulateGrossStatistics(statistics);
        statistics = PopulateImdbRatingStatistics(statistics);
        statistics = PopulateYearStatistics(statistics);
        statistics = PopulateEndUserStatistics(statistics);

        return statistics;
    }

    private Statistics PopulateGrossStatistics(Statistics statistics)
    {
        statistics.GrossStatistics.Max = _context.UserStatistics.Max(x => x.Gross);
        statistics.GrossStatistics.Min = _context.UserStatistics.Min(x => x.Gross);

        return statistics;
    }

    private Statistics PopulateRuntimeStatistics(Statistics statistics)
    {
        statistics.RuntimeStatistics.Min = _context.UserStatistics.Min(x => x.RuntimeMin);
        statistics.RuntimeStatistics.Max = _context.UserStatistics.Max(x => x.RuntimeMin);

        return statistics;
    }

    private Statistics PopulateYearStatistics(Statistics statistics)
    {
        var dict = new Dictionary<string, int>();
        var years = _context.UserStatistics.Select(x => x.ReleasedYear);
        foreach (var year in years)
        {
            if (!dict.ContainsKey(year.ToString())) dict.Add(year.ToString(), 0);
            dict[year.ToString()]++;
        }

        statistics.YearStatistics.YearCountDictionary = dict;

        return statistics;
    }

    private Statistics PopulateImdbRatingStatistics(Statistics statistics)
    {
        statistics.ImdbRatingStatistics.Max = _context.UserStatistics.Max(x => x.ImdbRating);
        statistics.ImdbRatingStatistics.Min = _context.UserStatistics.Min(x => x.ImdbRating);

        return statistics;
    }

    private Statistics PopulateEndUserStatistics(Statistics statistics)
    {
        var maxUsers =
            _context.UserStatistics.Where(x => x.ImdbRating.Equals(statistics.ImdbRatingStatistics.Max));
        statistics.MaxRatedUserStatistic = _mapper.Map<IEnumerable<UserStatisticDto>>(maxUsers);
        var minUsers =
            _context.UserStatistics.Where(x => x.ImdbRating.Equals(statistics.ImdbRatingStatistics.Min));
        statistics.MinRatedUserStatistic = _mapper.Map<IEnumerable<UserStatisticDto>>(minUsers);

        return statistics;
    }

    private Statistics PopulateCategoryStatistics(Statistics statistics)
    {
        statistics.CategoryStatistics.ActionFlagCount = _context.UserStatistics.Count(x => x.IsAction);
        statistics.CategoryStatistics.AdventureFlagCount = _context.UserStatistics.Count(x => x.IsAdventure);
        statistics.CategoryStatistics.BiographyFlagCount = _context.UserStatistics.Count(x => x.IsBiography);
        statistics.CategoryStatistics.ComedyFlagCount = _context.UserStatistics.Count(x => x.IsComedy);
        statistics.CategoryStatistics.CrimeFlagCount = _context.UserStatistics.Count(x => x.IsCrime);
        statistics.CategoryStatistics.DramaFlagCount = _context.UserStatistics.Count(x => x.IsDrama);
        statistics.CategoryStatistics.HistoryFlagCount = _context.UserStatistics.Count(x => x.IsHistory);
        statistics.CategoryStatistics.HorrorFlagCount = _context.UserStatistics.Count(x => x.IsHorror);
        statistics.CategoryStatistics.MusicFlagCount = _context.UserStatistics.Count(x => x.IsMusic);
        statistics.CategoryStatistics.MysteryFlagCount = _context.UserStatistics.Count(x => x.IsMystery);
        statistics.CategoryStatistics.ScifiFlagCount = _context.UserStatistics.Count(x => x.IsSciFi);
        statistics.CategoryStatistics.ThrillerFlagCount = _context.UserStatistics.Count(x => x.IsThriller);
        statistics.CategoryStatistics.WarFlagCount = _context.UserStatistics.Count(x => x.IsWar);
        statistics.CategoryStatistics.WesternFlagCount = _context.UserStatistics.Count(x => x.IsWestern);
        statistics.CategoryStatistics.RomanceFlagCount = _context.UserStatistics.Count(x => x.IsRomance);

        return statistics;
    }
}
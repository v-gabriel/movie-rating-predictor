using MovieRatingPredictor.Model.Models.Dtos;

namespace MovieRatingPredictor.Model.Models.Statistics;

public class Statistics
{
    public CategoryStatistics CategoryStatistics { get; set; } = new();
    public GrossStatistics GrossStatistics { get; set; } = new();
    public RuntimeStatistics RuntimeStatistics { get; set; } = new();
    public YearStatistics YearStatistics { get; set; } = new();
    public ImdbRatingStatistics ImdbRatingStatistics { get; set; } = new();

    public IEnumerable<UserStatisticDto> MaxRatedUserStatistic { get; set; }
    public IEnumerable<UserStatisticDto> MinRatedUserStatistic { get; set; }
}
using MovieRatingPredictor.Model.Models.BindingModels;

namespace MovieRatingPredictor.Model.Models;

public class MLScoreRequest
{
    public MLScoreRequest(MLScoreRequestBindingModel scoreRequestBindingModel)
    {
        Values = new[,]
        {
            {
                scoreRequestBindingModel.ReleasedYear.ToString(),
                scoreRequestBindingModel.RuntimeMin.ToString(),
                BoolToString(scoreRequestBindingModel.IsHorror),
                BoolToString(scoreRequestBindingModel.IsCrime),
                BoolToString(scoreRequestBindingModel.IsComedy),
                BoolToString(scoreRequestBindingModel.IsRomance),
                BoolToString(scoreRequestBindingModel.IsMusic),
                BoolToString(scoreRequestBindingModel.IsAdventure),
                BoolToString(scoreRequestBindingModel.IsMystery),
                BoolToString(scoreRequestBindingModel.IsWar),
                BoolToString(scoreRequestBindingModel.IsWestern),
                BoolToString(scoreRequestBindingModel.IsBiography),
                BoolToString(scoreRequestBindingModel.IsHistory),
                BoolToString(scoreRequestBindingModel.IsThriller),
                BoolToString(scoreRequestBindingModel.IsSciFi),
                BoolToString(scoreRequestBindingModel.IsAction),
                BoolToString(scoreRequestBindingModel.IsDrama),
                scoreRequestBindingModel.Gross.ToString(),
                "0"
            }
        };
    }

    public string[,] Values { get; }

    public string[] ColumnNames { get; } =
    {
        "Released_Year", "Runtime_min", "Horror", "Crime", "Comedy", "Romance", "Music",
        "Adventure", "Mystery", "War", "Western", "Biography", "History", "Thriller", "Sci-Fi",
        "Action", "Drama", "Gross", "IMDB_Rating"
    };

    private string BoolToString(bool value = false)
    {
        return value ? "1" : "0";
    }
}
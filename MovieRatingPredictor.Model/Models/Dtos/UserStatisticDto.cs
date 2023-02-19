namespace MovieRatingPredictor.Model.Models.Dtos;

public class UserStatisticDto
{
    public int ReleasedYear { get; set; }

    public int RuntimeMin { get; set; }

    public int Gross { get; set; }

    public bool IsHorror { get; set; }

    public bool IsCrime { get; set; }

    public bool IsComedy { get; set; }

    public bool IsRomance { get; set; }

    public bool IsMusic { get; set; }

    public bool IsAdventure { get; set; }

    public bool IsMystery { get; set; }

    public bool IsWar { get; set; }

    public bool IsWestern { get; set; }

    public bool IsBiography { get; set; }

    public bool IsHistory { get; set; }

    public bool IsThriller { get; set; }

    public bool IsSciFi { get; set; }

    public bool IsAction { get; set; }

    public bool IsDrama { get; set; }

    public decimal? ImdbRating { get; set; }
}
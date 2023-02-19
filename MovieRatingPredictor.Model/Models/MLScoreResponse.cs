namespace MovieRatingPredictor.Model.Models;

public class MLScoreResponse
{
    public MLResponseResults Results { get; set; }
}

public class MLResponseResults
{
    public MLResponseOutput Output1 { get; set; }
}

public class MLResponseOutput
{
    public MLResponseValue Value { get; set; }
}

public class MLResponseValue
{
    public string[][] Values { get; set; }
}
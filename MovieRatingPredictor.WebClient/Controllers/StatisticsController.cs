using Microsoft.AspNetCore.Mvc;
using MovieRatingPredictor.Service.Services;

namespace MovieRatingPredictor.WebClient.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : Controller
{
    private readonly StatisticsService _statisticsService;

    public StatisticsController(StatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet]
    [Route("base")]
    public IActionResult GetUserStatistics()
    {
        var result = _statisticsService.GetUserStatistic();
        return Ok(result);
    }

    [HttpGet]
    [Route("details")]
    public IActionResult GetDetailedStatistics()
    {
        var result = _statisticsService.GetDetailedStatistics();
        return Ok(result);
    }
}
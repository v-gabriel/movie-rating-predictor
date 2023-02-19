using Microsoft.AspNetCore.Mvc;
using MovieRatingPredictor.Model.Models.BindingModels;
using MovieRatingPredictor.Service.Services;

namespace MovieRatingPredictor.WebClient.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : Controller
{
    private readonly PredictionService _predictionService;
    private readonly StatisticsService _statisticsService;

    public PredictionController(PredictionService predictionService, StatisticsService statisticsService)
    {
        _predictionService = predictionService;
        _statisticsService = statisticsService;
    }

    [HttpPost]
    public async Task<IActionResult> GetPredictionResult([FromBody] MLScoreRequestBindingModel scoreRequestBindingModel)
    {
        var result = await _predictionService.GetPredictionFromModel(scoreRequestBindingModel);
        await _statisticsService.SavePredictionData(scoreRequestBindingModel, result);

        return Ok(result);
    }
}
using System.Net.Http.Headers;
using AutoMapper;
using Microsoft.Extensions.Options;
using MovieRatingPredictor.Model.Models;
using MovieRatingPredictor.Model.Models.AppSettings;
using MovieRatingPredictor.Model.Models.BindingModels;
using Newtonsoft.Json;

namespace MovieRatingPredictor.Service.Services;

public class PredictionService
{
    private readonly IOptions<AzureMLSettings> _azureMLSettings;
    private readonly IMapper _mapper;

    public PredictionService(IOptions<AzureMLSettings> azureMLSettings, IMapper mapper)
    {
        _azureMLSettings = azureMLSettings;
        _mapper = mapper;
    }

    public async Task<MLScoreResult?> GetPredictionFromModel(MLScoreRequestBindingModel scoreRequestBindingModel)
    {
        var scoreRequest = new MLScoreRequest(scoreRequestBindingModel);
        using (var client = new HttpClient())
        {
            var request = new
            {
                Inputs = new Dictionary<string, StringTable>
                {
                    {
                        "input1",
                        new StringTable
                        {
                            ColumnNames = scoreRequest.ColumnNames,
                            Values = scoreRequest.Values
                        }
                    }
                },
                GlobalParameters = new Dictionary<string, string>()
            };

            var apiKey = _azureMLSettings.Value.ApiKey ?? "";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            client.BaseAddress = new Uri(_azureMLSettings.Value.Uri ?? "");

            var response = await client.PostAsJsonAsync("", request);

            if (response.IsSuccessStatusCode)
            {
                var scoreResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<MLScoreResponse>(scoreResponse);

                var mlScoreResult = new MLScoreResult();
                var results = result.Results.Output1.Value.Values[0];
                mlScoreResult.ImdbRating = decimal.Parse(results[results.Length - 1]);

                Console.WriteLine("Result: {0}", result);

                return mlScoreResult;
            }

            Console.WriteLine("The request failed with status code: {0}", response.StatusCode);

            Console.WriteLine(response.Headers.ToString());

            var responseContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseContent);

            return null;
        }
    }

    internal class StringTable
    {
        public string[] ColumnNames { get; set; }
        public string[,] Values { get; set; }
    }
}
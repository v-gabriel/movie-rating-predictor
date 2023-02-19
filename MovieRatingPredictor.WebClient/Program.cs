using Microsoft.EntityFrameworkCore;
using MovieRatingPredictor.DAL.Context;
using MovieRatingPredictor.Model.Mapping;
using MovieRatingPredictor.Model.Models.AppSettings;
using MovieRatingPredictor.Service.Services;

var builder = WebApplication.CreateBuilder(args);

#region Services

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DB")));

builder.Services.AddAutoMapper(config => { config.AddProfile(new MappingProfile()); });

builder.Services.AddScoped<PredictionService>();
builder.Services.AddScoped<StatisticsService>();

builder.Services.AddSwaggerGen();

#endregion

#region Config

builder.Services.Configure<AzureMLSettings>(builder.Configuration.GetSection("AzureMLSettings"));

#endregion

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseSwagger();
app.UseSwaggerUI();

app.UseSwaggerUI(options =>
{
    options.RoutePrefix = "swagger";
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
});

app.MapControllerRoute(
    "default",
    "api/{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();
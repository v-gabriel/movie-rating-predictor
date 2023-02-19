# Movie rating predictor
Web app wrapped around the Azure ML service in order to predict an IMDb rating and provide related statistics. 

<br>

## Features

### Predict rating

Web form and Swagger API used for binding a model and getting a decimal result (0-10).

Binding model parameters:

- **Gross**: gross earnings in US dollars

- **Released year**: year the movie released

- **Runtime**: movie duration in minutes

- **Categories** (bool): horror, crime, comedy, romance, music, adventure, mystery, war, western, biography, history, thriller, sci-fi, action, drama


<br>

### Statistics

Table and graph statistics generated from submitted models and their results.

Provides visuals for:
- **model data and their results**

- **most used categories**

- **min max values**

- **most common release years**

<br>

## Deployment

ATM the app is deployed on Azure Cloud as a Web App service running on Linux, connected with the Microsoft SQL Server inside the resource groups' virtual network.

[Website](https://imdb-movie-rating-predictor.azurewebsites.net/)

> **__Note__** &nbsp; <br> This deployment is used as a test environment. Any issues, errors, bugs or unavailability is intentional.
  
<br>

## Tech

**IDEs:** [Visual Studio Code](https://code.visualstudio.com/), [Jetbrains Rider](https://www.jetbrains.com/rider/), [Azure Data Studio](https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=redhat-install%2Credhat-uninstall)

**Frameworks:** [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-7.0), [Angular](https://angular.io/guide/what-is-angular)

**Other:** [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads), [Azure Cloud services](https://portal.azure.com/#home) 

[![My Skills](https://skillicons.dev/icons?i=js,html,scss,typescript,dotnet,angular,azure)](https://skillicons.dev)

<br>

## References

[Used dataset](https://github.com/Tomislav0/datasets/blob/master/dataset_movies.csv), combined and cleaned from:

- [Kaggle](https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows)
- [Data.world](https://data.world/promptcloud/imdb-data-from-2006-to-2016) (summary version)

Attributions and used tools:

- [Undraw](https://undraw.co/)
- [Coolors.co](https://coolors.co/)
- [Animatiss](https://xsgames.co/animatiss/) (Licensed under FreeBSD License)
- [Navbar icon](https://www.svgrepo.com/svg/431146/movie) (Licensed under Apache License)

<br>

## Authors

Web app development and deployment:
- [@v-gabriel](https://github.com/v-gabriel)

Dataset research and cleanup, ML model development and deployment:
- [@Tomislav0](https://github.com/Tomislav0)

Research, testing and analysis:
- [@FC122](https://github.com/FC122)

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PredictRatingComponent } from './predict-rating/predict-rating.component';
import { RoutesKey } from './core/models/RoutesKey';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from './shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingService } from './core/services/loading.service';
import { NavMenuComponent } from './shared/shared/nav-menu/nav-menu.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { StateService } from './core/services/state.service';
import { EventBusService } from './core/services/event-bus.service';
import { NumberInputDirective } from './core/directives/number-input.directive';
import { FormInputDirective } from './core/directives/form-input.directive';
import { PredictionService } from './core/services/prediction.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PredictRatingComponent,
    StatisticsComponent,
    LoaderComponent,
    NumberInputDirective,
    NotFoundComponent,
    FormInputDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: RoutesKey.PredictRating, component: PredictRatingComponent },
      { path: RoutesKey.Statistics, component: StatisticsComponent },
      { path: RoutesKey.NotFound, component: NotFoundComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [LoadingService, StateService, EventBusService, PredictionService],
  bootstrap: [AppComponent],
})
export class AppModule {}

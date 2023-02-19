import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Color } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
import {
  NGX_COLOR,
  NGX_DATA_COLOR_SCHEME,
  NGX_SIZE_LARGE,
  NGX_SIZE_MEDIUM,
  NGX_SIZE_SMALL,
  NGX_SIZE_XSMALL,
} from '../core/constants';
import { UserStatisticDto } from '../core/models/dto/UserStatisticsDto';
import { INameValue } from '../core/models/NameValue';
import { Statistics } from '../core/models/Statistics';
import { LoadingService } from '../core/services/loading.service';
import { StatisticsService } from '../core/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('maxDataSort', { static: false }) set maxSort(el: MatSort) {
    if (el && this.maxData) {
      this.maxData.sort = el;
    }
  }
  @ViewChild('minDataSort', { static: false }) set minSort(el: MatSort) {
    if (el && this.minData) {
      this.minData.sort = el;
    }
  }
  @ViewChild('dataSort', { static: false }) set sort(el: MatSort) {
    if (el && this.data) {
      this.data.sort = el;
    }
  }
  @ViewChild('maxDataPaginator', { static: false }) set maxPaginator(
    el: MatPaginator
  ) {
    if (el && this.maxData) {
      this.maxData.paginator = el;
    }
  }
  @ViewChild('minDataPaginator', { static: false }) set minPaginator(
    el: MatPaginator
  ) {
    if (el && this.minData) {
      this.minData.paginator = el;
    }
  }
  @ViewChild('dataPaginator', { static: false }) set paginator(
    el: MatPaginator
  ) {
    if (el && this.data) {
      this.data.paginator = el;
    }
  }

  _paginator: MatPaginator | null = null;
  _minPaginator: MatPaginator | null = null;
  _maxPaginator: MatPaginator | null = null;

  public columns = [
    'imdbRating',
    'releasedYear',
    'gross',
    'runtimeMin',
    'isHorror',
    'isCrime',
    'isComedy',
    'isRomance',
    'isMusic',
    'isAdventure',
    'isMystery',
    'isWar',
    'isWestern',
    'isBiography',
    'isHistory',
    'isThriller',
    'isSciFi',
    'isAction',
    'isDrama',
  ];

  statistics: Statistics | undefined = undefined;

  public categoryStats: INameValue[] = [];
  public minStats: INameValue[] = [];
  public maxStats: INameValue[] = [];
  public yearStats: INameValue[] = [];

  ngxDataScheme: Color = NGX_DATA_COLOR_SCHEME;
  ngxColor: string = NGX_COLOR;
  ngxSizeM = NGX_SIZE_MEDIUM;
  ngxSizeS = NGX_SIZE_SMALL;
  ngxSizeXS = NGX_SIZE_XSMALL;
  ngxSizeL = NGX_SIZE_LARGE;

  public data: MatTableDataSource<UserStatisticDto> = new MatTableDataSource();
  public minData: MatTableDataSource<UserStatisticDto> =
    new MatTableDataSource();
  public maxData: MatTableDataSource<UserStatisticDto> =
    new MatTableDataSource();
  public resultJobId: string | null = null;

  constructor(
    public loadingService: LoadingService,
    private _statisticsService: StatisticsService
  ) {
    this.resultJobId = this.loadingService.startLoading();
    this.initData();
  }

  ngOnInit(): void {}

  initData() {
    forkJoin([
      this._statisticsService.getDetailedStatistics(),
      this._statisticsService.getUserStatistics(),
    ]).subscribe({
      next: ([statistics, userStatistics]) => {
        this.statistics = statistics;

        this.data.data = userStatistics;

        this.initGraphs();
      },
      error: (e) => {
        this.loadingService.endLoading(this.resultJobId!);
      },
      complete: () => {
        this.loadingService.endLoading(this.resultJobId!);
      },
    });
  }

  isDataReady() {
    if (
      this.statistics &&
      this.categoryStats.length != 0 &&
      this.maxStats.length != 0 &&
      this.minStats.length != 0 &&
      this.yearStats.length != 0
    ) {
      return true;
    }
    return false;
  }

  initGraphs() {
    //#region Category stats
    this.categoryStats.push({
      name: 'Action',
      value: this.statistics?.categoryStatistics.actionFlagCount!,
    });
    this.categoryStats.push({
      name: 'Adventure',
      value: this.statistics?.categoryStatistics.adventureFlagCount!,
    });
    this.categoryStats.push({
      name: 'Biography',
      value: this.statistics?.categoryStatistics.biographyFlagCount!,
    });
    this.categoryStats.push({
      name: 'Comedy',
      value: this.statistics?.categoryStatistics.comedyFlagCount!,
    });
    this.categoryStats.push({
      name: 'Crime',
      value: this.statistics?.categoryStatistics.crimeFlagCount!,
    });
    this.categoryStats.push({
      name: 'Action',
      value: this.statistics?.categoryStatistics.dramaFlagCount!,
    });
    this.categoryStats.push({
      name: 'History',
      value: this.statistics?.categoryStatistics.historyFlagCount!,
    });
    this.categoryStats.push({
      name: 'Horror',
      value: this.statistics?.categoryStatistics.horrorFlagCount!,
    });
    this.categoryStats.push({
      name: 'Music',
      value: this.statistics?.categoryStatistics.musicFlagCount!,
    });
    this.categoryStats.push({
      name: 'Mystery',
      value: this.statistics?.categoryStatistics.mysteryFlagCount!,
    });
    this.categoryStats.push({
      name: 'Romance',
      value: this.statistics?.categoryStatistics.romanceFlagCount!,
    });
    this.categoryStats.push({
      name: 'Sci-fi',
      value: this.statistics?.categoryStatistics.scifiFlagCount!,
    });
    this.categoryStats.push({
      name: 'Thriller',
      value: this.statistics?.categoryStatistics.thrillerFlagCount!,
    });
    this.categoryStats.push({
      name: 'War',
      value: this.statistics?.categoryStatistics.warFlagCount!,
    });
    this.categoryStats.push({
      name: 'Western',
      value: this.statistics?.categoryStatistics.westernFlagCount!,
    });
    //#endregion

    //#region Min max stats
    this.minStats.push({
      name: 'Gross min value',
      value: this.statistics?.grossStatistics.min!,
    });
    this.minStats.push({
      name: 'Runtime min value',
      value: this.statistics?.runtimeStatistics.min!,
    });

    this.maxStats.push({
      name: 'Gross max value',
      value: this.statistics?.grossStatistics.max!,
    });
    this.maxStats.push({
      name: 'Runtime max value',
      value: this.statistics?.runtimeStatistics.max!,
    });

    Object.keys(this.statistics?.yearStatistics.yearCountDictionary!).forEach(
      (key) => {
        this.yearStats.push({
          name: key,
          value: this.statistics?.yearStatistics.yearCountDictionary[key]!,
        });
      }
    );

    let minData = this.statistics?.minRatedUserStatistic ?? [];
    this.minData.data = minData;

    let maxData = this.statistics?.maxRatedUserStatistic ?? [];
    this.maxData.data = maxData;

    //#endregion
  }
}

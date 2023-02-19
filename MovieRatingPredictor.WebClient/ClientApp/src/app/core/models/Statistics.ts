import { UserStatisticDto } from './dto/UserStatisticsDto';

export interface YearStatistics {
  yearCountDictionary: { [key: string]: number };
}

export interface CategoryStatistics {
  crimeFlagCount: number;
  horrorFlagCount: number;
  comedyFlagCount: number;
  romanceFlagCount: number;
  musicFlagCount: number;
  adventureFlagCount: number;
  mysteryFlagCount: number;
  warFlagCount: number;
  westernFlagCount: number;
  biographyFlagCount: number;
  historyFlagCount: number;
  thrillerFlagCount: number;
  scifiFlagCount: number;
  actionFlagCount: number;
  dramaFlagCount: number;
}

export interface RuntimeStatistics {
  min: number;
  max: number;
}

export interface ImdbRatingStatistics {
  max: number;
  min: number;
}

export interface GrossStatistics {
  max: number;
  min: number;
}

export interface Statistics {
  categoryStatistics: CategoryStatistics;
  grossStatistics: GrossStatistics;
  runtimeStatistics: RuntimeStatistics;
  yearStatistics: YearStatistics;
  imdbRatingStatistics: ImdbRatingStatistics;
  maxRatedUserStatistic: UserStatisticDto[];
  minRatedUserStatistic: UserStatisticDto[];
}

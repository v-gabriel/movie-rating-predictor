import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserStatisticDto } from '../models/dto/UserStatisticsDto';
import { Statistics } from '../models/Statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private _serviceUrl: string;
  private _httpClient: HttpClient;

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    httpClient: HttpClient
  ) {
    this._serviceUrl = `${baseUrl}api/statistics`;
    this._httpClient = httpClient;
  }

  getUserStatistics() {
    return this._httpClient.get<UserStatisticDto[]>(`${this._serviceUrl}/base`);
  }

  getDetailedStatistics() {
    return this._httpClient.get<Statistics>(`${this._serviceUrl}/details`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IMLScoreRequestBindingModel } from '../models/bm/IMLScoreBindingModel';
import { IMLScoreResult } from '../models/IMLScoreResult';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private _serviceUrl: string;
  private _httpClient: HttpClient;

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    httpClient: HttpClient
  ) {
    this._serviceUrl = `${baseUrl}api/prediction`;
    this._httpClient = httpClient;
  }

  getPrediction(scoreBindingModel: IMLScoreRequestBindingModel) {
    return this._httpClient.post<IMLScoreResult>(
      `${this._serviceUrl}`,
      scoreBindingModel
    );
  }
}

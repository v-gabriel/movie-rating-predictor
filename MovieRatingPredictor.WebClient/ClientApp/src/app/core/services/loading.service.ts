import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _threadJobIds: string[] = [];

  public get threadJobIds() {
    return this._threadJobIds;
  }

  constructor() {}

  public startLoading(): string {
    let id = UUID.UUID();
    while (this._threadJobIds.includes(id)) {
      id = UUID.UUID();
    }

    this._threadJobIds.push(id);
    return id;
  }

  public endLoading(id: string) {
    if (this._threadJobIds.includes(id)) {
      this._threadJobIds = this._threadJobIds.filter((x) => !(x === id));
    }
  }

  public isLoading(id: string) {
    if (this._threadJobIds.includes(id)) {
      return true;
    }
    return false;
  }
}

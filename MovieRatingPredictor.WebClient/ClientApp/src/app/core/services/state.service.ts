import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _states: Map<string, Map<string, any>> = new Map<
    string,
    Map<string, any>
  >();

  constructor() {}

  public saveState(componentName: string, params: Map<string, any>) {
    let vmap = params;
    this._states.set(componentName, vmap);
  }

  public getState(componentName: any) {
    return this._states.get(componentName);
  }
}

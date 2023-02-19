import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<KeyValue<string, BusEvent>>();

  constructor() {}

  emit(event: KeyValue<string, BusEvent>) {
    this.subject$.next(event);
  }

  on(event: KeyValue<string, BusEventType>, action: any): Subscription {
    return this.subject$
      .pipe(
        filter(
          (e: KeyValue<string, BusEvent>) =>
            event.key === e.key && e.value.eventType === event.value
        ),
        map((e: KeyValue<string, BusEvent>) => {
          return e.value.value;
        })
      )
      .subscribe(action);
  }
}

export class BusEvent {
  constructor(
    private _eventType: BusEventType,
    private _value: any | null = null
  ) {}

  public get value() {
    return this._value;
  }

  public get eventType() {
    return this._eventType;
  }
}

export enum BusEventType {
  REFRESH,
}

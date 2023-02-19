import { Component } from '@angular/core';
import { RoutesKey } from '../core/models/RoutesKey';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {}

  public RoutesKey = RoutesKey;
}

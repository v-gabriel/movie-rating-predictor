import { Component } from '@angular/core';
import { RoutesKey } from './core/models/RoutesKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public RoutesKey = RoutesKey;

  title = 'app';
}

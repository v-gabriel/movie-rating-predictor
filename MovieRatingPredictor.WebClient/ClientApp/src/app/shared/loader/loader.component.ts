import { Component } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(private loadingService: LoadingService){

  }

  loading(){
    if(this.loadingService.threadJobIds.length != 0){
      return true;
    }
    return false;
  }
}

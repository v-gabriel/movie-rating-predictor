import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { first, map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CategoryEnum } from '../core/models/CategoryEnum';
import { CertificateEnum } from '../core/models/CertificateEnum';
import { LoadingService } from '../core/services/loading.service';
import { StateService } from '../core/services/state.service';
import {
  BusEvent,
  BusEventType,
  EventBusService,
} from '../core/services/event-bus.service';
import { ErrorMessageHelper } from '../core/helpers/error-message-helper';
import { PredictionService } from '../core/services/prediction.service';
import { IMLScoreRequestBindingModel } from '../core/models/bm/IMLScoreBindingModel';
import { IMLScoreResult } from '../core/models/IMLScoreResult';
import {
  MAX_GROSS_DOLLAR,
  MAX_RELEASED_YEAR,
  MAX_RUNTIME_MIN,
  MIN_GROSS_DOLLAR,
  MIN_RELEASED_YEAR,
  MIN_RUNTIME_MIN,
} from '../core/constants';

@Component({
  selector: 'app-predict-rating',
  templateUrl: './predict-rating.component.html',
  styleUrls: ['./predict-rating.component.css'],
})
export class PredictRatingComponent implements OnInit, OnDestroy {
  @ViewChild('resultElement') set resultElementRef(elRef: ElementRef) {
    if (elRef) {
      this._resultElementRef = elRef;
    }
  }

  private _resultElementRef: ElementRef | null = null;

  categories: string[] = Object.values(CategoryEnum).map((k) => {
    return k;
  });
  certificates: string[] = Object.values(CertificateEnum).map((k) => {
    return k;
  });

  public fg: FormGroup | null = null;
  public resultJobId: string | null = null;

  public predictionResult: number | null = null;

  public EMH = ErrorMessageHelper;

  public isReset = false;

  constructor(
    public loadingService: LoadingService,
    private _formBuilder: FormBuilder,
    private _stateService: StateService,
    private _busService: EventBusService,
    private _predictionService: PredictionService
  ) {
    this.initFormGroup();
    this.getState();
  }

  ngOnInit(): void {
    this._busService.on(
      { key: this.constructor.name, value: BusEventType.REFRESH },
      () => {
        this.getState();
      }
    );
  }

  ngOnDestroy(): void {
    this.saveState();
  }

  getState() {
    let state = this._stateService.getState(this.constructor.name);
    if (state) {
      this.fg = state?.get('fg') as FormGroup;
      this.predictionResult = state?.get('pr') as number;
    }
  }

  saveState() {
    let vmap = new Map<string, any>();
    vmap.set('fg', this.fg);
    vmap.set('pr', this.predictionResult);
    this._stateService.saveState(this.constructor.name, vmap);
  }

  initFormGroup() {
    this.fg = this._formBuilder.group({
      categories: [[]],
      gross: [
        '',
        [
          Validators.required,
          Validators.min(MIN_GROSS_DOLLAR),
          Validators.max(MAX_GROSS_DOLLAR),
        ],
      ],
      runtime: [
        '',
        [
          Validators.required,
          Validators.max(MAX_RUNTIME_MIN),
          Validators.min(MIN_RUNTIME_MIN),
        ],
      ],
      releasedYear: [
        '',
        [
          Validators.required,
          Validators.min(MIN_RELEASED_YEAR),
          Validators.max(MAX_RELEASED_YEAR),
        ],
      ],
    });
  }

  reset() {
    this.flashResultAnimation();

    this.initFormGroup();
    this.predictionResult = null;
  }

  submit() {
    this.flashResultAnimation();

    this.fg?.markAllAsTouched();
    this.fg?.updateValueAndValidity();

    let controls = this.fg?.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        return;
      }
    }

    this.resultJobId = this.loadingService.startLoading();

    this.predictionResult = null;

    var categoryKeys = Object.keys(CategoryEnum);

    var temp = (<IMLScoreRequestBindingModel>{}) as any;

    this.categories.forEach((el: string) => {
      var key = categoryKeys[this.categories.indexOf(el)];
      if (this.fg?.get('categories')?.value.includes(el)) {
        temp[`is${key}`] = true;
      } else {
        temp[`is${key}`] = false;
      }
    });

    var model: IMLScoreRequestBindingModel = temp;
    model.gross = this.fg?.get('gross')?.value;
    model.releasedYear = this.fg?.get('releasedYear')?.value;
    model.runtimeMin = this.fg?.get('runtime')?.value;

    this._predictionService
      .getPrediction(model)
      .pipe(first())
      .subscribe({
        next: (result: IMLScoreResult) => {
          this.predictionResult = result.imdbRating;
          this._busService.emit({
            key: this.constructor.name,
            value: new BusEvent(BusEventType.REFRESH, null),
          });
        },
        error: (e) => {
          this.loadingService.endLoading(this.resultJobId!);
        },
        complete: () => {
          this.loadingService.endLoading(this.resultJobId!);
        },
      });
  }

  flashResultAnimation() {
    if (this.predictionResult) {
      this._resultElementRef!.nativeElement.classList.remove(
        'g-animate-flash-warn'
      );
      void this._resultElementRef!.nativeElement.offsetWidth;
      this._resultElementRef!.nativeElement.classList.add(
        'g-animate-flash-warn'
      );
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictRatingComponent } from './predict-rating.component';

describe('PredictRatingComponent', () => {
  let component: PredictRatingComponent;
  let fixture: ComponentFixture<PredictRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredictRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

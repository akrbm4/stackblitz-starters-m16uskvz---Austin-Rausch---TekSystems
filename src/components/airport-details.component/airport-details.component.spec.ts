import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportDetailsComponent } from './airport-details.component';

describe('AirportDetailsComponent', () => {
  let component: AirportDetailsComponent;
  let fixture: ComponentFixture<AirportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

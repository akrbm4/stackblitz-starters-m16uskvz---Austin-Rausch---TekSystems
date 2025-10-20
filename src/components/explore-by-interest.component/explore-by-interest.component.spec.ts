import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreByInterestComponent } from './explore-by-interest.component';

describe('ExploreByInterestComponent', () => {
  let component: ExploreByInterestComponent;
  let fixture: ComponentFixture<ExploreByInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreByInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreByInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

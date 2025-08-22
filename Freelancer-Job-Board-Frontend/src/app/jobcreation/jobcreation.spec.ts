import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobcreation } from './jobcreation';

describe('Jobcreation', () => {
  let component: Jobcreation;
  let fixture: ComponentFixture<Jobcreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobcreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobcreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

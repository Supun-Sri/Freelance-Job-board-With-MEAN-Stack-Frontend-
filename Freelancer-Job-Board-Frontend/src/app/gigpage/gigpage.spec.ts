import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gigpage } from './gigpage';

describe('Gigpage', () => {
  let component: Gigpage;
  let fixture: ComponentFixture<Gigpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gigpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gigpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buypage } from './buypage';

describe('Buypage', () => {
  let component: Buypage;
  let fixture: ComponentFixture<Buypage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buypage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buypage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

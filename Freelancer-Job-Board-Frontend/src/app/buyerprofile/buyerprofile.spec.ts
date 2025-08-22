import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buyerprofile } from './buyerprofile';

describe('Buyerprofile', () => {
  let component: Buyerprofile;
  let fixture: ComponentFixture<Buyerprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buyerprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buyerprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

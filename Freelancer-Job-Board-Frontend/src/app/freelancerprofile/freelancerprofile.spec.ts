import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Freelancerprofile } from './freelancerprofile';

describe('Freelancerprofile', () => {
  let component: Freelancerprofile;
  let fixture: ComponentFixture<Freelancerprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Freelancerprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Freelancerprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

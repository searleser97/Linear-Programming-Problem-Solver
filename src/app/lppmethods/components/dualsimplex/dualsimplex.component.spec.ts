import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualsimplexComponent } from './dualsimplex.component';

describe('DualsimplexComponent', () => {
  let component: DualsimplexComponent;
  let fixture: ComponentFixture<DualsimplexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualsimplexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualsimplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

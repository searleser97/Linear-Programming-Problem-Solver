import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticInfoComponent } from './genetic-info.component';

describe('GeneticInfoComponent', () => {
  let component: GeneticInfoComponent;
  let fixture: ComponentFixture<GeneticInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

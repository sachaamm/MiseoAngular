import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesComponentComponent } from './services-component.component';

describe('ServicesComponentComponent', () => {
  let component: ServicesComponentComponent;
  let fixture: ComponentFixture<ServicesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

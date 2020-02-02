import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTemplateAComponent } from './modal-template-a.component';

describe('ModalTemplateAComponent', () => {
  let component: ModalTemplateAComponent;
  let fixture: ComponentFixture<ModalTemplateAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTemplateAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTemplateAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

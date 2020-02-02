import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTotalComponent } from './quotation-total.component';

describe('QuotationTotalComponent', () => {
  let component: QuotationTotalComponent;
  let fixture: ComponentFixture<QuotationTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

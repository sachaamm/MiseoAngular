import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quotation-total',
  templateUrl: './quotation-total.component.html',
  styleUrls: ['./quotation-total.component.scss']
})
export class QuotationTotalComponent implements OnInit {

  @Input() quotationAmount: number;
  @Input() hostingAmount: number;
  

  @Input() quotationStep: number;
  @Input() quotationType: number;
  
  

  constructor() { }

  ngOnInit() {
  }

  limitDecimal(n : number){
    return Math.round(n * 100) / 100
  }

}

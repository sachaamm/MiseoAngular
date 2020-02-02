import {Component, Input, OnInit, OnDestroy} from '@angular/core';

import { NgbActiveModal, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DevisService } from '../services/devis.service';

import { Subscription } from 'rxjs';
import { ModalTemplateAComponent } from '../modal-template-a/modal-template-a.component' 


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>This is the first step of the <b>quotation</b>, where client will choose additional options. Btw, you provided this arg :  {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}





@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.component.html'
})
export class NgbdModalBasic {
  closeResult: string;
  devisService: DevisService;

  devisStep : number;
  devisQuotationType : number;

  devisServiceStepSubscription : Subscription;
  devisServiceQuotationTypeSubscription : Subscription;
  
  constructor(private modalService: NgbModal, ds: DevisService) {
    this.devisService = ds;
    
  }

  
 open() {

  const modalRef = this.modalService.open(ModalTemplateAComponent);

  let devisStepTitle = "";
  /*
  if(this.devisStep == 1) devisStepTitle = "Sélection des options";
  if(this.devisStep == 2) devisStepTitle = "Définition requise des options sélectionnées";
  if(this.devisStep == 3) devisStepTitle = "Hébergement";
  if(this.devisStep == 4) devisStepTitle = "Récupération des informations";
  */
  if(this.devisStep == 1) devisStepTitle = "SelectionOptions";
  if(this.devisStep == 2) devisStepTitle = "DefinitionRequiseOptions";
  if(this.devisStep == 3) devisStepTitle = "Hebergement";
  if(this.devisStep == 4) devisStepTitle = "RecuperationInformationsClient";
  
  let quotationTypeTitle = "";
  if(this.devisQuotationType == 0) quotationTypeTitle = "SiteVitrine";
  if(this.devisQuotationType == 1) quotationTypeTitle = "ECommerce";
  if(this.devisQuotationType == 2) quotationTypeTitle = "ApplicationWeb";
  if(this.devisQuotationType == 3) quotationTypeTitle = "ApplicationMobile";

  //console.log();

  let name = quotationTypeTitle + "-" + devisStepTitle;
  
  //console.log("name " + name);

  modalRef.componentInstance.name = name;
  modalRef.result.then((result) => {

    console.log(`Closed with: ${result}`);

    this.devisStep++;
    
    this.devisService.setStep(this.devisStep);

  }, (reason) => {

    console.log(`Dismissed ${this.getDismissReason(reason)}`);

    this.devisService.setStep(0);

  });

}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(){

    this.devisServiceQuotationTypeSubscription = this.devisService.quotationTypeSubject.subscribe(
      (qt: number) => {
        this.devisQuotationType = qt;
        //console.log("devis qt changed " + qt);
      }
    );


    this.devisServiceStepSubscription = this.devisService.stepSubject.subscribe(
      (step: number) => {
        this.devisStep = step;
        if(step == 1 || step == 2 || step == 3 || step == 4) this.open();
      }
    );

    

    
    
  }

  ngOnDestroy(){
    console.log("Destroyed ! ");
    this.devisServiceStepSubscription.unsubscribe();
    this.devisServiceQuotationTypeSubscription.unsubscribe();
  }
}

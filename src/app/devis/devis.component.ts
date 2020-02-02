import { Component, OnInit, OnDestroy } from '@angular/core';
import { DevisService } from '../services/devis.service'
import { Subscription } from 'rxjs';
import { Router,NavigationEnd  } from '@angular/router';


@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

  //step: number; //
  quotationType : number; // 0: site vitrine , 1: e-shop , 2: webservice , 3: applicationMobile 
  devisService : DevisService;
  devisServiceStepSubscription : Subscription;
  devisServiceQuotationTypeSubscription : Subscription;
  

  routerSubscription : Subscription;
  route : Router;

  constructor(ds : DevisService, private r:Router) { 
   
    this.quotationType = 0;
    this.devisService = ds;
    
     this.route = r;

     this.routerSubscription = this.route.events.subscribe(e => {
      if(e instanceof NavigationEnd){

        this.devisService.setStep(0);
      }
    });

    
  }

  ngOnInit() {
    this.devisServiceStepSubscription = this.devisService.stepSubject.subscribe( // uselss
      (step: number) => {

        

          //console.log("step changed " + step);

      }
    );

    this.devisServiceQuotationTypeSubscription = this.devisService.stepSubject.subscribe( // uselss
      (quotationType: number) => {
     
          //console.log("quotation Type " + quotationType);
        
      }
    );

    

    

  }

  startQuotation(type){
    //this.selectQuotationType(type);
    this.devisService.setQuotationType(type);
    this.devisService.setStep(1);
   
    
    //this.step = 1; // Selection des options
  }

  selectQuotationType(type){
    this.quotationType = type;
  }

  routeEvent(router: Router){
    
  }

  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
    this.devisServiceStepSubscription.unsubscribe();
    this.devisServiceQuotationTypeSubscription.unsubscribe();
  }





}

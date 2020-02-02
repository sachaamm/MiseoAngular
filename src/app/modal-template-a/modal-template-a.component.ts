import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { DevisService } from '../services/devis.service';

import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { QuotationTotalComponent } from '../quotation-total/quotation-total.component';

const httpOptions = {
  headers: new HttpHeaders({
    "x-rapidapi-host": "domainstatus.p.rapidapi.com",
	"x-rapidapi-key": "d889755dcamshadd20f735a195f2p1c0368jsn2d58fd4a4407",
	"content-type": "application/json",
	"accept": "application/json"
  })
};



@Component({
  selector: 'app-modal-template-a',
  templateUrl: './modal-template-a.component.html',
  styleUrls: ['./modal-template-a.component.scss']
})

export class ModalTemplateAComponent implements OnInit {

  @Input() name; // DETERMINES FORM TYPE

  // SITE VITRINE ETAPE A
  @Input() siteVitrine_nbPages: number;
  @Input() siteVitrine_nbLanguages: number;
  @Input() siteVitrine_needCMS: boolean;
  @Input() siteVitrine_clientGetsDesignMockup: boolean;
  @Input() siteVitrine_referenceTemplate: string;

  @Input() siteVitrine_facebookWidgets: boolean;
  @Input() siteVitrine_googleStreetMaps: boolean;
  @Input() siteVitrine_OpenGraph: boolean;
  @Input() siteVitrine_CommentairesClients: boolean;


  // SITE VITRINE ETAPE B
  @Input() siteVitrine_IGotMediaContentForDesign: boolean;
  @Input() siteVitrine_IGotAFacebookAPI: boolean;
  @Input() siteVitrine_commentsInPages: boolean;
  @Input() siteVitrine_commentsInArticle: boolean;

  @Input() siteVitrine_clientFacebookAPI: string;

  // SITE VITRINE ETAPE C 
  @Input() siteVitrine_IWishAnHosting: boolean;
  @Input() siteVitrine_IGetADomaineName: boolean;
  @Input() siteVitrine_clientDomainName: string;
  @Input() siteVitrine_IGetAccessToMyDNSService: boolean;
  @Input() siteVitrine_IKnowWhichDomainNameIWant: boolean;
  @Input() siteVitrine_domaineNameUnknownWords: string;
  @Input() siteVitrine_domaineNameWanted: string;
  @Input() siteVitrine_websiteHoster: string;
  @Input() siteVitrine_domainNameProposal: string;
  @Input() siteVitrine_hostingProvider: string;

  // INFOS CLIENT
  @Input() infosClient_mail: string;
  @Input() infosClient_telephone: string;
  @Input() infosClient_modeContact: string;
  infosClient_validateMail: boolean;
  infosClient_validatePhone: boolean;
  

  /* @Input() siteVitrine_IKnowWhichDomainNameIWant: boolean; */
  siteVitrine_unknownDomaineNameWantedProposal: Array<string>;
  siteVitrine_canSplitDomaineNameWantedProposal: boolean;
  siteVitrine_domaineNameQueryIsCorrect: boolean;
  
  // STEP VALIDATIONS
  siteVitrine_thirdStepValidated: boolean;
  siteVitrine_fourthStepValidated: boolean;


  quotationAmount : number;
  quotationType : number;
  quotationStep : number;


  devisServiceSaveInterstepData : Subscription;

  devisService: DevisService;
  httpClient: HttpClient;

  //
  siteVitrine_ovhOffres: Array<string>; // Kimsufi / Perso / Pro
  siteVitrine_lwsOffres: Array<string>; // Perso / Starter
  siteVitrine_bigRockOffres: Array<string>; // Starter 

  hostingOffre: string;
  hostingAmount: number;
  hostingYears: number;




  constructor(ds : DevisService, public activeModal: NgbActiveModal, private hc: HttpClient) {

    this.siteVitrine_nbPages = 1;
    this.siteVitrine_nbLanguages = 1;

    this.siteVitrine_needCMS = false;
    this.siteVitrine_clientGetsDesignMockup = false;
    this.siteVitrine_facebookWidgets = false;
    this.siteVitrine_googleStreetMaps = false;
    
    this.siteVitrine_OpenGraph = true; // OPEN GRAPH ON ALL WEBISTES
    this.siteVitrine_CommentairesClients = false;

    //

    this.siteVitrine_IGotAFacebookAPI = false;
    this.siteVitrine_IGotMediaContentForDesign = false;
    this.siteVitrine_commentsInPages = false;
    this.siteVitrine_commentsInArticle = false;


    this.siteVitrine_IKnowWhichDomainNameIWant = true;

    


    this.devisService = ds;
    this.httpClient = hc;

    this.quotationAmount = 0;
    this.quotationType = ds.getQuotationType();

    //console.log("quotation type " + this.quotationType);

    //
    this.siteVitrine_unknownDomaineNameWantedProposal = ['Apple', 'Orange', 'Banana']; 
    this.siteVitrine_canSplitDomaineNameWantedProposal = false;
    this.siteVitrine_hostingProvider = "ovh";



    this.siteVitrine_domainNameProposal = null;

    this.siteVitrine_domaineNameQueryIsCorrect = false;
    this.siteVitrine_IWishAnHosting = true;
    this.siteVitrine_IGetADomaineName = false;
    this.siteVitrine_thirdStepValidated = false;

    this.infosClient_validateMail = false;

    this.hostingOffre = "ovh_kimsufi";
    this.hostingYears = 1; // PAR DEFAUT , UN AN D'HEBERGEMENT

    
  }

  ngOnInit() {

    let devisStep = this.devisService.getStep();
    this.quotationStep = devisStep;

    if(this.quotationType == 0){

      this.quotationAmount = 99; // SITE VITRINE BASE PRICE

    }

    


    console.log("init !!!");
    console.log(devisStep);
    console.log(this.devisService.mtacFirstStep);
    
    if(devisStep > 1){
      this.updateInterstepData(devisStep);
      console.log("Update quot amount");
    }

    if(devisStep == 3) this.updateHostingPrice();


  }



  updateInterstepData(devisStep: number){

    if(devisStep == 2) this.quotationAmount = this.devisService.mtacFirstStep.quotationAmount;
    if(devisStep == 3) this.quotationAmount = this.devisService.mtacSecondStep.quotationAmount;
    if(devisStep == 4) this.quotationAmount = this.devisService.mtacThirdStep.quotationAmount;
    

    if(devisStep > 1){
      this.siteVitrine_nbPages = this.devisService.mtacFirstStep.siteVitrine_nbPages;
      this.siteVitrine_nbLanguages = this.devisService.mtacFirstStep.siteVitrine_nbLanguages;
      this.siteVitrine_needCMS = this.devisService.mtacFirstStep.siteVitrine_needCMS;
      this.siteVitrine_clientGetsDesignMockup = this.devisService.mtacFirstStep.siteVitrine_clientGetsDesignMockup;
      this.siteVitrine_referenceTemplate = this.devisService.mtacFirstStep.siteVitrine_referenceTemplate;
      
      this.siteVitrine_facebookWidgets = this.devisService.mtacFirstStep.siteVitrine_facebookWidgets;
      this.siteVitrine_googleStreetMaps = this.devisService.mtacFirstStep.siteVitrine_googleStreetMaps;
      this.siteVitrine_OpenGraph = this.devisService.mtacFirstStep.siteVitrine_OpenGraph;
      this.siteVitrine_CommentairesClients = this.devisService.mtacFirstStep.siteVitrine_CommentairesClients;    
    }

    if(devisStep > 2){
      this.siteVitrine_IGotMediaContentForDesign = this.devisService.mtacSecondStep.siteVitrine_IGotMediaContentForDesign;
      this.siteVitrine_IGotAFacebookAPI = this.devisService.mtacSecondStep.siteVitrine_IGotAFacebookAPI;
      this.siteVitrine_commentsInPages = this.devisService.mtacSecondStep.siteVitrine_commentsInPages;
      this.siteVitrine_commentsInArticle = this.devisService.mtacSecondStep.siteVitrine_commentsInArticle;
    }

    if(devisStep > 3){
      this.siteVitrine_IWishAnHosting = this.devisService.mtacThirdStep.siteVitrine_IWishAnHosting;
      this.siteVitrine_IGetADomaineName = this.devisService.mtacThirdStep.siteVitrine_IGetADomaineName;
      this.siteVitrine_clientDomainName = this.devisService.mtacThirdStep.siteVitrine_clientDomainName;
      this.siteVitrine_IGetAccessToMyDNSService = this.devisService.mtacThirdStep.siteVitrine_IGetAccessToMyDNSService;
      this.siteVitrine_IKnowWhichDomainNameIWant = this.devisService.mtacThirdStep.siteVitrine_IKnowWhichDomainNameIWant;
      this.siteVitrine_domaineNameUnknownWords = this.devisService.mtacThirdStep.siteVitrine_domaineNameUnknownWords;
      this.siteVitrine_websiteHoster = this.devisService.mtacThirdStep.siteVitrine_websiteHoster;
      this.siteVitrine_domainNameProposal = this.devisService.mtacThirdStep.siteVitrine_domainNameProposal;
      this.siteVitrine_hostingProvider = this.devisService.mtacThirdStep.siteVitrine_hostingProvider;
      this.hostingAmount = this.devisService.mtacThirdStep.hostingAmount;
    }

  }



  updateForm(){

    this.updatePrice();

    if(this.name == "SiteVitrine-Hebergement"){

      console.log('updateThirdStepValidation');
      // console.log(this.siteVitrine_domainNameProposal);
      this.updateThirdStepValidation();

      this.updateHostingPrice();
    }

   
  }

  updatePrice(){

    let defaultPrice = 0;

    if(this.name == "SiteVitrine-SelectionOptions"){
      
      defaultPrice = 99;
      this.quotationAmount = defaultPrice;

      let priceForAdditionalPage = 60;
      let priceForAdditionalLanguage = 100;

      let additionalForCMS = 50;

      if(this.siteVitrine_needCMS) this.quotationAmount += additionalForCMS;

      let additionalPageAmount = (this.siteVitrine_nbPages - 1) * priceForAdditionalPage;
      console.log("additional Page amount " + additionalPageAmount);
      this.quotationAmount += additionalPageAmount;

      let additionalLanguageAmount = (this.siteVitrine_nbLanguages - 1) * priceForAdditionalLanguage;
      console.log("additional Language amount " + additionalLanguageAmount);
      this.quotationAmount += additionalLanguageAmount;

      let additionalForPersonnalMockup = 40;
      let additionalForPersonnalMockupPerPage = 40;

      if(this.siteVitrine_clientGetsDesignMockup) this.quotationAmount += additionalForPersonnalMockup + (this.siteVitrine_nbPages * additionalForPersonnalMockupPerPage);

      let priceForFacebookWidgets = 79;
      if(this.siteVitrine_facebookWidgets) this.quotationAmount += priceForFacebookWidgets;

      let priceForGSM = 50; // GOOGLE STREET MAPS
      if(this.siteVitrine_googleStreetMaps) this.quotationAmount += priceForGSM;

      let priceForClientsComments = 90;
      if(this.siteVitrine_CommentairesClients) this.quotationAmount += priceForClientsComments;

      console.log("Total pour site vitrine : " + this.quotationAmount);
    }




  }

  updateHostingPrice(){
    this.hostingAmount = 50;

    let hostingPerYear = 0;
    if(this.hostingOffre == 'ovh_kimsufi') hostingPerYear = 1.79;
    if(this.hostingOffre == 'ovh_perso') hostingPerYear = 3.59;
    if(this.hostingOffre == 'ovh_pro') hostingPerYear = 7.19;

    if(this.hostingOffre == 'lws_perso') hostingPerYear = 1.79;
    if(this.hostingOffre == 'lws_starter') hostingPerYear = 4.19;
  
    if(this.hostingOffre == 'bigrock_starter'){
      if(this.hostingYears == 1) hostingPerYear = 2.15;
      if(this.hostingYears == 2) hostingPerYear = 2.06;
      if(this.hostingYears == 3) hostingPerYear = 1.97;
      if(this.hostingYears == 5) hostingPerYear = 1.79;
      if(this.hostingYears == 10) hostingPerYear = 1.43;
    }

    this.hostingAmount = hostingPerYear * this.hostingYears * 12;
    this.hostingAmount = Math.round(this.hostingAmount * 100) / 100
  }


  updateThirdStepValidation(){
    if(this.siteVitrine_IWishAnHosting == false) this.siteVitrine_thirdStepValidated = true;
    if(this.siteVitrine_IKnowWhichDomainNameIWant == true && this.siteVitrine_domaineNameQueryIsCorrect == true){
      this.siteVitrine_thirdStepValidated = true;
    }

    if(this.siteVitrine_IKnowWhichDomainNameIWant == true && this.siteVitrine_domaineNameQueryIsCorrect == false){
      this.siteVitrine_thirdStepValidated = false;
    }

    if(this.siteVitrine_IWishAnHosting == true && this.siteVitrine_hostingProvider != null){

    }
   
  }

  selectHostingProvider(p: string){

    this.siteVitrine_hostingProvider = p;

    if(p == 'ovh') this.hostingOffre = "ovh_kimsufi";
    if(p == 'lws') this.hostingOffre = "lws_perso";
    if(p == 'bigrock') this.hostingOffre = "bigrock_starter";

    this.updateHostingPrice();
  }

  selectHostingOffre(p: string){
    //this.siteVitrine_o
    this.hostingOffre = p;



    // et on calcule le prix de l'hébergement
    this.updateHostingPrice();
  }

  onSearchChange(searchValue: string): void {  
    // console.log(searchValue);
    // console.log(this.siteVitrine_domaineNameUnknownWords);
  }

  onDomaineNameCheckAvailability(searchValue: string): void { 

    let regex = RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/);
    let isValidDomainName = regex.test(searchValue);

    this.siteVitrine_domaineNameQueryIsCorrect = isValidDomainName;

    console.log("is valid domain name " + isValidDomainName);

    this.updateThirdStepValidation();

    /*
    if(isValidDomainName){
      let urlQuery = "http://" + searchValue;
      let body = {"domain": urlQuery };
      // let body = {"domain": "http://www.amazon.co.uk/whatever"};
      let url ="https://domainstatus.p.rapidapi.com/";
     
      this.httpClient.post(url,body,httpOptions).subscribe(
        (e) => {
          console.log("result");
          console.log(e);
        }
      );
    }
    */
    
  }

  onMailValidation(searchValue: string): void { 
    let regex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  
    let isValidMail = regex.test(searchValue);

    this.infosClient_validateMail = isValidMail;

    this.updateFourthStepValidation();
  
  }

  onPhoneValidation(searchValue: string): void { 

    // ^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$
    let regex = RegExp(/^((\+)33|0)[1-9](\d{2}){4}$/);
  
    let isValidPhone = regex.test(searchValue);

    this.infosClient_validatePhone = isValidPhone;

    this.updateFourthStepValidation();

  }


  updateFourthStepValidation(){
    
    console.log("update fourth step " + this.siteVitrine_fourthStepValidated );
    
    if(this.infosClient_validateMail){
      this.siteVitrine_fourthStepValidated = true;
    }else{
      this.siteVitrine_fourthStepValidated = false;
    }

    if(this.infosClient_validatePhone){
      this.siteVitrine_fourthStepValidated = true;
    }else{
      this.siteVitrine_fourthStepValidated = false;
    }

  }

  onDomainNameProposal(searchValue: string): void {  
    console.log("Domain Name Proposal");
    console.log(this.siteVitrine_domaineNameUnknownWords);

    console.log(this.siteVitrine_domaineNameUnknownWords.split(" "));

    let spl = this.siteVitrine_domaineNameUnknownWords.split(" ");

    this.siteVitrine_canSplitDomaineNameWantedProposal = true;
  
    let splLg = spl.length;

    let availableWords = [];

    
    for(let i = 0 ; i < spl.length ; i++){
      //console.log(spl[i]);
      if(spl[i].length == 0){
        splLg--;
      }else{
        availableWords.push(spl[i]);
      }

    }

    console.log(splLg);

    if(splLg <= 1)this.siteVitrine_canSplitDomaineNameWantedProposal = false;

    let numberOfProposals = 5;

    this.siteVitrine_unknownDomaineNameWantedProposal = [];

    this.siteVitrine_unknownDomaineNameWantedProposal.push(availableWords[0] + "." + availableWords[1] + ".fr");
    this.siteVitrine_unknownDomaineNameWantedProposal.push(availableWords[1] + "." + availableWords[0] + ".com");
    this.siteVitrine_unknownDomaineNameWantedProposal.push(availableWords[0] + "." + availableWords[1] + ".org");

    /*
    for(let i = 0 ;  i < numberOfProposals.length ; i++){

    }
    */

    console.log(this.siteVitrine_domainNameProposal);



    //this.siteVitrine_canSplitDomaineNameWantedProposal = this.siteVitrine_domaineNameUnknownWords.split(" ")
  }

  ngOnDestroy(){

    this.devisService.saveInterdataBetweenSteps(this);

    console.log("destroyed !!");
  }

  submitQuotation(){


    let body = { "dest": "sachaamm@gmail.com" };

    this.httpClient
    .post('https://us-central1-miseofirebase.cloudfunctions.net/sendMail', body)
    //.post('http://localhost:3000/', body)
    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' );
        console.log(error);
      }
    );


  }

}

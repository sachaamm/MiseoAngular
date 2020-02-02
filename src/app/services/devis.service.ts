import { Subject } from 'rxjs';
import { ModalTemplateAComponent } from '../modal-template-a/modal-template-a.component';
import { ɵConsole } from '@angular/core';


export class DevisService{

    private step: number;
    private quotationType: number;
    private saveInterstepDataNumber: number;

    stepSubject = new Subject<number>();
    quotationTypeSubject = new Subject<number>();
    saveInterstepSubject = new Subject<number>();

    mtacFirstStep : ModalTemplateAComponent;
    mtacSecondStep : ModalTemplateAComponent;
    mtacThirdStep : ModalTemplateAComponent;

    constructor(){
        this.step = 0;
        this.saveInterstepDataNumber = 1;
    }

    emitStepSubject(){
        this.stepSubject.next(this.step);
    }

    emitQuotationType(){
        this.quotationTypeSubject.next(this.quotationType);
    }




    setStep(newStep){
        this.step = newStep;
        this.emitStepSubject();
    }

    getStep(){
        return this.step;
    }

    setQuotationType(newQuotationType){
        this.quotationType = newQuotationType;
        this.emitQuotationType();
    }

    getQuotationType(){
        return this.quotationType;
    }


    saveInterdataBetweenSteps(mtac : ModalTemplateAComponent){
        console.log("saveFirstStep");
        console.log(this.step);


        if(this.step == 1)this.mtacFirstStep = mtac;
        if(this.step == 2)this.mtacSecondStep = mtac;
        if(this.step == 3)this.mtacThirdStep = mtac;
        
    }
 

    






}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { DevisComponent } from './devis/devis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { ExemplesComponent } from './exemples/exemples.component';
import { HttpClientModule } from '@angular/common/http';

import { NgbdModalBasic } from './modal-basic/modal-basic.component';
import { NgbdModalContent } from './modal-basic/modal-basic.component';

import { ServicesComponentComponent } from './services-component/services-component.component';

import { DevisService } from './services/devis.service';
import { AuthGuardService } from './services/auth-guard.service';


import { ModalTemplateAComponent } from './modal-template-a/modal-template-a.component';
import { QuotationTotalComponent } from './quotation-total/quotation-total.component';
import { EmptyComponent } from './empty/empty.component' 



// currently there is a bug while building the app with --prod
// - https://github.com/RaphaelJenni/FirebaseUI-Angular/issues/76
// the plugin exposes the two libraries as well. You can use those:
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
 
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


import { NameEditorComponent } from './name-editor/name-editor.component';

import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { SingleBookComponent } from './single-book/single-book.component';

 
const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};



const appRoutes: Routes = [
  
  { path: 'home',      component: HomeComponent },
  { path: 'tech', component: TechComponent },
  { path: 'devis',      component: DevisComponent },
  { path: 'services',      component: ServicesComponentComponent },
  { path: 'exemples',      component: ExemplesComponent },
  { path: 'empty',      component: EmptyComponent },
  
  { path: 'empty/auth/signup', component: SignupComponent },
  { path: 'empty/auth/signin', component: SigninComponent },
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent },
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent }

  //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCwfa_fKNCVrDMR1E88S79mpQP-6qertew4
];


@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    DevisComponent,
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent,

    ExemplesComponent,

    NgbdModalBasic,

    ServicesComponentComponent,
    NgbdModalContent,
    ModalTemplateAComponent,
    QuotationTotalComponent,
    EmptyComponent,
    SignupComponent,
    SigninComponent,
    NameEditorComponent,
    BookListComponent,
    BookFormComponent,
    SingleBookComponent

  ],
  entryComponents: [
    NgbdModalContent,
    ModalTemplateAComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
      { enableTracing: false } // <-- debugging purposes only
    ),

    FirebaseUIModule.forRoot(firebaseUiAuthConfig)

  ],
  providers: [
    DevisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

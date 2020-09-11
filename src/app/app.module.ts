import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddEditComponent } from './images/addEdit/add-edit.component';
import { ImagesListComponent } from './images/images.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { reducers } from './store/app.state';
import { AuthEffects } from './store/effects/auth.effects';
import { ImageEffects } from './store/effects/image.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImagesListComponent,
    SignUpComponent,
    LoginComponent,
    AddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([ImageEffects, AuthEffects]),
  ],
  providers: [...environment.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}

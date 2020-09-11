import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
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

export default {
  title: 'App',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        ImagesListComponent,
        AddEditComponent,
        SignUpComponent,
      ],
      imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        EffectsModule.forRoot([AuthEffects, ImageEffects]),
        StoreModule.forRoot(reducers, {}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
} as Meta;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  component: AppComponent,
  props: args,
});

export const app = Template.bind({});
app.args = {
  user: {},
};

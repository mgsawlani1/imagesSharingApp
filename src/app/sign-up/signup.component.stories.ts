import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { reducers } from '../store/app.state';
import { AuthEffects } from '../store/effects/auth.effects';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'SignUp',
  component: SignUpComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(reducers, {}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }),
  ],
} as Meta;

const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  component: SignUpComponent,
  props: args,
});
export const signup = Template.bind({});
signup.args = {
  user: {},
};

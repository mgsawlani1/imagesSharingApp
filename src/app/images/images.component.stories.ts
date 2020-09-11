import { APP_BASE_HREF, CommonModule } from '@angular/common';
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
import { ImageEffects } from '../store/effects/image.effect';
import { ImagesListComponent } from './images.component';

export default {
  title: 'ImagesList',
  component: ImagesListComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
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

const Template: Story<ImagesListComponent> = (args: ImagesListComponent) => ({
  component: ImagesListComponent,
  props: args,
});
export const Default = Template.bind({});
Default.args = {
  user: {},
  images: [],
};

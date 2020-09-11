import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { reducers } from '../../store/app.state';
import { AddEditComponent } from './add-edit.component';

export default {
  title: 'AddEdit',
  component: AddEditComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }),
  ],
} as Meta;

const Template: Story<AddEditComponent> = (args: AddEditComponent) => ({
  component: AddEditComponent,
  props: args,
});
export const addImages = Template.bind({});
addImages.args = {
  user: {},
};
export const editImage = Template.bind({});
editImage.args = {
  user: {},
  edit: true,
  id: 1,
};

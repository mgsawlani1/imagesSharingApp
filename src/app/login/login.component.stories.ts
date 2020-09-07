import { moduleMetadata, storiesOf } from '@storybook/angular';
import { LoginComponent } from './login.component';

storiesOf('login', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoginComponent],
    })
  )
  .add('login page', () => {
    return {
      template: `<app-login></app-login>`,
      props: {},
    };
  });

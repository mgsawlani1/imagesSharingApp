import { moduleMetadata, storiesOf } from '@storybook/angular';
import { HeaderComponent } from './header.component';

storiesOf('header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [HeaderComponent],
    })
  )
  .add('header has been done', () => {
    return {
      template: `<app-header></app-header>`,
      props: {},
    };
  });

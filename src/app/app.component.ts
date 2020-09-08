import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  setMode = false;
  title = 'ImagesApp';

  receiveMode($event): any {
    this.setMode = $event;
  }
}

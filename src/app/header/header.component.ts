import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface Todo {
  title: string;
  done: boolean;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() mode = new EventEmitter<boolean>();

  setDark = false;
  constructor() {}

  ngOnInit(): void {}

  onChangeToggle(): any {
    this.setDark = !this.setDark;
    this.mode.emit(this.setDark);
  }
}

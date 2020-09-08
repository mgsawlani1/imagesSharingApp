import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '../core/services/auth.service';
import { Image } from './../core/models/image';
import { ImagesService } from './../core/services/images.service';
import { ImagesListComponent } from './images.component';

const dummyPosts: Image[] = [
  {
    id: 1,
    name: 'Incidunt et magni est ut',
    description: 'Incidunt et magni est ut',
    imageUrl: 'assets/nature.jpg',
  },
  {
    id: 2,
    name: 'Incidunt et magni est ut',
    description: 'Incidunt et magni est ut',
    imageUrl: 'assets/nature.jpg',
  },
  {
    id: 3,
    name: 'Incidunt et magni est ut',
    description: 'Incidunt et magni est ut',
    imageUrl: 'assets/nature.jpg',
  },
];

describe('ImagesListComponent', () => {
  let component: ImagesListComponent;
  let fixture: ComponentFixture<ImagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ImagesListComponent],
      providers: [AuthService, ImagesService, provideMockStore()],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

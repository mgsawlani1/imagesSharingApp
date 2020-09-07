import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Image } from './../core/models/image';
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
      declarations: [ImagesListComponent],
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

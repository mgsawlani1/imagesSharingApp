import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Image } from '../models/image';
import { ImagesService } from './images.service';

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

describe('ImagesService', () => {
  let service: ImagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImagesService],
    });
    this.service = TestBed.inject(ImagesService);
  });
  beforeEach(inject([ImagesService, HttpTestingController], (_service, _httpMock) => {
    service = _service;
    httpMock = _httpMock;
  }));

  it('should be created', () => {
    const service1 = TestBed.inject(ImagesService);
    expect(service1).toBeTruthy();
  });
  it('getAllImages: should return a list', () => {
    this.service.getImageData().subscribe((images) => {
      expect(images).toBeDefined();
      expect(images.length).toBe(3);
      const req = httpMock.expectOne('http://localhost:3000/images');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });

  it('delete: should delete object', () => {
    this.service.deleteImageById().subscribe((images) => {
      expect(images).toBeDefined();
      const req = httpMock.expectOne('http://localhost:3000/images');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });

  it('create: should create a image', () => {
    const imageCreated = {
      name: 'new created',
      description: 'new created',
      imageUrl: 'new created',
    };
    this.service.addImage(imageCreated).subscribe((images) => {
      expect(images).toBeDefined();
      expect(images.length).toBe(1);
      const req = httpMock.expectOne('http://localhost:3000/images');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
  it('update: should update a image and return the updated image', () => {
    const imageCreated = {
      name: 'image -updated',
      description: 'image- update',
      imageUrl: 'image- updated',
    };
    this.service.updateImage(imageCreated).subscribe((images) => {
      expect(images).toBeDefined();
      expect(images.length).toBe(1);
      const req = httpMock.expectOne('http://localhost:3000/images');
      req.flush(dummyPosts);
      httpMock.verify();
    });
  });
});

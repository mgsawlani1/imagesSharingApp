import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

const dummyUsers = [
  {
    username: 'test',
    password: 'test123',
  },
];

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    this.service = TestBed.inject(AuthService);
  });

  beforeEach(inject([AuthService, HttpTestingController], (_service, _httpMock) => {
    service = _service;
    httpTestingController = _httpMock;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login: should return an array containing the valid user', () => {
    const mockCheckLoginUser = {
      username: 'test',
      password: 'test123',
    };
    this.service
      .getAuthData({
        username: 'test',
        password: 'test123',
      })
      .subscribe((user) => {
        expect(user).toBeDefined();
        expect(user.length).toBe(1);
        expect(user.id).toBe(1);
      });
    const req = httpTestingController.expectOne('http://localhost:3000/auth');
    req.flush(dummyUsers);
    httpTestingController.verify();
  });

  it('signup: should return  the valid user', () => {
    const mockCheckLoginUser = {
      username: 'new',
      password: 'new',
    };
    this.service.addUser(mockCheckLoginUser).subscribe((user) => {
      expect(user.username).toBe(mockCheckLoginUser.username);
      expect(user.password).toBe(mockCheckLoginUser.password);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/auth');
    req.flush(dummyUsers);
    httpTestingController.verify();
  });
});

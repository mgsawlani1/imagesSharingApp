import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

const dummyUsers = [
  {
    id: '1',
    username: 'user',
    password: 'password',
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

  beforeEach(inject([AuthService, HttpTestingController], (service, httpMock) => {
    service = service;
    httpTestingController = httpMock;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login: should return an array containing the valid user', () => {
    const mockCheckLoginUser = {
      username: 'abc',
      password: 'password',
    };
    this.service
      .login({
        username: 'abc',
        password: 'password',
      })
      .subscribe((user) => {
        expect(user).toBeDefined();
        expect(user.length).toBe(1);
        expect(user.id).toBe(1);
      });
    const req = httpTestingController.expectOne(
      'http://localhost:3000/auth?username=' +
        mockCheckLoginUser.username +
        '&password=' +
        mockCheckLoginUser.password
    );
    req.flush(dummyUsers);
    httpTestingController.verify();
  });

  it('signup: should return  the valid user', () => {
    const mockCheckLoginUser = {
      username: 'new',
      password: 'new',
    };
    this.service.signUp(mockCheckLoginUser).subscribe((user) => {
      expect(user.name).toBe(mockCheckLoginUser.username);
      expect(user.password).toBe(mockCheckLoginUser.password);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/auth');
    req.flush(dummyUsers);
    httpTestingController.verify();
  });
});
import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate if user role is admin', (done: DoneFn) => {
    authServiceSpy.getUserRole.and.returnValue(of('admin'));

    const routeMock: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateMock: RouterStateSnapshot = { url: '/admin' } as RouterStateSnapshot;

    guard.canActivate(routeMock, stateMock).subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should redirect to login if user role is not admin', (done: DoneFn) => {
    authServiceSpy.getUserRole.and.returnValue(of('user'));
    const urlTree: UrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(urlTree);

    const routeMock: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateMock: RouterStateSnapshot = { url: '/admin' } as RouterStateSnapshot;

    guard.canActivate(routeMock, stateMock).subscribe(result => {
      expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
      expect(result).toEqual(urlTree);
      done();
    });
  });
});

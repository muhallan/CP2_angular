import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AlertService, AuthenticationService } from '../_services/index';
import { testUser } from '../_models/index';

import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'RxJs';
import { HttpModule } from '@angular/http';

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthenticationService; // the TestBed injected service
    let router: Router;
    let alert: AlertService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule, HttpModule
            ],
            declarations: [
                LoginComponent
            ],
            providers: [
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: Router, useClass: RouterStub },
                { provide: AuthenticationService, useClass: AuthService },
                { provide: AlertService, useClass: MockAlertService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(LoginComponent);
                component = fixture.componentInstance;
                authService = TestBed.get(AuthenticationService);
                router = TestBed.get(Router);
                alert = TestBed.get(AlertService);
                fixture.detectChanges();
            });
    }));

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    describe('when the login page loads', () => {
        it('the loading spinner should not show', () => {
            expect(component.loading).toBe(false);
        });
        it('the initial values to be empty', () => {
            expect(component.model.email).toEqual('');
            expect(component.model.password).toEqual('');
        });
    });

    describe('when a valid email and password are entered', () => {
        it('then the home route should be displayed', () => {
            const routerSpy = spyOn(router, 'navigate').and.returnValue('');
            component.login('test', 'test');
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalled();
            expect(routerSpy).toHaveBeenCalledWith(['/']);
        });
        it('the logged in user is returned', () => {
            spyOn(authService, 'login').and.returnValue(Observable.of(testUser));
            component.login('test', 'test');
            fixture.detectChanges();
            expect(component.user).toEqual(testUser);
        });
    });

    describe('when an invalid username and password are entered', () => {
        it(`then 'Unknown email or password' error should be displayed`, () => {
            spyOn(authService, 'login').and.returnValue(Observable.throw({status: 401}));
            spyOn(alert, 'error').and.returnValue('');
            component.login('', '');
            expect(component.loading).toBe(false);
            expect(alert.error).toHaveBeenCalled();
            expect(component.error).toEqual('Unknown email or password');
        });

        it(`then router navigate should not be called`, () => {
            spyOn(authService, 'login').and.returnValue(Observable.throw({status: 401}));
            spyOn(router, 'navigate').and.returnValue('');
            component.login('', '');
            expect(router.navigate).not.toHaveBeenCalled();
        });
    });
});

class AuthService {
    login(email: string, password: string) {
        if (email === 'test' && password === 'test') {
            return Observable.of(testUser);
        } else {
            return Observable.throw({status: 401});
        }
    }
    logout() {

    }
}

class MockAlertService {
    success(message: string) {}
    error(message: string) {}
    getMessage(): Observable<any> {
        return new Observable<void>();
    }
}

class MockActivatedRoute {
    // here you can add your mock objects, like snapshot or parent or whatever
    // example:
    snapshot = {
      queryParams: {returnUrl: '/' },
      routeConfig: { children: { filter: () => {} } }
    };
  }

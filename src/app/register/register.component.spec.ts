import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AlertService, UserService } from '../_services/index';
import { testUser, User } from '../_models/index';

import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'RxJs';
import { HttpModule } from '@angular/http';

describe('Component: Login', () => {

    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let userService: UserService; // the TestBed injected service
    let router: Router;
    let alert: AlertService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule, HttpModule
            ],
            declarations: [
                RegisterComponent
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
                { provide: UserService, useClass: MockUserService },
                { provide: AlertService, useClass: MockAlertService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(RegisterComponent);
                component = fixture.componentInstance;
                userService = TestBed.get(UserService);
                router = TestBed.get(Router);
                alert = TestBed.get(AlertService);
                fixture.detectChanges();
            });
    }));

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    describe('when the sign up page loads', () => {
        it('the loading spinner should not show', () => {
            expect(component.loading).toBe(false);
        });
        it('the initial values to be empty', () => {
            expect(component.model).toEqual({});
        });
    });

    describe('when valid registration values are entered', () => {
        it('then the login route should be displayed', () => {
            const routerSpy = spyOn(router, 'navigate').and.returnValue('');
            component.register(testUser);
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalled();
            expect(routerSpy).toHaveBeenCalledWith(['/login']);
        });
        it(`the 'Registered successfully' message is returned`, () => {
            spyOn(userService, 'create').and.returnValue(Observable.of({'message': 'You registered successfully. Please log in.'}));
            const alertSpy = spyOn(alert, 'success').and.returnValue('');
            component.register(testUser);
            fixture.detectChanges();
            expect(alert.success).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalledWith('Registration successful', true);
            expect(component.response).toEqual({'message': 'You registered successfully. Please log in.'});
        });
    });

    describe('when invalid values are entered', () => {

        it(`then 'Invalid data' error should be displayed`, () => {
            spyOn(userService, 'create').and.returnValue(Observable.throw({_body: JSON.stringify({message: 'Invalid data'})}));
            const alertSpy = spyOn(alert, 'error').and.returnValue('');
            const user = new User();
            component.register(user);
            expect(alert.error).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalledWith('Invalid data');
        });

        it(`then router navigate should not be called`, () => {
            spyOn(userService, 'create').and.returnValue(Observable.throw({_body: JSON.stringify({message: 'Invalid data'})}));
            spyOn(router, 'navigate').and.returnValue('');
            const user = new User();
            component.register(user);
            fixture.detectChanges();
            expect(router.navigate).not.toHaveBeenCalled();
            expect(component.loading).toBe(false);
        });
    });
});

class MockAlertService {
    success(message: string) {}
    error(message: string) {}
    getMessage(): Observable<any> {
        return new Observable<void>();
    }
}

class MockUserService {
    create(user: User) {
        if (user === testUser) {
            return Observable.of({'message': 'You registered successfully. Please log in.'});
        } else {
            return Observable.throw({_body: JSON.stringify({message: 'Invalid data'})});
        }
    }
}

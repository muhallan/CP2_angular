import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Http, Headers, Response, RequestOptions, HttpModule } from '@angular/http';

describe('Authentication Service', () => {
    let auth;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpModule ],
        providers: [ AuthenticationService ]
    }));

    // inject the AuthenticationService
    beforeEach(inject([AuthenticationService], authService => {
        auth = authService;
    }));

    it('can instantiate service with inject service',
    inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service instanceof AuthenticationService).toBe(true);
    }));

});


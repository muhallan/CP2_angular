import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet, RouterStub, ActivatedRouteStub } from '../_helpers/router-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../_services/index';
import { Observable } from 'RxJs';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeaderComponent ],
      providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: Router, useClass: RouterStub },
          { provide: AuthenticationService, useClass: AuthService },
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class AuthService {
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


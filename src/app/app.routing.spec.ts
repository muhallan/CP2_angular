import {TestBed, async, fakeAsync, tick, inject} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Router, RouterModule, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Location, APP_BASE_HREF} from '@angular/common';

import { LoginComponent } from './login/index';

import { AppModule } from './app.module';

describe('Router tests', () => {
    let router;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          AppModule
        ],
        providers: [{provide: APP_BASE_HREF, useValue: ''}]
      }).compileComponents();
    });
    beforeEach(inject([Router], _router => {
      router = _router;
    }));

    it('can navigate to login (fakeAsync/tick)', fakeAsync(() => {
      const fixture = TestBed.createComponent(LoginComponent);
      router.navigate(['/login']);
      fixture.detectChanges();
      // execute all pending asynchronous calls
      tick();
      expect(location.pathname.endsWith('/login')).toBe(true);
    }));
    it('should redirect unexisting urls to PageNotFound (fakeAsync/tick)', fakeAsync(() => {
      const fixture = TestBed.createComponent(LoginComponent);
      router.navigate(['/undefined/route']);
      fixture.detectChanges();
      // execute all pending asynchronous calls
      tick();
      expect(location.pathname.endsWith('/page-not-found')).toBe(true);
    }));
  });

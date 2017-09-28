import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageTitle = 'My Bucketlist';
  user_email: string;
  returnUrl: string;
  search_value: string;
  selectedLimit = 5;

  @Output()
  limit: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  display: boolean;

  @Output()
  search_query: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('userEmail');
    this.user_email = currentUser;
  }

  logout() {
    this.returnUrl = 'login';
    this.router.navigate([this.returnUrl]);
    this.authenticationService.logout();
  }

  performSearch() {
    this.search_query.emit(this.search_value);
  }

  onLimitChange(newValue) {
    this.selectedLimit = newValue;
    this.limit.emit(this.selectedLimit);
  }
}

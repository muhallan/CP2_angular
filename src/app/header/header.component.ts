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
  search_value = '';
  selectedLimit = 5;

  // output the number of items per page
  @Output()
  limit: EventEmitter<number> = new EventEmitter<number>();

  // used to determine whether to show the page controls
  @Input()
  display: boolean;

  // used to output the entered search query
  @Output()
  search_query: EventEmitter<string> = new EventEmitter<string>();

  // inject the services
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('userEmail');
    this.user_email = currentUser;
  }

  // call the logout method of the service and redirect to login
  logout() {
    this.returnUrl = 'login';
    this.router.navigate([this.returnUrl]);
    this.authenticationService.logout();
  }

  // emit the search query
  performSearch() {
    this.search_query.emit(this.search_value);
  }

  // method called when a limit value is selected
  onLimitChange(newValue) {
    this.selectedLimit = newValue;
    this.limit.emit(this.selectedLimit);
  }
}

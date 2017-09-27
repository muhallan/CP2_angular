import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard, BucketlistDetailGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistService } from './_services/index';
import { AddBucketlistComponent } from './add-bucketlist/add-bucketlist.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';
import { HeaderComponent } from './header/header.component';
import { ModalDeleteBucketlistComponent, DeleteBucketlistService } from './modal-delete-bucketlist/modal-delete-bucketlist.component';
import { ModalEditBucketlistComponent, EditBucketlistService } from './modal-edit-bucketlist/modal-edit-bucketlist.component';
import { ModalEditBucketlistItemComponent,
    EditBucketlistItemService } from './modal-edit-bucketlist-item/modal-edit-bucketlist-item.component';
import { ModalDeleteBucketlistItemComponent,
    DeleteBucketlistItemService } from './modal-delete-bucketlist-item/modal-delete-bucketlist-item.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        routing,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        BucketlistsComponent,
        AddBucketlistComponent,
        BucketlistDetailComponent,
        HeaderComponent,
        ModalDeleteBucketlistComponent,
        ModalEditBucketlistComponent,
        ModalEditBucketlistItemComponent,
        ModalDeleteBucketlistItemComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        BucketlistService,
        BucketlistDetailGuard,
        DeleteBucketlistService,
        EditBucketlistService,
        EditBucketlistItemService,
        DeleteBucketlistItemService
    ],
    entryComponents: [
        ModalDeleteBucketlistComponent,
        ModalEditBucketlistComponent,
        ModalEditBucketlistItemComponent,
        ModalDeleteBucketlistItemComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

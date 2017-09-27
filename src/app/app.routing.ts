import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard, BucketlistDetailGuard } from './_guards/index';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';

const appRoutes: Routes = [
    { path: '', component: BucketlistsComponent, canActivate: [AuthGuard] },
    { path: 'bucketlists', component: BucketlistsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'bucketlists/:id',
    canActivate: [ BucketlistDetailGuard ],
    component: BucketlistDetailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

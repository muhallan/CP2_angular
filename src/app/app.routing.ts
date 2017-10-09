import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard, BucketlistDetailGuard } from './_guards/index';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { BucketlistDetailComponent } from './bucketlist-detail/bucketlist-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'bucketlists', pathMatch: 'full' },
    { path: 'bucketlists',
        component: BucketlistsComponent,
        canActivate: [ AuthGuard ],
        pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'bucketlists/:id',
    canActivate: [ AuthGuard, BucketlistDetailGuard ],
    component: BucketlistDetailComponent, pathMatch: 'full' },
    { path: 'page-not-found', component: PageNotFoundComponent, pathMatch: 'full' },
    // otherwise redirect to not found page
    { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);

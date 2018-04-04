import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { SeqRecordListComponent }    from './seq-record-list/seq-record-list.component'
import { ProjectListComponent }    from './project-list/project-list.component'
import { ProjectDetailComponent }    from './project-detail/project-detail.component'
import { ProjectBundleComponent }    from './project-bundle/project-bundle.component'
import { CombinatorialDetailComponent } from './combinatorial-detail/combinatorial-detail.component'
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectCsvDownloaderComponent } from './project-csv-downloader/project-csv-downloader.component';
import { IceLoginSetterComponent } from './ice-login-setter/ice-login-setter.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'combinatorial',
    component: ProjectBundleComponent
  },
  {
    path: 'combinatorial/:id',
    component: CombinatorialDetailComponent
  },
  {
    path: 'new_project',
    component: NewProjectComponent
  },
  {
    path: 'create_projects',
    component: ProjectCreateComponent
  },
  {
    path: 'browse',
    component: ProjectCsvDownloaderComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
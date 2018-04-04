import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientXsrfModule, HttpClientModule } from '@angular/common/http'
import { DragulaModule } from 'ng2-dragula';
import { CovalentDataTableModule,
         CovalentLayoutModule,
         CovalentExpansionPanelModule,
         CovalentPagingModule,
         CovalentSearchModule,
         CovalentStepsModule } from '@covalent/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule,
         MatCheckboxModule,
         MatSelectModule,
         MatTooltipModule,
         MatTabsModule,
         MatTableModule,
         MatInputModule,
         MatCardModule,
         MatToolbarModule,
         MatListModule,
         MatSidenavModule,
         MatRadioModule,
         MatIconModule,
         MatMenuModule,
         MatDialogModule,
         MatGridListModule,
         MatOptionModule,
         MatAutocompleteModule } from '@angular/material';

import { routing } from './app.routing';
import './rxjs-extensions';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SeqRecordService } from './seq-record.service';
import { ProjectService } from './project.service';
import { IcePartService, PartService } from './part.service';
import { CombinatorialService } from './combinatorial.service'

import { AuthModule } from './auth/auth.module';
import { xsrfFactory } from './csrf-strategy/csrf-strategy.module';

import { SeqRecordListComponent } from './seq-record-list/seq-record-list.component';
import { SeqRecordSearchComponent } from './seq-record-search/seq-record-search.component';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

import { LoginComponent } from './login/login.component';

import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { SequenceSelectorComponent } from './sequence-selector/sequence-selector.component';
import { PartSearchComponent } from './part-search/part-search.component';
import { PartUploaderComponent } from './part-uploader/part-uploader.component';
import { ProjectBundleComponent } from './project-bundle/project-bundle.component';
import { AmuserSettingsComponent } from './amuser-settings/amuser-settings.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { PartSelectorComponent } from './part-selector/part-selector.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectBundleCardsComponent } from './project-bundle-cards/project-bundle-cards.component';
import { WelcomeTextComponent } from './welcome-text/welcome-text.component';
import { ProjectVisualizerComponent, SafePipe } from './project-visualizer/project-visualizer.component';
import { PrimerDetailComponent } from './primer-detail/primer-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectCsvDownloaderComponent } from './project-csv-downloader/project-csv-downloader.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { CombinatorialDetailComponent } from './combinatorial-detail/combinatorial-detail.component';
import { CombinatorialTableComponent } from './combinatorial-table/combinatorial-table.component';
import { PartMultiSelectorComponent } from './part-multi-selector/part-multi-selector.component';
import { IceLoginSetterComponent } from './ice-login-setter/ice-login-setter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PartErrorDialogComponent } from './part-error-dialog/part-error-dialog.component';
import { ProjectErrorDialogComponent } from './project-error-dialog/project-error-dialog.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: '_xsrf',
      headerName: 'X-CSRFToken'
    }),
    DragulaModule,
    AuthModule,
    CovalentDataTableModule,
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentStepsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    routing,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatOptionModule,
    MatAutocompleteModule
  ],
  declarations: [
    AppComponent,
    SeqRecordListComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    SeqRecordSearchComponent,
    LoginComponent,
    ReportDetailComponent,
    ProjectSearchComponent,
    SequenceSelectorComponent,
    PartSearchComponent,
    PartUploaderComponent,
    ProjectBundleComponent,
    AmuserSettingsComponent,
    NewProjectComponent,
    PartSelectorComponent,
    ProjectCardComponent,
    ProjectBundleCardsComponent,
    WelcomeTextComponent,
    ProjectVisualizerComponent,
    SafePipe,
    PrimerDetailComponent,
    ProjectCreateComponent,
    ProjectCsvDownloaderComponent,
    ProjectTableComponent,
    CombinatorialDetailComponent,
    CombinatorialTableComponent,
    PartMultiSelectorComponent,
    IceLoginSetterComponent,
    NotFoundComponent,
    PartErrorDialogComponent,
    ProjectErrorDialogComponent,
  ],
  providers: [
    SeqRecordService,
    ProjectService,
    PartService,
    IcePartService,
    CombinatorialService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    LoginComponent,
    PartErrorDialogComponent,
    ProjectErrorDialogComponent
  ]
})
export class AppModule { }

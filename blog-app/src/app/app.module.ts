import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {ContainerComponent} from './component/container/container.component';
import {LoginComponent} from './component/login/login.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EditComponent} from './component/edit/edit.component';
import {ListComponent} from './component/list/list.component';
import {ShowComponent} from './component/show/show.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule, MatSnackBar, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {ModalModule, PopoverModule, TooltipModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContainerComponent,
    LoginComponent,
    EditComponent,
    ListComponent,
    ShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      }
    }),
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

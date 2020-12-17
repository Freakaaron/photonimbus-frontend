import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UsersComponent } from './components/users/users.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { OthersComponent } from './components/others/others.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageUploadComponent,
    HomeComponent,
    ImageComponent,
    PaginationComponent,
    UsersComponent,
    ImageModalComponent,
    OthersComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ParkingService } from '../app/core/services/parking.service';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {CloudinaryModule} from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [AppComponent, AddVehicleComponent, VehicleDetailsComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule,
    NgxDropzoneModule
  ],
  providers: [ParkingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

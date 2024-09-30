import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { ParkingService } from './core/services/parking.service';
import { LocalStoreService } from './core/services/local-storage.service';
import { IVehicleData, ESpaceStatus } from './vehicle.config';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'space-booking';
  img!: CloudinaryImage;

  constructor(
    public dialog: MatDialog,
    private parkingService: ParkingService,
    private localStoreService: LocalStoreService) {
      localStoreService.setToLocalStorage();
      localStoreService.setSpacePrice();
  }

  totalSpaces: IVehicleData[];

  clickSpace(space: any): void {
    if (space.status === ESpaceStatus.RESERVED) {
      const dialogRef = this.dialog.open(VehicleDetailsComponent, {
        width: '550px',
        height: '600px',
        data: space,
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        this.getAllParkingSpaces();
      });
      return;
    }
    this.openDialog(space);
  }

  openDialog(space: any): void {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      width: '550px',
      height: '600px',
      data: space,
    });

    dialogRef.afterClosed().subscribe((result) => {
     // this.getAllParkingSpaces();
     
      this.getDataFromLocalStorage();
    });
  }

  ngOnInit(): void {
    // this.getAllParkingSpaces();
    this.getDataFromLocalStorage();
  }

  // data get from json server
  getAllParkingSpaces(): void {
    this.parkingService.getAllSpaces().subscribe((spaces: any) => {
      this.totalSpaces = spaces;
    });
  }

  // data get from localstorage
  getDataFromLocalStorage(): void {
    this.totalSpaces = this.localStoreService.getSpaceData();
    //console.log('HERE :- ', this.totalSpaces);
  }
}

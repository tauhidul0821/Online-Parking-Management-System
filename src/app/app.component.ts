import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { ParkingService } from './core/services/parking.service';
import { IVehicleData } from './vehicle.config';
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
    private parkingService: ParkingService
  ) {}

  totalSpaces: IVehicleData[];

  clickSpace(space: any): void {
    if (space.title) {
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
      width: '450px',
      height: '400px',
      data: space,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllParkingSpaces();
    });
  }

  ngOnInit(): void {
    this.getAllParkingSpaces();
  }

  initCloudInstance(): void{
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'demo'
      }
    });
  }

  getAllParkingSpaces(): void {
    this.parkingService.getAllSpaces().subscribe((spaces: any) => {
      this.totalSpaces = spaces;
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { IVehicleData } from '../../vehicle.config';
import { ParkingService } from 'src/app/core/services/parking.service';
import { LocalStoreService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit{
  today = new Date();
  spacePrice: number;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private parkingService: ParkingService,
    @Inject(MAT_DIALOG_DATA) public data: IVehicleData,
    private localStoreService: LocalStoreService
  ) {}


  ngOnInit(): void {
    this.getPlacePrice();
  }

  
  getPlacePrice(): void {
    this.parkingService.getSpacePrice().subscribe((spacePrice: number) => {
      this.spacePrice = spacePrice;
    });
  }

  get diffInHours(): number {
    const reservedDateAndTime = String(this.data.reservedDateTime);
    const reservedDateTime = new Date(reservedDateAndTime);
    const currentDateTime = new Date();
    const diffInMs = currentDateTime.getTime() - reservedDateTime.getTime();
    return diffInMs / (1000 * 60 * 60);
  }

  get totalCost(): number {
    return this.diffInHours * this.spacePrice;
  }

  releaseNow(): void{
    const modifyData: IVehicleData = {
      id: this.data.id,
      img: '',
      title: '',
      spacePrice: 0,
      status: 'AVAILABLE' 
    }

    // using json server.
    // this.parkingService.updateSpaces(modifyData).subscribe(res=> {
    //   this.dialogRef.close();
    // })

    // using localstorage
    const updatedValue = this.localStoreService.updateSpace(modifyData);
    if(updatedValue){
      this.dialogRef.close();
    }


  }
}

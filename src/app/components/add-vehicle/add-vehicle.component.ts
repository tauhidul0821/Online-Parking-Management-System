import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParkingService } from 'src/app/core/services/parking.service';
import { markFormGroupTouch } from 'src/app/core/utils';
import { IVehicleData } from '../../vehicle.config';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent implements OnInit {
  srcResult: any;
  vehicleForm: any;
  spacePrice: number;

  constructor(
    private formBuilder: FormBuilder,
    private parkingsService: ParkingService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: IVehicleData
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPlacePrice();
  }

  initForm(): void {
    this.vehicleForm = this.formBuilder.group({
      vehicleNumber: this.formBuilder.control(null, Validators.required),
      price: this.formBuilder.control(this.spacePrice),
      vehiclePhoto: this.formBuilder.control(null),
    });
  }

  getPlacePrice(): void {
    this.parkingsService.getSpacePrice().subscribe((spacePrice: number) => {
      this.spacePrice = spacePrice;
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addNew(): void {

    console.log(this.vehicleForm.value)
    if (!this.vehicleForm.invalid) {
      const date = new Date();
      const mapVehicleInfo: IVehicleData = {
        id: this.data?.id,
        spacePrice: this.spacePrice,
        title: this.vehicleForm?.value?.vehicleNumber,
        img: '/assets/car3.jpg',
        reservedDateTime: date,
        status: 'RESERVED'
      };

      console.log(mapVehicleInfo)

      this.vehicleForm.patchValue({ price: this.spacePrice });

      this.parkingsService.updateSpaces(mapVehicleInfo).subscribe((res) => {
        this.dialogRef.close();
      });
    } else {
      markFormGroupTouch(this.vehicleForm);
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}

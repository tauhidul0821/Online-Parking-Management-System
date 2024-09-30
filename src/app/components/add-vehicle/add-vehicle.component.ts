import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParkingService } from 'src/app/core/services/parking.service';
import { markFormGroupTouch } from 'src/app/core/utils';
import { IVehicleData } from '../../vehicle.config';
import { LocalStoreService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent implements OnInit {
  srcResult: any;
  vehicleForm: any;
  spacePrice: number;
  files: File[] = [];
  imageData: any;

  constructor(
    private formBuilder: FormBuilder,
    private parkingsService: ParkingService,
    public dialogRef: MatDialogRef<any>,
    private localStoreService: LocalStoreService,
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
    if (!this.vehicleForm.invalid) {
      const date = new Date();
      
      //this.onUpload();

      
    if(this.files[0]){
      console.log('Please select image')
    }

    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'parking-management-system');
    data.append('cloud_name', 'ddrvnegkl')


    this.parkingsService.uploadImage(data).subscribe(res=>{
      const mapVehicleInfo: IVehicleData = {
        id: this.data?.id,
        spacePrice: this.spacePrice,
        title: this.vehicleForm?.value?.vehicleNumber,
        img: res.url,
        reservedDateTime: date,
        status: 'RESERVED'
      };

      console.log(mapVehicleInfo)

      // using json server
      // this.parkingsService.updateSpaces(mapVehicleInfo).subscribe((res22) => {
      //   this.dialogRef.close();
      // });

      // using localstorage
      const updatedValue = this.localStoreService.updateSpace(mapVehicleInfo);
      if(updatedValue){
        this.dialogRef.close();
      }
    })


    } else {
      markFormGroupTouch(this.vehicleForm);
    }
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVehicleData } from '../../vehicle.config';

@Injectable()
export class LocalStoreService {

    spaceData: any;

    getData(): any{
        return [
                {
                id: "1",
                spacePrice: 3,
                title: "sdfsdfsdf",
                img: "/assets/car3.jpg",
                reservedDateTime: "2024-09-29T21:27:44.726Z",
                status: "RESERVED"
                },
                {
                id: "2",
                img: "",
                title: "",
                spacePrice: 0,
                status: "AVAILABLE"
                },
                {
                id: "3",
                spacePrice: 10,
                title: "gdfgdfg",
                img: "/assets/car3.jpg",
                reservedDateTime: "2024-09-29T19:15:52.406Z",
                status: "RESERVED"
                },
                {
                id: "4",
                img: "",
                title: "",
                spacePrice: 0,
                status: "AVAILABLE"
                },
                {
                id: "5",
                spacePrice: 3,
                title: "New Car",
                img: "http://res.cloudinary.com/ddrvnegkl/image/upload/v1727650979/zknkxurrbbpgjl5yrv2k.jpg",
                reservedDateTime: "2024-09-29T23:02:58.562Z",
                status: "RESERVED"
                },
                {
                id: "6",
                img: "",
                title: "",
                spacePrice: 0,
                status: "AVAILABLE"
                },
                {
                id: "7",
                spacePrice: 3,
                title: "sdfsdfsf",
                img: "/assets/car3.jpg",
                reservedDateTime: "2024-09-29T21:57:36.995Z",
                status: "RESERVED"
                },
                {
                id: "8",
                img: "",
                title: "",
                spacePrice: 0,
                status: "AVAILABLE"
                },
                {
                id: "9",
                spacePrice: 10,
                title: "fgdfgdfgdfg",
                img: "/assets/car3.jpg",
                reservedDateTime: "2024-09-29T19:16:23.304Z",
                status: "RESERVED"
                },
                {
                id: "10",
                img: "",
                title: "",
                spacePrice: 0,
                status: "AVAILABLE"
                }
        ]
    }

    getSpacePrice(): any{
        const spacePrice = 3;
        return spacePrice;
    }

    setToLocalStorage(){
        const data = this.getData()
        localStorage.setItem('space', JSON.stringify(data));
    }

    updateSpace(data: IVehicleData){
        const dataString = localStorage.getItem('space');
        if (dataString) {
          const parkingSpaces = JSON.parse(dataString);
          const spaceToUpdate = parkingSpaces.find((space: IVehicleData) => space.id === data.id);
          if (spaceToUpdate) {
            spaceToUpdate.reservedDateTime = data.reservedDateTime;
            spaceToUpdate.id = data.id;
            spaceToUpdate.img = data.img;
            spaceToUpdate.title = data.title;
            spaceToUpdate.status = data.status;
          }

          console.log('Here....',parkingSpaces);
          
          localStorage.setItem('space', JSON.stringify(parkingSpaces));
          return parkingSpaces;
        }
    }

    reliseSpace(data: IVehicleData){
        const dataString = localStorage.getItem('space');
        if (dataString) {
          const parkingSpaces = JSON.parse(dataString);
          const spaceToUpdate = parkingSpaces.find((space: IVehicleData) => space.id === data.id);
          if (spaceToUpdate) {
            spaceToUpdate.reservedDateTime =  '';
            spaceToUpdate.id = data.id;
            spaceToUpdate.img = '';
            spaceToUpdate.title = '';
            spaceToUpdate.status = 'AVAILABLE';
          }
          console.log(parkingSpaces);
          
          localStorage.setItem('space', JSON.stringify(parkingSpaces));
          return parkingSpaces;
        }
    }

    setSpacePrice(){
        const data = this.getSpacePrice()
        localStorage.setItem('spacePrice', JSON.stringify(data));
    }

    getSpaceData(): any{
        const dataString = localStorage.getItem('space'); // 'parkingSpaces' is your localStorage key

        if (dataString) {
          const parkingSpaces = JSON.parse(dataString); // Convert the string back to an array of objects
          console.log(parkingSpaces);
          return parkingSpaces;
        }
    }


}
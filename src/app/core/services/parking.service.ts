import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVehicleData } from '../../vehicle.config';

@Injectable()
export class ParkingService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllSpaces(): Observable<IVehicleData[]> {
    return this.http.get<IVehicleData[]>(this.baseUrl + '/space');
  }

  postSpaces(data: IVehicleData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/space', data);
  }

  updateSpaces(data: IVehicleData): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/space/' + data?.id, data);
  }

  getSpacePrice(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/spacePrice');
  }

  uploadImage(data: any): Observable<any>{

    return this.http.post('https://api.cloudinary.com/v1_1/ddrvnegkl/upload', data);
  }
}

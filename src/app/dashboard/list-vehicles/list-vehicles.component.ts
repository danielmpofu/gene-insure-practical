import {Component, OnInit} from '@angular/core';
import {VehicleModel} from '../../shared/models/VehicleModel';
import {NetworkService} from '../../shared/services/network.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.css']
})
export class ListVehiclesComponent implements OnInit {

  ngOnInit(): void {
    this.getVehicles();
  }

  vehicleList: VehicleModel[] = [];

  constructor(private networkService: NetworkService, private router: Router, private  httpClient: HttpClient) {
  }

  getVehicles() {
    this.vehicleList = [];
    this.httpClient.get<{ [key: string]: VehicleModel }>(this.networkService.baseUrl + 'api/vehicles/')
      .subscribe(responseData => {
        for (let resp in responseData) {
          if (+responseData[resp].ownerId === +localStorage.getItem('userId')) {
            this.vehicleList.push(
              {
                'id': responseData[resp].id,
                'regNo': responseData[resp].regNo,
                'picUrl': responseData[resp].picUrl,
                'brand': responseData[resp].brand,
                'model': responseData[resp].model,
                'color': responseData[resp].color,
                'ownerId': responseData[resp].ownerId,
                'monthlyAmount': responseData[resp].monthlyAmount,
                'ownerNationalId': responseData[resp].ownerNationalId,
                'registrationDate': responseData[resp].registrationDate

              }
            );
          }

        }
      });

  }


}

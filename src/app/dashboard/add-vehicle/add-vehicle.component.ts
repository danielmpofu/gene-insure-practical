import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NetworkService} from '../../shared/services/network.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private networkService: NetworkService, private router: Router, private  httpClient: HttpClient) {
  }


  ngOnInit(): void {
  }

  saveVehicle(form: NgForm) {
    let vehicle = form.value;
    vehicle.ownerId = +localStorage.getItem('userId');
    vehicle.ownerNationalId = localStorage.getItem('nationalId');

    //date time is handled by the server
    this.addVehicle(vehicle);
  }

  addVehicle(vehicle) {
    let url = this.networkService.baseUrl + 'api/vehicles/add';
    console.log(vehicle);
    this.httpClient.post(url, vehicle).subscribe(
      response => {
        console.log(vehicle);
        return response;
      }, error => {
        console.log(error);
        throw  error;
      }
    );
    this.reload();
  }


  reload() {
    this.router.navigate(['/'])
  }


}

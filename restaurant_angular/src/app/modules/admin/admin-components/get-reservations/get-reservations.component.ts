import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrls: ['./get-reservations.component.scss']
})
export class GetReservationsComponent {

  isSpinning: boolean = false;
  reservations: any;

  constructor(private service: AdminService,
  private message: NzMessageService){}

  ngOnInit(){
    this.getReservationByUser();
  }

  getReservationByUser(){
    this.service.getReservation().subscribe((res) => {
      console.log(res);
      this.reservations = res;
    })
  }

  changeReservationStatus(reservationId: number, status: string){
    console.log(reservationId);
    console.log(status);
    this.service.changeReservationStatus(reservationId,status).subscribe((res) => {
      console.log(res);
      if(res.id != null){
        this.getReservationByUser();
        this.message.success(`Reservation status changed successfully.`, { nzDuration: 5000 });
      } else {
        this.message.error(`Something went wrong`, { nzDuration: 5000 });
      }
    })
  }

}

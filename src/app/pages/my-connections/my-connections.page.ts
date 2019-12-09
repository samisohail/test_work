import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServices } from 'src/app/services/user-services.service';
import { ApiResponse } from 'src/app/models/api-response';
import { Subject, Subscription } from 'rxjs';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { RequestsService } from 'src/app/services/requests.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-connections',
  templateUrl: './my-connections.page.html',
  styleUrls: ['./my-connections.page.scss'],
})
export class MyConnectionsPage implements OnInit, OnDestroy {

  step = 0;
  private connections: any;
  private onDestroy = new Subject();
  conSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(
    private userService: UserServices,
    private toasterService: ToasterService,
    private requestService: RequestsService) {
  }

  ngOnInit() {
    this.getConnections();
  }

  getConnections() {
    this.conSubscription = this.userService.getMyConnections()
    .subscribe( (response: ApiResponse) => {
      console.log(`connections: `, response);
      this.connections = response.data;
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  async block(connectionId: number, name: string) {
     const response = await this.toasterService.presentAlertConfirm('Are you sure to block ' + name);
     console.log(response);
     if (response === true) {
        this.requestService.block(connectionId).subscribe(apiResponse => {
          console.log(apiResponse);
        });
     }
  }

  async delete(connectionId: number, name: string) {
    const response = await this.toasterService.presentAlertConfirm('Are you sure to block ' + name);
    console.log(response);
    if (response === true) {
      this.deleteSubscription = this.requestService.remove(connectionId).subscribe( (apiResponse: ApiResponse) => {
          this.toasterService.toast(apiResponse.message);
          this.getConnections();
       }, error => {
          this.toasterService.toast(`Oops! something went wrong. Try later.`);
       });
    }
 }

  ngOnDestroy(): void {
    this.conSubscription.unsubscribe();
    if (!!this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    this.onDestroy.next();
  }

}

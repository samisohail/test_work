import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';
import { ApiResponse } from 'src/app/models/api-response';

export interface ILocationAttributes {
  name: string;
}

const dataSource: ILocationAttributes[] = [
  { name: `Distance`},
  { name: `Street`},
  { name: `City`},
  { name: `State`},
  { name: `Country`}
];

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {

  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<ILocationAttributes>(dataSource);

  private name: string;

  ///// LOCATION  //////
  private distance = false;
  private street = false;
  private city = false;
  private state = false;
  private country = false;

  constructor(
    private requestService: RequestsService,
    public dialogRef: MatDialogRef<UserProfilePage>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data: ', data.requestId);
    this.requestService.getRequestById(data.requestId)
      .subscribe( (response: ApiResponse) => {
        console.log(response);
        if (response.status) {
          this.name = response.data.requestByName;
          const location = response.data.locationShared;
          Object.keys(location).forEach( (element, val) => {
            switch(element) {
              case `distance`:
                this.distance = location[element];
                break;
              case `street`:
                this.street = location[element];
                break;
              case `city`:
                this.city = location[element];
                break;
              case `state`:
                this.state = location[element];
                break;
              case `country`:
                this.country = location[element];
                break;
            }
          });
        }
      },
      error => {

      });
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit(

  ) {
  }

}

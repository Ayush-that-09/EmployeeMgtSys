import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { SortType } from '@swimlane/ngx-datatable';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePage } from './delete/update.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  loadingIndicator!: boolean;


  rows: any[] = [];
  originalRows: any[] = []
  selectedRow: any = null;

  constructor(private http: HttpClient, private modalCtrl: ModalController, private alertCntrl: AlertController, private router: Router) { }
  ngOnInit(): void {
    this.fetchrecord();


  }

  fetchrecord() {
    this.loadingIndicator = true;
    this.http.get('http://localhost:3000/api/user').subscribe((response: any) => {
      this.rows = response.result;
      this.originalRows = [...response.result];
      this.loadingIndicator = false;
    },
      (error) => {
        console.error("ApI error", error);
        this.loadingIndicator = false;
      }
      // (data) => {
      //   this.rows = data;
      //   this.originalRows = [...data];
      //   this.loadingIndicator = false;
      //   console.log('API response:', this.rows);
      // },
      // (error) => {
      //   console.error('API error:', error);
      //   this.loadingIndicator = false;
      // }
    );
  }

  onActivate(event: any) {
    if (event.type == 'dblclick') {
      this.selectedRow = event.row;
      console.log('fn works');
      this.editEmployee();
      return;
    }
    if (event.type === 'click' && event.row) {
      this.selectedRow = event.row;
    }
  }
  getRowClass = (row: any): any => {
    const idx = this.rows.indexOf(row);
    return {
      'evenrow': idx % 2 === 0,
      'odrow': idx % 2 !== 0,
      'selectedrow': this.selectedRow === row,
    };
  };

  async deleteEmployee() {
    if (!this.selectedRow) {
      const alert = await this.alertCntrl.create({
        header: 'No Row Selected',
        message: 'Please select a row to delete.',
        buttons: ['OK'],
      });

      await alert.present();
      return;

    }
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
    });
    modal.onDidDismiss().then(async (result) => {
      if (result.data?.confirmed) {

        this.http.delete('http://localhost:3000/api/delete',{
          body:{id:this.selectedRow.id}
        }).subscribe({
          next: async()=>{
            
        const successAlert = await this.alertCntrl.create({
          header: 'Delete',
          message: 'Item is Deleated Succesfully.',
          buttons: ['OK'],
        });
         await successAlert.present();
         this.fetchrecord();

          },
                  error: async (err) => {
          console.error('Delete error:', err);
          const failAlert = await this.alertCntrl.create({
            header: 'Error',
            message: 'Failed to delete user.',
            buttons: ['OK'],
          });
          await failAlert.present();
        }

        });
       
      }
    });
    await modal.present();
  }
  async addEmployee() {
    const modal = await this.modalCtrl.create({
      component: AddPage,
      componentProps: {
        mode: 'add',
      },
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.mode === 'add') {

        console.log('New item submitted:', result.data);

        const successAlert = await this.alertCntrl.create({
          header: 'created',
          message: 'User is created Succesfully',
          buttons: ['OK'],
        });

        await successAlert.present();

        this.fetchrecord();
      }
    });

    return await modal.present();
  }

  async editEmployee() {
    if (!this.selectedRow) {
      alert('Please select a row to update');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: AddPage,
      componentProps: {
        mode: 'update',
        userData: this.selectedRow,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Update Result:', result.data);
        this.fetchrecord();
      }
    });
     
    await modal.present();
  }


  goToPreviewPage() {
    console.log('Going to preview page...');
    console.log('Selected Row:', this.selectedRow);
    this.router.navigate(['/preview'],
      {
        state: {
          rows: this.rows,
          selectedRow: this.selectedRow
        }
      });
  }
  filterEmployees(event: any) {
    const query = event.target.value.toLowerCase();

    this.rows = this.originalRows.filter(employee =>
      employee.employeeName.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.address.toLowerCase().includes(query) ||
      employee.designation.toLowerCase().includes(query)
    );
  }

}

// filterEmployee(event:any){
//  const query = event.target.value.toLowerCase();
// this.rows = this.originalRows.filter(employee=>
//  employee.employeeName.toLowerCase.includes(query)||
//  employee.email.toLowerCase().includes(query)
// employee.employee.address.toLowerCase().includes(query)||
// employeee.designation.toLowerCase().includes(query));
//}

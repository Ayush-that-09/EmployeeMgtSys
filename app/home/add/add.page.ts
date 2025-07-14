import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  AddRecord: FormGroup;
  @Input() mode: 'add' | 'update' = 'add';
  @Input() userData: any;
  constructor(private fb: FormBuilder, private modalCntrl: ModalController, private alertCntrl: AlertController, private http: HttpClient) {
    this.AddRecord = this.fb.group({
      id:[''],
      employeeName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.\-#\/]+$/)]],
      designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.\-#\/]+$/)]],
    });
  }
  get f() {
    return this.AddRecord.controls;
  }
  async submitForm() {

    // if (this.AddRecord.valid) {
    //   alert('your Data is sucesfully inserted');
    //   console.log('Form subbmitted', this.AddRecord.value);
    //   this.closeModal();
    // } 
    if (this.AddRecord.valid) {
      const result = {
        mode: this.mode,
        data: this.AddRecord.value,
      };
      if (this.mode == 'add') {
        this.http.post('http://localhost:3000/api/post', result.data).subscribe((response: any) => {
          console.log('item is added succesfully', result.data);
        },
          (error) => {
            console.log('Error in Inserting Data', error);
          }
        );

      }
      if (this.mode == 'update') {

        this.http.put('http://localhost:3000/api/put',this.AddRecord.value).subscribe((response:any)=>{
          console.log('user Update Succesfully');
        },
      (error)=>{
        console.log("Error Updating User",error)
      });
        const updateAlert = await this.alertCntrl.create({
          header: 'Updated',
          message: 'User is Updated Sucessfully',
          buttons: ['OK'],
        });
        await updateAlert.present();
      }
      this.modalCntrl.dismiss(result);
    }
    else {
      this.AddRecord.markAllAsTouched();
      const errorAlert = await this.alertCntrl.create({
        header: 'Invalid Field',
        message: 'Please Check Each Field Again ',
        buttons: ['cancel', 'Ok'],
      });
      await errorAlert.present();
      console.warn('form is invalid');
    }
  }
  closeModal() {
    this.modalCntrl.dismiss();
  }
  ngOnInit() {
    if (this.mode === 'update' && this.userData) {
      this.AddRecord.patchValue(this.userData);
    }
  }
}
// ADDRecord = FormGroup;
// constructor(private Modalcntrl: ModalController){
//     this.ADDRecode = this.fb.group({
//     name = ['',validators.requried],
//     email = ['',validators.requried],
//     address=[''],validators.requried],
//})}

// closeModal(){
//   ModalCntrl.dismiss()}
// get f(){
// this.ADDRecord.controls
//}

// submitForm(){
// if(this.addrecord.valid){
//   }}

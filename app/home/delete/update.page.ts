import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone:false,
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  constructor(private ModalCntrl:ModalController){

  }

  cancelDelete(){
   this.ModalCntrl.dismiss({confirmed:false});
  }
  confirmDelete(){
  this.ModalCntrl.dismiss({confirmed:true});
  }
  ngOnInit(): void {
    
  }
}

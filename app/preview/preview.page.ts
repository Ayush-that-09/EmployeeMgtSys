import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { SortType } from '@swimlane/ngx-datatable';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPage } from '../home/add/add.page';
import { HttpClientModule } from '@angular/common/http';
import { UpdatePage } from '../home/delete/update.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  standalone: false,
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {

  rows: any[] = [];
  selectedRow: any = null;
  constructor(private router: Router) { }
  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    this.rows = state?.['rows'] || [];
    this.selectedRow = state?.['selectedRow'] || null;
    console.log('All Row', this.rows);
    console.log('selected Row', this.selectedRow);

  }


}

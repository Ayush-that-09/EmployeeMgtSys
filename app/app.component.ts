import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  // constructor(private menuCntrl:MenuController, private http:HttpClient) {}
  // expanded : any = null;

  // isCollapsed = true;
  menuItems : any = [
    // {
    //   title: 'Home',
    //   icon: 'home-outline',
    //   route: '/home',
    //   subfields: [
    //     { title: 'Dashboard', route: '/home/dashboard' },
    //     { title: 'Activity', route: '/home/activity' },
    //     { title: 'Stats', route: '/home/stats' }
    //   ],
    
    // },
    // {
    //   title: 'About',
    //   icon: 'information-circle-outline',
    //   route: '/about',
    //   subfields: [
    //     { title: 'Team', route: '/about/team' },
    //     { title: 'Company', route: '/about/company' },
    //     { title: 'Mission', route: '/about/mission' }
    //   ],

    // },
    // {
    //   title: 'Contact',
    //   icon: 'call-outline',
    //   route: '/contact',
    //   subfields: [
    //     { title: 'Email', route: '/contact/email' },
    //     { title: 'Phone', route: '/contact/phone' },
    //     { title: 'Address', route: '/contact/address' }
    //   ],
  
    // }
  ];
  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/menu').subscribe({
      next:(res:any) =>{
        this.menuItems = res;
        console.log("menu loaded", this.menuItems);
      },
      error:(err)=>{
        console.log("Error loading menu",err);
      }
    })
  }

  // toggleSidebar() {
  //    this.menuCntrl.close();
     
  //    this.expanded = null;
     


  // }

  // toggleExpand(item: any) {

  //   if(this.expanded=== item){
  //     this.expanded = null;
  //   }
  //  else {
  //   this.expanded = item;
  //  }
    
  // }

  
// openMenu() {
//   this.menuCntrl.open();
//   this.isCollapsed = false; // menu khula hua
// }
  //   openSidebar() {
  //   this.collapsed = false;
  //   this.menuCntrl.open();
  // }
    constructor(private menuCtrl: MenuController, private http:HttpClient ,private router: Router) {}

  toggleMenu() {
    this.menuCtrl.toggle('main');
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.menuCtrl.close('main');
  }
}

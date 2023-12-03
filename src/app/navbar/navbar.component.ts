import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions:Array<any> =[
    {title:"Home",route:"/home",icon:"house"},
    {title:"New product",route:"/newProduct",icon:"safe"},
    {title:"Products",route:"/products",icon:"search"},
  ];
  currentAction:any;

  //public isLoading:boolean=false;
  constructor(public appstate:AppStateService,public loadingService:LoadingService) {

    /*this.loadingService.isLoading$.subscribe({
      next:(value)=>{
        this.isLoading=value;
      }
    })*/
  }
  setCurrentAction(action:any){
    this.currentAction=action;
  }
}

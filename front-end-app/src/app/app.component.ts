import { Component } from '@angular/core';
import { RouterOutlet, RouterModule,Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from "./footer/footer.component";


const appRoute:Routes=[
  {path:'', component:HomeComponent},
  {path:'reg', component:RegComponent},
  {path:'auth', component:AuthComponent},
  {path:'dashboard', component:DashboardComponent},


];
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    RouterModule.forRoot(appRoute),
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'front-end-app';
}

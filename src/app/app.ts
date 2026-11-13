import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidebarComponent,
    HeaderComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

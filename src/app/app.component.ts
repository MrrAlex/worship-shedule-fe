import {Component, ViewChild} from '@angular/core';
import {MatSidenavContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fe';

  @ViewChild('sidenav')
  sidenav!: MatSidenavContainer;

  isSidebarOpened = false;

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    if (this.isSidebarOpened) {
      this.sidenav.open()
    } else {
      this.sidenav.close()
    }

  }
}

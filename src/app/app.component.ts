import { Component, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe';

  @ViewChild('sidenav')
  sidenav!: MatSidenavContainer;

  isSidebarOpened = false;

  links = [
    {
      route: '',
      value: 'График участия',
    },
    {
      route: 'services',
      value: 'Список служений',
    },
    {
      route: 'rehearsals',
      value: 'Репетиции',
    },
    {
      route: 'people',
      value: 'Список команды',
    },
    {
      route: 'templates',
      value: 'Шаблоны служения',
    },
    {
      route: 'instruments',
      value: 'Инструменты',
    },
  ];

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
    if (this.isSidebarOpened) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }
}

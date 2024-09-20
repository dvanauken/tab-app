import { Component } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { GeoComponent } from './geo/geo.component';
import { TableTreeComponent } from './table-tree/table-tree.component'; // Import your components


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tab-app';
}

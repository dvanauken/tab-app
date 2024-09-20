import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { GeoComponent } from './geo/geo.component';
import { TableTreeComponent } from './table-tree/table-tree.component';
import { AppRoutingModule } from './app.routes';  // <-- Import your routing module

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    GeoComponent,
    TableTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // <-- Use AppRoutingModule instead of RouterModule directly
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

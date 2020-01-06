import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppendPage } from './append.page';

const routes: Routes = [
  {
    path: '',
    component: AppendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppendPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FavoriteButtonComponent } from '../standalone-ui/favorite-button/favorite-button.component';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent], // Grouping similar components in a module
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    FavoriteButtonComponent
  ],
})
export class UsersModule { }
import { TryComponent } from './try/try.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MainComponent } from './main/main.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'carousel', component: CarouselComponent  },
  { path: 'register', component: RegisterUserComponent },
  { path: 'verifyOTP', component: VerifyUserComponent},
  { path: 'home', component: HomeComponent},
  { path: 'try', component: TryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

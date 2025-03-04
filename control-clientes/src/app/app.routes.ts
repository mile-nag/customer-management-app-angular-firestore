import { Routes } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuardService } from './service/login-guard.service';

export const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'cliente/editar/:id', component: EditarClientesComponent, canActivate: [LoginGuardService] },
  { path: '**', component: NoEncontradoComponent }
];

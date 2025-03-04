import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  mensaje: string | null = null;

  constructor(private router: Router,
    private loginService: LoginService
  ) { }

  login() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.mensaje = 'Error al intentar iniciar sesión: ' + error;
        });
    } else {
      this.mensaje = 'La contraseña o el email son incorrectos';
    }
  }
}

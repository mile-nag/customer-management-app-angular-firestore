import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { ClienteService } from '../../service/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  clientes: Cliente[] | null = null;

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private clienteServicio: ClienteService) { }

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal(): number {
    return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  }

  agregar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    // Guardar el cliente
    this.clienteServicio.agregarCliente(value);
    // Limpiar formulario
    clienteForm.resetForm();

    // Cerrar ventana modal
    this.cerrarModal();
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}

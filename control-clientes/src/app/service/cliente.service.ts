import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';
import { Firestore, collection, query, orderBy, collectionData, CollectionReference, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  clientes: Observable<Cliente[]>;
  private clientesRef: CollectionReference<Cliente>;

  constructor(private firestore: Firestore) {
    //Consulta para obtener el listado de clientes
    this.clientesRef = collection(this.firestore, 'clientes') as CollectionReference<Cliente>;
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    return addDoc(this.clientesRef, cliente);
  }

  getCliente(id: string): Observable<Cliente | null> {
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, { idField: 'id' }) as Observable<Cliente>;
  }

  modificarCliente(cliente: Cliente) {
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(clienteDoc, { ...cliente });
  }

  eliminarCliente(cliente: Cliente) {
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return deleteDoc(clienteDoc);
  }

}

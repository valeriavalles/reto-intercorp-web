import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore: AngularFirestore) { }

  agregarCliente(cliente: any): Promise<any>{
    return this.firestore.collection('clientes').add(cliente);
  }

  getClientes(): Observable<any>{

    return this.firestore.collection('clientes', ref => ref.orderBy('fechaCreaion', 'asc')).snapshotChanges();
  }
}

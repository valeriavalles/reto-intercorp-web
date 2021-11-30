import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-register-clients',
  templateUrl: './register-clients.component.html',
  styleUrls: ['./register-clients.component.css']
})
export class RegisterClientsComponent implements OnInit {

  registerClient: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private _clientService: ClientesService,
              private router: Router,
              private toastr: ToastrService 
              ) {
    this.registerClient = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      cumpleanos: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  agregarCliente(){
    this.submitted = true;
    if(this.registerClient.invalid){
      return;
    }

    const cliente: any = {
      nombre: this.registerClient.value.nombre,
      apellido: this.registerClient.value.apellido,
      edad: this.registerClient.value.edad,
      cumpleanos: this.registerClient.value.cumpleanos,
      fechaCreaion: new Date(),
      fechaActualizacion: new Date()
    }
   
    this._clientService.agregarCliente(cliente).then(()=> {
      // console.log(cliente);
      // console.log('Cliente Registrado');
      this.toastr.success("Cliente Registrado");
      this.router.navigate(['/lista']);
    }).catch(error => {
      console.log(error);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  clientes: any[] = [];
  edades:number[] = [];
  promedio: number = 0;
  desvSatandar: number = 0;

  constructor(private _clientService: ClientesService) { }

  ngOnInit(): void {
    this.getClientes();
    
  }
 
  getClientes(){
    this._clientService.getClientes().subscribe( data => {
      this.clientes = [];
      // console.log(this.clientes);
      data.forEach((element:any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });      

     
      this.getPromedio();
      this.getDesviacion();
    })
  }
  
  getPromedio(){
    this.promedio = 0;
    let sum = 0;
    let count = 0;
  

    this.clientes.forEach((element:any)=>{
      sum += element.edad;
      count += 1;
    })
    
    if(count > 0){
      this.promedio = parseFloat((sum / this.clientes.length).toFixed(2));
    }
    
  }

  getDesviacion(){
    let media = this.promedio;
    let sumEdades = 0;
    let diferencia = 0;
    let varianza = 0;
    this.desvSatandar = 0;

    this.clientes.forEach((element:any)=>{
      sumEdades += element.edad;
    })

    this.clientes.forEach((element:any)=>{
    
      diferencia = (element.edad - media)**2;
      varianza = varianza + diferencia;

    })
    varianza = varianza/this.clientes.length;
    // console.log(varianza);
    this.desvSatandar = parseFloat((Math.sqrt(varianza)).toFixed(2));
  }

}

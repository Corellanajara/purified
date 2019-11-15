import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { VentaService } from '../services/ventas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  ventas: TaskI[];
  ingresos = 0;
  gastos = 0;
  constructor(private ventaService: VentaService){}

  ngOnInit(){
    this.ventaService.getVentas().subscribe((ventas) =>{
      console.log('ventass', ventas);
      this.ventas = ventas;
      for(let i = 0 ; i < ventas.length ;i ++){
        let venta = ventas[i];
        if(venta.tipo.includes('ompra') ){
          this.gastos += (venta.precio * venta.cantidad)
        }else{
          this.ingresos += (venta.precio * venta.cantidad)
        }
      }

    })
  }
  async onRemoveVenta(idventa:string) {
    this.ventaService.removeVenta(idventa);
  }
  
}

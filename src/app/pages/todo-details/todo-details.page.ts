import { Component, OnInit } from '@angular/core';
import { TaskI} from '../../models/task.interface';
import { VentaService } from '../../services/ventas.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-venta-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  venta: TaskI = {
    titulo: '',
    cantidad: 0,
    precio : 0,
    tipo: '',
    cliente: '',
    fecha : '',
  };

  ventaId= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private ventaService: VentaService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.ventaId = this.route.snapshot.params['id'];
    if (this.ventaId){
      this.loadVenta();
    }
  }

  async loadVenta(){
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();

    this.ventaService.getVenta(this.ventaId).subscribe(venta => {
      loading.dismiss();;
      this.venta = venta;
    });
  }

  async saveVenta() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.ventaId) {
      this.ventaService.updateVenta(this.venta, this.ventaId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    } else {
      this.ventaService.addVenta(this.venta).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }
  async onRemoveVenta(idventa:string) {
    this.ventaService.removeVenta(idventa);
  }
}

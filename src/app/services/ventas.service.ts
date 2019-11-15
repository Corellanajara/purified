import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private VentasCollection: AngularFirestoreCollection<TaskI>;
  private Ventas: Observable<TaskI[]>;

  constructor(db:AngularFirestore) {
    this.VentasCollection = db.collection<TaskI>('ventas');
    this.Ventas = this.VentasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getVentas(){
    return this.Ventas;
  }

  getVenta(id: string){
    return this.VentasCollection.doc<TaskI>(id).valueChanges();
  }

  updateVenta(Venta:TaskI, id: string){
    return this.VentasCollection.doc(id).update(Venta);
  }

  addVenta(Venta: TaskI){
    return this.VentasCollection.add(Venta);
  }

  removeVenta(id: string){
    return this.VentasCollection.doc(id).delete();
  }

}

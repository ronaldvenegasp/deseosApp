import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
})
export class ListasComponent implements OnInit {
  @Input() completada = true;
  @ViewChild(IonList, {static: true}) lista: IonList;

  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
      this.router.navigateByUrl(`${this.router.url}/agregar/${lista.id}`);
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async cambiarNombre(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar nombre lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Cambiar',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          } else {
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      }]
    });

    await alert.present();
  }

}

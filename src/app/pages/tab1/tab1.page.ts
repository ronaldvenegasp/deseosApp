import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html'
})
export class Tab1Page {

  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController) { }

  async agregarLista() {
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          } else {
            this.deseosService.crearLista(data.titulo);
          }
        }
      }]
    });

    await alert.present();
  }

}

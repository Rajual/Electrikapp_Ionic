import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  path = 'Groups/';

  costo: any;
  users: any;
  fecha: any;
  proyeccion: any;

  refe = firebase.database().ref(this.path);

  constructor(
    private alertController: AlertController,
    private storage: Storage
  ) {
    this.storage.get('User').then((data) => {
      if (data != null) {
        this.users = data;
      }
    });
  }

  ngOnInit() {
  }

  openDatePage(event) {
    console.log(event);
    this.refe.child(this.users).child('Settings').child('Date').set(event);
  }

  async openProjectionPage() {
    await this.alertController.create({
      header: 'Ingrese la proyección',
      inputs: [
        {
          type: 'number',
          name: 'Projection'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (res) => {
            this.proyeccion = res.Projection;
            console.log(res.Projection);
            this.storage.get('Projection').then((data) => {
              if (data != null) {
                data = this.proyeccion;
                this.storage.set('Projection', data);
              } else {
                let variable: any;
                variable = this.proyeccion;
                this.storage.set('Projection', variable);
              }
            });
            this.refe.child(this.users).child('Settings').child('Projection').set(this.proyeccion);
          }
        }
      ]
    }).then(res => res.present());
  }

  async openCostPage() {
    await this.alertController.create({
      header: 'Ingrese el valor',
      inputs: [
        {
          type: 'number',
          name: 'Cost'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (res) => {
            console.log(res.Cost);
            this.costo = res.Cost;
            this.storage.get('Cost').then((data) => {
              if (data != null) {
                data = this.costo;
                this.storage.set('Cost', data);
              } else {
                let variable: any;
                variable = this.costo;
                this.storage.set('Cost', variable);
              }
            });
            this.refe.child(this.users).child('Settings').child('Cost').set(this.costo);
          }
        }
      ]
    }).then(res => res.present());
  }
}

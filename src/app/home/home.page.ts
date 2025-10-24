import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList,IonItem, IonLabel } from '@ionic/angular/standalone';
import {registerPlugin} from '@capacitor/core';
const ContactsPlugin = registerPlugin<any>('ContactsPlugin');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,IonItem]
})
export class HomePage {
  contacts:{name: string; number:string}[]= [];
  constructor() {}
  async loadContacts(){
    try{
    const result = await ContactsPlugin.getContacts();
    console.log("Resultado del plugin", result);
      this.contacts = result?.contacts?.map((c: any)=>({
        name: c.name??'',
        number: c.number??''
      })) ??[];
      console.log('Contacts:',this.contacts)
    }catch(err){
      console.error('Error obteniendo contactos desde js:', err);
      this.contacts = [];
    }
  }
}

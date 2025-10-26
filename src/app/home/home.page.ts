import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {registerPlugin} from '@capacitor/core';
const ContactsPlugin = registerPlugin<any>('ContactsPlugin');

// Define interfaces
interface Contact {
  name: string;
  number: string;
}

interface ContactPluginResult {
  contacts?: {
    name?: string;
    phones?: string[];
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonLabel, IonList, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonItem]
})
export class HomePage {
  // openNativeView(): open a native UI provided by the Capacitor plugin
  async openNativeView(): Promise<void> {
    if (ContactsPlugin?.openNativeView) {
      await ContactsPlugin.openNativeView();
    } else {
      console.warn('ContactsPlugin.openNativeView is not available');
    }
  }

  // contacts list used by the template
  contacts: Contact[] = [];

  constructor() {}

  // loadContacts(): calls the Capacitor plugin and maps the result to `contacts`
  async loadContacts() {
    try {
      const result = await ContactsPlugin.getContacts();
      console.log('Resultado completo del plugin:', JSON.stringify(result, null, 2));
      console.log('Resultado del plugin', result);
      this.contacts = (result?.contacts || []).map((c: any) => ({
        name: c.name ?? '',
        number: c.phones?.[0] ?? ''
      }));
      console.log('Contacts:', this.contacts);
    } catch (err) {
      console.error('Error obteniendo contactos desde js:', err);
      this.contacts = [];
    }
  }
}

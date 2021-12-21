import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modales: any[] = [];

    anadir(modal: any) {
        // add modal to array of active modals
        this.modales.push(modal);
    }

    eliminar(id: string) {
        // remove modal from array of active modals
        this.modales = this.modales.filter(x => x.id !== id);
    }

    abrir(id: string) {
        // open modal specified by id
        const modal = this.modales.find(x => x.id === id);
        modal.abrir();
    }

    cerrar(id: string) {
        // close modal specified by id
        const modal = this.modales.find(x => x.id === id);
        modal.cerrar();
    }
}
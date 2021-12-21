import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string = "";
    @Input() altura : string = "";
    @Input() ancho : string = "";
    private elemento: any;
    
    object : any;

    constructor(private modalService: ModalService, private referenciaEl: ElementRef) {
        this.elemento = referenciaEl.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }


        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.elemento);

        //class="jw-modal-cuerpo">
       
        
        
        // close modal on background click
        //el esta solito
        this.elemento.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'jw-modal') {
                this.cerrar();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.anadir(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.eliminar(this.id);
        this.elemento.remove();
    }

    // open modal
    abrir(): void {
         //cambiar altura
         
         var altura = this.altura + "%";
         const elem = document.getElementsByClassName('jw-modal');
         for (let i =0 ; i< elem.length ; i++){
             const e = elem[i];
             if(e instanceof HTMLElement){
                 e.style.height = altura;
             }
 
         }


         //cambiar ancho
         
         var ancho = this.ancho + "%";
         const elem2 = document.getElementsByClassName('jw-modal');
         for (let i =0 ; i< elem2.length ; i++){
             const e = elem2[i];
             if(e instanceof HTMLElement){
                 e.style.width = ancho;
             }
 
         }

        this.elemento.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    cerrar(): void {
        this.elemento.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
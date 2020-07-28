import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class UtilService {

    daysOfWeek() {
        return [
            { val: 'w1', des: 'Lunes' },
            { val: 'w2', des: 'Martes' },
            { val: 'w3', des: 'Miercoles' },
            { val: 'w4', des: 'Jueves' },
            { val: 'w5', des: 'Viernes' },
            { val: 'w6', des: 'Sábado' },
            { val: 'w0', des: 'Domingo' }
        ]
    }

}
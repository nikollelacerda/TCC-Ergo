import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    template: '',
})
export default class DefaultComponent implements OnDestroy{
    
    /* Previne Leak de Memoria */
    subscriptions: Subscription[] = [];
    ngOnDestroy(): void {
        for(let sub of this.subscriptions){
            sub.unsubscribe();
        }
    }

}
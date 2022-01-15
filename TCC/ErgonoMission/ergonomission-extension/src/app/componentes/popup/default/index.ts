import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Popup, genericDecorator} from '../popup-generic';

@Component({
  selector: 'popup-default',
  template: genericDecorator.template,
  styleUrls: ['../popup-style.css'],
  providers: genericDecorator.providers
})
export default class PopupDefault extends Popup {
  
  constructor(public self: NgbActiveModal) {
    super();
  }

}
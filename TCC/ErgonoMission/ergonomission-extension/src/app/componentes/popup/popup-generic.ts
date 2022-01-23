import { Component, Input } from "@angular/core";
import { NgbActiveModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

export const genericDecorator = {
    providers: [NgbModalConfig],
    template: 
`
<div class="modal-header">
    <div class="modal-title" id="modal-basic-title">
        {{modal.title}}
    </div>
    <button type="button" class="close" aria-label="Close" (click)="self.dismiss('X')">
      <span aria-hidden="true">X</span>
    </button>
</div>
<div class="modal-body">
        {{modal.message}}
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="self.close('Botão Fechar')">Fechar</button>
</div>
`,
}


@Component({
    styleUrls: ['./popup-style.css'],
    template: '',
})
export class Popup{
    @Input() modal: any;

    /* DEFAULT MODAL OPTIONS */
    /* https://ng-bootstrap.github.io/#/components/modal/api#NgbModalOptions */

    static defaultOptions = {
        backdrop: false,
        size: 'sm',
        modalDialogClass: 'custom-dialog',
        windowClass: 'custom-window',
        backdropClass: 'custom-backdrop',
    }
}
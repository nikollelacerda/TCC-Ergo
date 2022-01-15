import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons }
  from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  closeResult = '';
  defaultTitle = 'POPUP';
  defaultMessage = 'CORPO';
  defaultOptions = {
    ariaLabelledBy: 'modal-basic-title',
    animation: true,
  };
  defaultModal: any = {
    title: this.defaultTitle,
    message: this.defaultMessage,
  }
  modal: any = this.defaultModal;

  @ViewChild('popupTemplate') defaultContent: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal) { }

  open(
    content: any = this.defaultContent,
    options: any = this.defaultOptions,
    modal: any = this.defaultModal
  ){
    this.modalService.open(content, options)
      .result.then(
        result => {
          this.closeResult = `Fechado com ${result}`;
        },
        reason => {
          this.closeResult =
            `Dispensado ${this.getDismissReason(reason)}`;
        }
      );
    this.modal = modal;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'por ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'por clicar no backdrop';
    } else {
      return `por ${reason}`;
    }
  }
}
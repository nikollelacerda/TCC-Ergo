import { Injectable } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PopupDefault from './default';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  open(
    args: {
      content?: any,
      options?: any,
      data?: any
    }
  ) {
    args.content = args.content || PopupDefault;
    args.options = args.options || PopupDefault.defaultOptions;
    console.log(args)
    const modalRef = this.modalService.open(args.content, args.options)
    modalRef.result
      .then(
        result => {
          this.closeResult = `Fechado com ${result}`;
        },
        reason => {
          this.closeResult =
            `Dispensado ${this.getDismissReason(reason)}`;
        }
      );
    if (args.data)
      modalRef.componentInstance.modal = args.data
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

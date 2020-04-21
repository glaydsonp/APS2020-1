import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isMessage } from '../type-guards/response-message.type-guard';
import { Message } from '../data/response/response-message';
import { MessageType } from '../data/response/messages-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService,
    private ngZone: NgZone
  ) { }

  toast(item: Message | Message[] | string, type?: MessageType | number ) {
    if (item instanceof Array) {
      // tslint:disable-next-line:no-shadowed-variable
      item.forEach( item => this.toast(item));
    } else if (isMessage(item)) {
      this.toast(item.description, item.type);
    } else if (typeof item === 'string') {
      this._toast(item, type);
    } else {
      console.error('parametro invalido ao emitir um toast');
    }
  }

  private _toast(message: string, type?: MessageType | number ) {
    this.ngZone.runTask( () => {
      switch (type) {
        case MessageType.error:
          this.toastr.error(message);
          break;
        case MessageType.info:
          this.toastr.info(message);
          break;
        case MessageType.success:
          this.toastr.success(message);
          break;
        case MessageType.warning:
          this.toastr.warning(message);
          break;
        default:
          this.toastr.info(message);
      }
    });
  }

}

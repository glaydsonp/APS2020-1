import { Message } from '../data/response/response-message';
import { isMessage } from './response-message.type-guard';

export function isResponse(response: any): response is Response {
  try {
    // console.log('response', response);
    // console.log('typeof response.isSucceed ===', typeof response.isSucceed === 'boolean');
    // console.log('response.messages', response.messages);
    // response.messages.every(m => console.log(m));
    return response
      && typeof response.isSucceed === 'boolean'
      && response.messages
      && response.messages.every(m => isMessage(m));
  } catch {
    return false;
  }
}

import { Message } from '../data/response/response-message';
import { isMessage } from './response-message.type-guard';

export function isResponse(response: any): response is Response {
  try {
    return response
        && typeof response.isSucceed === 'boolean'
        && response.messages
        && response.messages.every( m => isMessage(m));
  } catch {
    return false;
  }
}

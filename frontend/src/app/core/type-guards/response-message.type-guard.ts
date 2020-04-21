import { Message } from '../data/response/response-message';

export function isMessage(message: any): message is Message {
  return message
      && typeof message.type === 'number'
      && typeof message.description === 'string';
}

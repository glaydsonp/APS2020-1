import { Message } from '../data/response/response-message';

export function isMessage(message: any): message is Message {
  // console.log('####');
  // console.log('message', message);
  // console.log('typeof message.type ', typeof message.type === 'number');
  // console.log('typeof message.type ', typeof message.type);
  // console.log('typeof message.description === ', typeof message.description === 'string');
  // console.log('typeof message.description ', typeof message.description);
  return message
    && typeof message.type === 'number'
    && typeof message.description === 'string';
}

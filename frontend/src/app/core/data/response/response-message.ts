import { MessageType } from './messages-type.enum';

export interface Message {
  type: MessageType;
  description: string;
}

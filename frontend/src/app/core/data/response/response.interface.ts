import { Message } from './response-message';

/**
 * - Padrão de respostas da api
 * - recebe o model como type parameter
 */
export interface Response<T> {
  /** numero total de itens encontrados sem contar com os filtros de paginação */
  count?: number;
  /** determina se houve algum erro ou não na request */
  isSucceed: boolean;
  /** dados da response */
  data: T;
  /** array contendo as messagens de erro / warnings */
  messages: Message[];
}

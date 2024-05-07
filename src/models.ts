export interface SuccessResponse {
  message: string;
}

export type SocketMessageType = 'map'|'character'|'location'|'notification';

export interface SocketMessage {
  type: SocketMessageType;
  message: any;
}

export interface NotificationMessage {
  type: 'lose'|'gain';
  item: 'gold';
  amount: number;
}
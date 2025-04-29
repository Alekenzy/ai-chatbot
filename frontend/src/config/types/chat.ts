export interface Message {
  text: string;
  date: string;
  time: string;
  isMine: boolean;
  error?: boolean;
}

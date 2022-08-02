export interface Message {
  id: string;
  userId: string;
  body: string;
  time: number;
  status?: 'PENDING' | 'OK'; // to-do: enum?
}

export interface User {
  id: string;
  name: string;
}

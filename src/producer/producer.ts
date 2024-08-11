import type { Consumer } from "../consumer/consumer";

interface Payload {}

export interface Producer {
  readonly payload: Payload;
  send(consumer: Consumer): void;
}

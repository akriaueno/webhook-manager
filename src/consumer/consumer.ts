interface Payload {}

export interface Consumer {
  readonly payload: Payload;
  send(payload: Payload): Promise<void>;
}

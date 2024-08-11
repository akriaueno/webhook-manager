import type { Producer } from "./producer";
import type { Consumer } from "../consumer/consumer";

import type { DatadogIncidentPayload } from "../types/producer/datadog-incident-payload";

export class Datadog implements Producer {
  readonly payload: DatadogIncidentPayload;

  constructor(payload: any) {
    if (
      !payload.id ||
      !payload.title ||
      !payload.url ||
      !payload.severity ||
      !payload.body
    ) {
      throw new Error("Missing required fields");
    }

    this.payload = {
      id: payload.id,
      title: payload.title,
      url: payload.url,
      severity: payload.severity,
      body: payload.body,
    };
    for (const key in payload) {
      if (!["id", "title", "url", "severity", "body"].includes(key)) {
        this.payload[key] = payload[key];
      }
    }
  }

  public async send(consumer: Consumer) {
    await consumer.send(this.payload);
  }
}

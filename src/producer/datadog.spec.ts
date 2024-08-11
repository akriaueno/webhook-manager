import { Datadog } from "./datadog";
import { Consumer } from "../consumer/consumer";
const rawPayload = {
  id: "123",
  title: "test",
  url: "https://example.com",
  severity: "low",
  body: "foo\nbar\nbaz",
};

describe("Datadog initialization", () => {
  test("all fields are set", () => {
    const datadog = new Datadog(rawPayload);
    expect(datadog.payload).toEqual(rawPayload);
  });

  test("all fields are set with extraKey", () => {
    const rawPayloadWithExtraKey = { ...rawPayload, extraKey: "extraValue" };
    const datadog = new Datadog(rawPayloadWithExtraKey);
    expect(datadog.payload).toEqual(rawPayloadWithExtraKey);
  });

  test("fail if a required field is missing", () => {
    const requiredFields = ["id", "title", "url", "severity", "body"];

    requiredFields.forEach((missingField) => {
      const missingPayload = { ...rawPayload };
      // @ts-ignore
      delete missingPayload[missingField];
      expect(() => new Datadog(missingPayload)).toThrow(
        "Missing required fields"
      );
    });
  });
});

describe("Datadog send", () => {
  class TestConsumer implements Consumer {
    payload: any;
    send(payload: any) {
      this.payload = payload;
      return Promise.resolve();
    }
  }

  test("is called consumer.send when datadog.send is called", async () => {
    const datadog = new Datadog(rawPayload);
    const consumer = new TestConsumer();

    const spySend = vitest.spyOn(consumer, "send");
    await datadog.send(consumer);

    expect(spySend).toHaveBeenCalled();
  });
});

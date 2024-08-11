import { Hono } from "hono";
import { Datadog } from "./producer/datadog";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/datadog", async (c) => {
  const { to, url } = c.req.query();
  console.log(to, url);
  try {
    const body = await c.req.json();
    const datadogProducer = new Datadog(body);
    console.log(datadogProducer.payload);
    return c.text("Hello Datadog!");
  } catch (error) {
    console.error(error);
    return c.text("Error parsing request body", 400);
  }
});

export default app;

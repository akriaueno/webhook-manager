export class Discord {
  constructor(private readonly webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async send(data: any) {
    console.log(data);
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  }
}

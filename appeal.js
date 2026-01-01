export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1456157294906576917/YNa_RXKqum1jXv0s_RSDEj_tMYYPUH4NZuI1GIkdQvdBGQGCjCU6w-G-Mr21xLf4NeZ4";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send webhook" });
  }
}

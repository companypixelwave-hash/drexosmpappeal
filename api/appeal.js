export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ign, discord, reason } = await req.json();

  // الرابط مباشر هنا
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1456157294906576917/YNa_RXKqum1jXv0s_RSDEj_tMYYPUH4NZuI1GIkdQvdBGQGCjCU6w-G-Mr21xLf4NeZ4"; // ضع هنا رابط Webhook

  const payload = {
    username: "DrexoSMP Appeals",
    embeds: [
      {
        title: "🚨 New Ban Appeal",
        color: 16753920,
        fields: [
          { name: "IGN", value: ign, inline: true },
          { name: "Discord", value: discord, inline: true },
          { name: "Reason", value: reason, inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ],
    components: [
      {
        type: 1,
        components: [
          { type: 2, style: 3, label: "Accept", custom_id: "appeal_accept" },
          { type: 2, style: 4, label: "Reject", custom_id: "appeal_reject" }
        ]
      }
    ]
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending webhook:", err);
    return res.status(500).json({ success: false, error: "Failed to send webhook" });
  }
}

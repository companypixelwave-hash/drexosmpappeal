export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).end();

  const { ign, discord, reason } = await req.json();
  const WEBHOOK_URL = "PUT_YOUR_DISCORD_WEBHOOK_HERE"; // مباشر

  const payload = {
    username: "DrexoSMP Appeals",
    embeds:[{
      title:"🚨 New Ban Appeal",
      color: 16753920,
      fields:[
        { name: "IGN", value: ign, inline:true },
        { name: "Discord", value: discord, inline:true },
        { name: "Reason", value: reason }
      ],
      timestamp: new Date().toISOString()
    }],
    components:[{
      type:1,
      components:[
        { type:2, style:3, label:"Accept", custom_id:"appeal_accept" },
        { type:2, style:4, label:"Reject", custom_id:"appeal_reject" }
      ]
    }]
  };

  try{
    await fetch(WEBHOOK_URL, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });
    res.status(200).json({ success:true });
  }catch{
    res.status(500).json({ success:false });
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const q = req.method === "POST" ? req.body : req.query;
    const base = (q.base || "https://whatsbot.tech/api").replace(/\/$/, "");
    const token = q.token || "";
    const mobile = q.mobile || "";
    const message = q.message || "";
    const device_id = q.device_id || "";
    if (!token || !mobile || !message) {
      return res.status(400).send("Missing token/mobile/message");
    }
    const url = `${base}/send_sms?api_token=${encodeURIComponent(token)}&mobile=${encodeURIComponent(mobile)}&message=${encodeURIComponent(message)}&device_id=${encodeURIComponent(device_id)}`;
    const r = await fetch(url);
    const txt = await r.text();
    return res.status(200).send(txt || "Request sent");
  } catch (e) {
    return res.status(500).send("Proxy Error: " + e.message);
  }
}

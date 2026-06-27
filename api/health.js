export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json({ status: true, message: "School ERP V9 AutoPilot API is working" });
}
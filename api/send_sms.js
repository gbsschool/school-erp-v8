export default async function handler(req,res){
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS");
if(req.method==="OPTIONS") return res.status(200).end();
try{
 const {mobile,message,api_token,device_id}=req.query;
 if(!mobile||!message) return res.status(400).json({status:false,error:"mobile and message required"});
 const params=new URLSearchParams({mobile,message,api_token:api_token||"",device_id:device_id||""});
 const r=await fetch("https://web.whatsbot.tech/api/send_sms?"+params.toString());
 const text=await r.text();
 return res.status(200).json({status:true,upstream:text});
}catch(e){return res.status(500).json({status:false,error:String(e)});}
}
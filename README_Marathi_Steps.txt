School ERP V9 AutoPilot Project

नवीन सुविधा:
- मुख्याध्यापक/अध्यक्ष/सचिव मोबाईल Settings मध्ये
- विद्यार्थी उपस्थितीचा auto summary message
- शिक्षक उपस्थितीचा स्वतंत्र template
- गृहपाठ व वर्गकार्याचा auto report
- जन्मदिवस auto message
- ग्रामीण पालकांसाठी Audio Preview सुविधा
- WhatsApp API proxy /api/send_sms
- /api/health test ready
- शैक्षणिक/nature background theme
- विषय शिक्षक field समाविष्ट

महत्त्वाचे:
Audio Preview browser मध्ये आवाज ऐकवते. WhatsApp वर खरे audio file पाठवण्यासाठी WhatsBot मध्ये audio/media endpoint उपलब्ध असल्यास पुढील version मध्ये जोडता येईल.

Upload:
ZIP extract करा. Windows 10/11 वर GitHub Desktop वापरून पूर्ण folder push करा.
GitHub मध्ये api folder दिसला पाहिजे.

Test:
https://YOUR-VERCEL-URL.vercel.app/api/health

Settings:
Proxy API URL = https://YOUR-VERCEL-URL.vercel.app/api
API Token = WhatsBot token
Device ID = WhatsBot device id

School ERP V34 Master Production Addon

या अपडेटमध्ये प्रत्यक्ष लागू होणारे बदल:
1. Website/Web च्या सुरुवातीला संस्था + शाळेचे पूर्ण नाव.
2. Certificate Generate बटण patch केले आहे.
3. Bonafide तुमच्या नमुन्याच्या मजकुरासारखा.
4. Leaving Certificate/LC तुमच्या नमुन्याच्या कॉलमप्रमाणे.
5. प्रवेश/निर्गम उतारा नमुना.
6. WhatsApp/SMS Master Message Templates.
7. प्रत्येक टेम्पलेटमध्ये संस्था नाव, शाळा नाव, वर्गशिक्षक, विषय शिक्षक, स्लोगन.

कसे जोडायचे:
1. patch/v34-master-production-addon.js फाईल project मध्ये ठेवा.
2. patch/v34-master-production-style.css मधील CSS style.css मध्ये add करा किंवा index.html मध्ये link द्या.
3. index.html मध्ये </body> च्या आधी ही line add करा:
   <script src="patch/v34-master-production-addon.js"></script>
4. Commit Summary:
   School ERP V34 Master Production Certificates WhatsApp Addon
5. Commit + Push करा.

महत्त्वाचे:
- हा addon विद्यमान data delete करत नाही.
- आधीचे v32_students व v32_templates वापरतो.
- पुढे नवीन फॉर्म/टेम्पलेट याच addon मध्ये add करायचे.

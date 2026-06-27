
let D={students:[],documents:[],teachers:[],attendance:[],results:[],books:[],issues:[],distributions:[],committees:[],fees:[],notices:[]};
const $=id=>document.getElementById(id), uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7), today=()=>new Date().toISOString().slice(0,10);
const get=k=>JSON.parse(localStorage.getItem("v22_"+k)||"[]"), set=(k,v)=>localStorage.setItem("v22_"+k,JSON.stringify(v));
const getObj=k=>JSON.parse(localStorage.getItem("v22_"+k)||"{}"), setObj=(k,v)=>localStorage.setItem("v22_"+k,JSON.stringify(v));
function login(){if(loginUser.value=="admin"&&loginPass.value=="admin123"){loginScreen.style.display="none";appRoot.style.display="block";localStorage.setItem("v22_login","1")}else alert("User/Password तपासा")}
function logout(){localStorage.removeItem("v22_login");location.reload()}
function show(id,b){document.querySelectorAll(".page").forEach(p=>p.classList.remove("show"));$(id).classList.add("show");document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");refreshSelects();}
function norm(n){n=String(n||"").replace(/\D/g,""); if(n.length==10)n="91"+n; return n}
function valid(n){return /^91[0-9]{10}$/.test(norm(n))}
window.onload=()=>{if(localStorage.getItem("v22_login")=="1"){loginScreen.style.display="none";appRoot.style.display="block"}["attDate","issueDate","distDate","feeDate"].forEach(i=>{if($(i))$(i).value=today()});loadAll();loadSettings();}
function loadAll(){Object.keys(D).forEach(k=>D[k]=get(k));render();}
function render(){studentCount.innerText=D.students.length;teacherCount.innerText=D.teachers.length;bookCount.innerText=D.books.length;noticeCount.innerText=D.notices.length;attToday.innerText=D.attendance.filter(a=>a.date==today()&&a.status=="Present").length;feeDue.innerText=D.fees.reduce((s,f)=>s+Number(f.balance||0),0);renderStudents();renderDocs();renderTeachers();renderResults();renderBooks();renderIssues();renderDist();renderCom();renderFees();renderNotices();refreshSelects();}
function clearStudent(){["sId","sName","sRoll","sParent","sMother","sFather","sDob","sAadhar","sPen","sUdise","sCaste","sAddress"].forEach(i=>$(i).value="")}
function saveStudent(){if(!sName.value)return alert("विद्यार्थी नाव टाका"); if(!valid(sParent.value))return alert("मोबाईल 917507514475 या स्वरूपात टाका");let id=sId.value||uid(),a=D.students,i=a.findIndex(x=>x.id==id);let o={id,name:sName.value,className:sClass.value,roll:sRoll.value,parent:norm(sParent.value),mother:sMother.value,father:sFather.value,dob:sDob.value,aadhar:sAadhar.value,pen:sPen.value,udise:sUdise.value,caste:sCaste.value,address:sAddress.value};i>=0?a[i]=o:a.push(o);set("students",a);clearStudent();loadAll();alert("Student Save झाला")}
function renderStudents(){studentTable.innerHTML="<tr><th>नाव</th><th>वर्ग</th><th>रोल</th><th>PEN</th><th>पालक</th></tr>"+D.students.map(s=>`<tr><td>${s.name}</td><td>${s.className}</td><td>${s.roll}</td><td>${s.pen||""}</td><td>${s.parent}</td></tr>`).join("")}
function refreshSelects(){let opts=D.students.map(s=>`<option value="${s.id}">${s.name} - ${s.className}</option>`).join("");["docStudent","resStudent","certStudent","issueStudent","distStudent","feeStudent"].forEach(i=>{if($(i))$(i).innerHTML=opts}); if(issueBook) issueBook.innerHTML=D.books.map(b=>`<option value="${b.id}">${b.title}</option>`).join("")}
function saveDocument(){let s=D.students.find(x=>x.id==docStudent.value);let f=docFile.files[0];D.documents.push({id:uid(),student:s?.name||"",type:docType.value,file:f?f.name:"",date:today()});set("documents",D.documents);renderDocs();alert("Document entry Save झाली")}
function renderDocs(){docTable.innerHTML="<tr><th>विद्यार्थी</th><th>Type</th><th>File</th><th>Date</th></tr>"+D.documents.map(d=>`<tr><td>${d.student}</td><td>${d.type}</td><td>${d.file}</td><td>${d.date}</td></tr>`).join("")}
function saveTeacher(){let id=tId.value||uid(),a=D.teachers,i=a.findIndex(x=>x.id==id);let o={id,name:tName.value,mobile:norm(tMobile.value),subject:tSubject.value,type:tType.value,join:tJoin.value,salary:tSalary.value};i>=0?a[i]=o:a.push(o);set("teachers",a);["tId","tName","tMobile","tSubject","tJoin","tSalary"].forEach(i=>$(i).value="");loadAll()}
function renderTeachers(){teacherTable.innerHTML="<tr><th>नाव</th><th>प्रकार</th><th>मोबाईल</th><th>विषय/पद</th></tr>"+D.teachers.map(t=>`<tr><td>${t.name}</td><td>${t.type}</td><td>${t.mobile}</td><td>${t.subject}</td></tr>`).join("")}
function loadAttendance(){attList.innerHTML=D.students.filter(s=>s.className==attClass.value).map(s=>`<div class='row' data-id='${s.id}' data-status='Present'><b>${s.name}</b><button class='ok' onclick="mark(this,'Present')">उपस्थित</button><button class='bad' onclick="mark(this,'Absent')">अनुपस्थित</button><button class='half' onclick="mark(this,'Half Day')">अर्धा दिवस</button><span class='st'>Present</span></div>`).join("")||"विद्यार्थी नाहीत"}
function mark(btn,st){let r=btn.closest(".row");r.dataset.status=st;r.querySelector(".st").innerText=st}
function saveAttendance(){let a=D.attendance;document.querySelectorAll("#attList .row").forEach(r=>{let s=D.students.find(x=>x.id==r.dataset.id);a.push({date:attDate.value,className:attClass.value,name:s.name,mobile:s.parent,status:r.dataset.status})});set("attendance",a);loadAll();alert("Attendance Save झाली")}
function parseMarks(txt){return txt.split(",").map(x=>{let [sub,marks]=x.split(":");let [ob,max]=(marks||"0/100").split("/");return {sub:(sub||"").trim(),ob:Number(ob||0),max:Number(max||100)}}).filter(x=>x.sub)}
function saveResult(){let s=D.students.find(x=>x.id==resStudent.value);if(!s)return alert("विद्यार्थी निवडा");let ms=parseMarks(resMarks.value), total=ms.reduce((a,b)=>a+b.ob,0), max=ms.reduce((a,b)=>a+b.max,0), pct=max?Math.round(total*100/max):0;D.results.push({id:uid(),studentId:s.id,name:s.name,className:s.className,exam:resExam.value,year:resYear.value,attendance:resAttendance.value,marks:resMarks.value,total,max,percentage:pct,grade:pct>=75?"A":pct>=60?"B":pct>=45?"C":"D",activities:resActivities.value,remark:resRemark.value|| (pct>=35?"उत्तीर्ण":"अनुत्तीर्ण")});set("results",D.results);loadAll();alert("Result Save झाला")}
function renderResults(){resultTable.innerHTML="<tr><th>विद्यार्थी</th><th>परीक्षा</th><th>एकूण</th><th>%</th><th>Grade</th></tr>"+D.results.map(r=>`<tr><td>${r.name}</td><td>${r.exam}</td><td>${r.total}/${r.max}</td><td>${r.percentage}%</td><td>${r.grade}</td></tr>`).join("")}
function makeResultCard(){let s=D.students.find(x=>x.id==resStudent.value), ms=parseMarks(resMarks.value);if(!s)return alert("विद्यार्थी निवडा");let total=ms.reduce((a,b)=>a+b.ob,0), max=ms.reduce((a,b)=>a+b.max,0), pct=max?Math.round(total*100/max):0;resultCard.innerHTML=`<div class="printbox"><h2>${schoolTitle.innerText}</h2><h3>${resExam.value} प्रगती पत्रक</h3><p><b>नाव:</b> ${s.name} <b>वर्ग:</b> ${s.className} <b>हजेरी क्र.:</b> ${s.roll||""}</p><p><b>आई:</b> ${s.mother||""} <b>वडील:</b> ${s.father||""} <b>वर्ष:</b> ${resYear.value||academicYear.innerText}</p><table class="marks"><tr><th>विषय</th><th>प्राप्त गुण</th><th>पैकी</th></tr>${ms.map(m=>`<tr><td>${m.sub}</td><td>${m.ob}</td><td>${m.max}</td></tr>`).join("")}<tr><th>एकूण</th><th>${total}</th><th>${max}</th></tr><tr><th>टक्केवारी</th><th colspan="2">${pct}%</th></tr><tr><th>श्रेणी</th><th colspan="2">${pct>=75?"A":pct>=60?"B":pct>=45?"C":"D"}</th></tr></table><p><b>उपस्थिती:</b> ${resAttendance.value||"-"} <b>निकाल:</b> ${resRemark.value|| (pct>=35?"उत्तीर्ण":"अनुत्तीर्ण")}</p><p style="display:flex;justify-content:space-between;margin-top:45px"><span>वर्गशिक्षक सही</span><span>पालक सही</span><span>मुख्याध्यापक सही</span></p></div>`}
function makeRank(){let rows=D.results.filter(r=>r.className==rankClass.value).sort((a,b)=>b.percentage-a.percentage).map((r,i)=>({...r,rank:i+1}));rankBox.innerHTML="<table><tr><th>Rank</th><th>नाव</th><th>Exam</th><th>%</th><th>Grade</th></tr>"+rows.map(r=>`<tr><td>${r.rank}</td><td>${r.name}</td><td>${r.exam}</td><td>${r.percentage}</td><td>${r.grade}</td></tr>`).join("")+"</table>"}
function downloadRank(){let rows=D.results.filter(r=>r.className==rankClass.value).sort((a,b)=>b.percentage-a.percentage).map((r,i)=>({...r,rank:i+1}));downloadRows("rank.xlsx",rows)}
function makeCertificate(){let s=D.students.find(x=>x.id==certStudent.value);if(!s)return alert("विद्यार्थी निवडा");let type=certType.value;if(type=="ID Card"||type=="Hall Ticket"){certBox.innerHTML=`<div class="printbox" style="max-width:420px"><h3>${schoolTitle.innerText}</h3><h2>${type}</h2><p><b>${s.name}</b></p><p>Class: ${s.className} Roll: ${s.roll}</p><p>PEN: ${s.pen||"-"}</p><p>Parent: ${s.parent}</p></div>`;return} certBox.innerHTML=`<div class="printbox"><h2>${schoolTitle.innerText}</h2><h3>${type}</h3><p>प्रमाणित करण्यात येते की, <b>${s.name}</b> हा/ही विद्यार्थी ${s.className} मध्ये ${academicYear.innerText} या शैक्षणिक वर्षात शिकत आहे.</p><p>जन्म तारीख: ${s.dob||"-"} आधार: ${s.aadhar||"-"} PEN: ${s.pen||"-"}</p><p>उद्देश: ${certReason.value||"-"}</p><p style="text-align:right;margin-top:70px">मुख्याध्यापक सही व शिक्का</p></div>`}
function saveBook(){D.books.push({id:uid(),title:bookTitle.value,author:bookAuthor.value,isbn:bookIsbn.value,qty:Number(bookQty.value||1)});set("books",D.books);bookTitle.value=bookAuthor.value=bookIsbn.value=bookQty.value="";loadAll()}
function renderBooks(){bookTable.innerHTML="<tr><th>पुस्तक</th><th>लेखक</th><th>ISBN</th><th>प्रमाण</th></tr>"+D.books.map(b=>`<tr><td>${b.title}</td><td>${b.author}</td><td>${b.isbn}</td><td>${b.qty}</td></tr>`).join("")}
function issueBookFn(){let s=D.students.find(x=>x.id==issueStudent.value), b=D.books.find(x=>x.id==issueBook.value);D.issues.push({id:uid(),student:s?.name||"",book:b?.title||"",date:issueDate.value,status:"Issued",fine:0});set("issues",D.issues);loadAll()}
function returnBook(){let i=D.issues.find(x=>x.id==returnIssueId.value);if(!i)return alert("Issue ID तपासा");i.status="Returned";i.returnDate=today();i.fine=Number(fineAmt.value||0);set("issues",D.issues);loadAll()}
function renderIssues(){issueTable.innerHTML="<tr><th>ID</th><th>विद्यार्थी</th><th>पुस्तक</th><th>दिनांक</th><th>Status</th><th>Fine</th></tr>"+D.issues.map(i=>`<tr><td>${i.id}</td><td>${i.student}</td><td>${i.book}</td><td>${i.date}</td><td>${i.status}</td><td>${i.fine||0}</td></tr>`).join("")}
function saveDistribution(){let s=D.students.find(x=>x.id==distStudent.value);D.distributions.push({id:uid(),student:s?.name||"",item:distItem.value,details:distDetails.value,date:distDate.value});set("distributions",D.distributions);distDetails.value="";loadAll()}
function renderDist(){distTable.innerHTML="<tr><th>विद्यार्थी</th><th>Item</th><th>तपशील</th><th>दिनांक</th></tr>"+D.distributions.map(x=>`<tr><td>${x.student}</td><td>${x.item}</td><td>${x.details}</td><td>${x.date}</td></tr>`).join("")}
function saveCommittee(){D.committees.push({id:uid(),type:comType.value,name:comName.value,role:comRole.value,mobile:comMobile.value,minutes:comMinutes.value});set("committees",D.committees);comName.value=comRole.value=comMobile.value=comMinutes.value="";loadAll()}
function renderCom(){comTable.innerHTML="<tr><th>समिती</th><th>सदस्य</th><th>पद</th><th>मोबाईल</th></tr>"+D.committees.map(c=>`<tr><td>${c.type}</td><td>${c.name}</td><td>${c.role}</td><td>${c.mobile}</td></tr>`).join("")}
function saveFee(){let s=D.students.find(x=>x.id==feeStudent.value), total=Number(feeTotal.value||0), paid=Number(feePaid.value||0);D.fees.push({id:uid(),student:s?.name||"",mobile:s?.parent||"",total,paid,balance:total-paid,date:feeDate.value,remark:feeRemark.value});set("fees",D.fees);loadAll()}
function renderFees(){feeTable.innerHTML="<tr><th>Receipt ID</th><th>विद्यार्थी</th><th>Total</th><th>Paid</th><th>Balance</th><th>Date</th></tr>"+D.fees.map(f=>`<tr><td>${f.id}</td><td>${f.student}</td><td>${f.total}</td><td>${f.paid}</td><td>${f.balance}</td><td>${f.date}</td></tr>`).join("")}
function makeReceipt(){let f=D.fees[D.fees.length-1];if(!f)return alert("Fee Save करा");receiptBox.innerHTML=`<div class="printbox"><h2>${schoolTitle.innerText}</h2><h3>Fee Receipt</h3><p><b>Receipt ID:</b> ${f.id}</p><p><b>विद्यार्थी:</b> ${f.student}</p><p><b>Total:</b> ₹${f.total} <b>Paid:</b> ₹${f.paid} <b>Balance:</b> ₹${f.balance}</p><p><b>Date:</b> ${f.date}</p><p style="text-align:right;margin-top:45px">क्लर्क/मुख्याध्यापक सही</p></div>`}
function aiNotice(){let m={mr:`सर्व पालकांना सूचित करण्यात येते की ${noticeType.value} संदर्भात शाळेकडून आवश्यक माहिती देण्यात येत आहे. कृपया विद्यार्थ्यांकडे लक्ष द्यावे.`,hi:`सभी अभिभावकों को सूचित किया जाता है कि ${noticeType.value} संबंधी सूचना विद्यालय द्वारा दी जा रही है। कृपया विद्यार्थी पर ध्यान दें।`,en:`Important school notice regarding ${noticeType.value}. Please take note.`};noticeText.value=m[noticeLang.value]}
function saveNotice(){D.notices.push({id:uid(),type:noticeType.value,lang:noticeLang.value,text:noticeText.value,date:today()});set("notices",D.notices);loadAll()}
function renderNotices(){noticeTable.innerHTML="<tr><th>Type</th><th>Lang</th><th>Text</th><th>Date</th></tr>"+D.notices.map(n=>`<tr><td>${n.type}</td><td>${n.lang}</td><td>${n.text}</td><td>${n.date}</td></tr>`).join("")}
function wa(){let o=getObj("wa");return {base:waBase.value||o.base||"https://whatsbot.tech/api",token:waToken.value||o.token||"",device:waDevice.value||o.device||"46120",mobile:norm(waDefault.value||o.mobile||"917507514475")}}
function saveWhatsApp(){setObj("wa",wa());alert("WhatsApp API Save झाले")}
function waUrlFn(m,msg){let o=wa();return `${o.base}/send_sms?api_token=${encodeURIComponent(o.token)}&mobile=${norm(m)}&message=${encodeURIComponent(msg)}&device_id=${encodeURIComponent(o.device)}`}
function sendWhatsAppTest(){let u=waUrlFn(waDefault.value,waMsg.value);waUrl.value=u;fetch(u).then(r=>r.text()).then(x=>alert("Response: "+x)).catch(e=>alert("URL Generated. API Token/CORS तपासा."))}
function sms(){let o=getObj("sms");return {tpl:smsUrlTemplate.value||o.tpl||"",key:smsApiKey.value||o.key||"",sender:smsSender.value||o.sender||"SCHOOL"}}
function saveSmsApi(){setObj("sms",sms());alert("SMS API Save झाले")}
function smsUrlFn(m,msg){let o=sms();return (o.tpl||"").replaceAll("{API_KEY}",encodeURIComponent(o.key)).replaceAll("{MOBILE}",norm(m)).replaceAll("{MESSAGE}",encodeURIComponent(msg)).replaceAll("{SENDER_ID}",encodeURIComponent(o.sender))}
function sendNoticeBoth(){let msg=noticeText.value;noticeUrls.value=D.students.map(s=>"WA: "+waUrlFn(s.parent,msg)+"\nSMS: "+smsUrlFn(s.parent,msg)).join("\n\n")}
function sendAbsentBoth(){let abs=D.attendance.filter(a=>a.date==attDate.value&&a.status=="Absent");reportBox.innerText=abs.map(a=>"WA: "+waUrlFn(a.mobile,`आपला पाल्य ${a.name} आज अनुपस्थित आहे.`)+"\nSMS: "+smsUrlFn(a.mobile,`आपला पाल्य ${a.name} आज अनुपस्थित आहे.`)).join("\n\n");}
function sendResultBoth(){let r=D.results[D.results.length-1];if(!r)return alert("निकाल Save करा");let s=D.students.find(x=>x.id==r.studentId);let msg=`निकाल: ${r.name}, ${r.exam}, ${r.total}/${r.max}, ${r.percentage}%, Grade ${r.grade}`;waUrl.value=waUrlFn(s.parent,msg);alert("WhatsApp/SMS URL तयार झाले")}
function sendFeeDueBoth(){let due=D.fees.filter(f=>Number(f.balance)>0);reportBox.innerText=due.map(f=>"WA: "+waUrlFn(f.mobile,`कृपया थकीत फी ₹${f.balance} जमा करावी.`)+"\nSMS: "+smsUrlFn(f.mobile,`कृपया थकीत फी ₹${f.balance} जमा करावी.`)).join("\n\n")}
function showReport(){let rows=D[reportType.value]||[];reportBox.innerHTML="<table><tr>"+(rows[0]?Object.keys(rows[0]).map(h=>`<th>${h}</th>`).join(""):"")+"</tr>"+rows.map(r=>"<tr>"+Object.values(r).map(v=>`<td>${v}</td>`).join("")+"</tr>").join("")+"</table>"}
function downloadRows(name,rows){let ws=XLSX.utils.json_to_sheet(rows);let wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Report");XLSX.writeFile(wb,name)}
function downloadReport(){downloadRows(reportType.value+".xlsx",D[reportType.value]||[])}
function saveGeneral(){let g={school:setSchool.value,address:setAddress.value,year:setYear.value,adminMobile:adminMobile.value};setObj("general",g);loadSettings();alert("Settings Save झाले")}
function saveFirebase(){setObj("firebase",{config:firebaseConfig.value});alert("Firebase Config Save झाला")}
function loadSettings(){let w=getObj("wa");waBase.value=w.base||"https://whatsbot.tech/api";waToken.value=w.token||"";waDevice.value=w.device||"46120";waDefault.value=w.mobile||"917507514475";let s=getObj("sms");smsUrlTemplate.value=s.tpl||"";smsApiKey.value=s.key||"";smsSender.value=s.sender||"SCHOOL";let f=getObj("firebase");firebaseConfig.value=f.config||"";let g=getObj("general");if(g.school)schoolTitle.innerText=g.school;if(g.address)schoolAddressTitle.innerText=g.address;if(g.year)academicYear.innerText=g.year;setSchool.value=g.school||"";setAddress.value=g.address||"";setYear.value=g.year||"शैक्षणिक वर्ष 2025 - 26";adminMobile.value=g.adminMobile||"917507514475"}
function backupData(){let data={D,wa:getObj("wa"),sms:getObj("sms"),firebase:getObj("firebase"),general:getObj("general")};let b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});let a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="school_erp_v22_backup.json";a.click()}
async function restoreData(){let f=restoreFile.files[0];if(!f)return alert("Backup JSON निवडा");let data=JSON.parse(await f.text());Object.keys(data.D||{}).forEach(k=>set(k,data.D[k]));["wa","sms","firebase","general"].forEach(k=>{if(data[k])setObj(k,data[k])});loadAll();loadSettings();alert("Restore पूर्ण")}


if(typeof D!=="undefined"){
  D.transport=D.transport||[];
  D.health=D.health||[];
  D.mdm=D.mdm||[];
  D.audit=D.audit||[];
}
const oldSet = typeof set==="function" ? set : null;
function logAudit(action){try{D.audit=D.audit||get("audit");D.audit.push({id:uid(),action,date:new Date().toLocaleString()});set("audit",D.audit);renderAudit()}catch(e){}}
function saveTransport(){D.transport=get("transport");D.transport.push({id:uid(),busNo:busNo.value,driver:driverName.value,mobile:driverMobile.value,route:routeName.value,gps:gpsLink.value});set("transport",D.transport);logAudit("Transport Saved");renderTransport();alert("Transport Save झाले")}
function renderTransport(){if(!window.transportTable)return;D.transport=get("transport");transportTable.innerHTML="<tr><th>Bus</th><th>Driver</th><th>Mobile</th><th>Route</th><th>GPS</th></tr>"+D.transport.map(x=>`<tr><td>${x.busNo}</td><td>${x.driver}</td><td>${x.mobile}</td><td>${x.route}</td><td>${x.gps}</td></tr>`).join("")}
function saveHealth(){let s=(D.students||get("students")).find(x=>x.id==healthStudent.value);D.health=get("health");D.health.push({id:uid(),student:s?.name||"",date:healthDate.value,height:heightVal.value,weight:weightVal.value,hb:hbVal.value,remark:healthRemark.value});set("health",D.health);logAudit("Health Saved");renderHealth();alert("Health Save झाले")}
function renderHealth(){if(!window.healthTable)return;D.health=get("health");healthTable.innerHTML="<tr><th>Student</th><th>Date</th><th>Height</th><th>Weight</th><th>HB</th><th>Remark</th></tr>"+D.health.map(x=>`<tr><td>${x.student}</td><td>${x.date}</td><td>${x.height}</td><td>${x.weight}</td><td>${x.hb}</td><td>${x.remark}</td></tr>`).join("")}
function saveMDM(){D.mdm=get("mdm");D.mdm.push({id:uid(),date:mdmDate.value,className:mdmClass.value,present:mdmPresent.value,menu:mdmMenu.value});set("mdm",D.mdm);logAudit("MDM Saved");renderMDM();alert("MDM Save झाले")}
function renderMDM(){if(!window.mdmTable)return;D.mdm=get("mdm");mdmTable.innerHTML="<tr><th>Date</th><th>Class</th><th>Beneficiary</th><th>Menu</th></tr>"+D.mdm.map(x=>`<tr><td>${x.date}</td><td>${x.className}</td><td>${x.present}</td><td>${x.menu}</td></tr>`).join("")}
function renderAudit(){if(!window.auditTable)return;D.audit=get("audit");auditTable.innerHTML="<tr><th>ID</th><th>Action</th><th>Date</th></tr>"+D.audit.slice().reverse().map(x=>`<tr><td>${x.id}</td><td>${x.action}</td><td>${x.date}</td></tr>`).join("")}
const oldRenderV22 = typeof render==="function" ? render : null;
if(oldRenderV22){
  render=function(){oldRenderV22(); renderTransport(); renderHealth(); renderMDM(); renderAudit(); try{["healthStudent"].forEach(i=>{if($(i))$(i).innerHTML=(D.students||get("students")).map(s=>`<option value="${s.id}">${s.name} - ${s.className}</option>`).join("")});}catch(e){}}
}


/* V23 Stable Live: no auto-delete, backup, complete settings/certificates */
window.SCHOOL_ERP_VERSION="V23 Stable Live";
function v23GetObj(k){try{return JSON.parse(localStorage.getItem("v22_"+k)||localStorage.getItem("v23_"+k)||"{}")}catch(e){return {}}}
function v23SetObj(k,v){localStorage.setItem("v22_"+k,JSON.stringify(v));localStorage.setItem("v23_"+k,JSON.stringify(v))}
function v23GetArr(k){try{return JSON.parse(localStorage.getItem("v22_"+k)||localStorage.getItem("v23_"+k)||"[]")}catch(e){return []}}
function v23SetArr(k,v){localStorage.setItem("v22_"+k,JSON.stringify(v));localStorage.setItem("v23_"+k,JSON.stringify(v))}
function saveMasterSettings(){
  const g={
    school:(window.setSchool&&setSchool.value)||"",
    address:(window.setAddress&&setAddress.value)||"",
    year:(window.setYear&&setYear.value)||"शैक्षणिक वर्ष 2025 - 26",
    udise:(window.setUdise&&setUdise.value)||"",
    affiliation:(window.setAffiliation&&setAffiliation.value)||"",
    principal:(window.setPrincipal&&setPrincipal.value)||"",
    chairman:(window.setChairman&&setChairman.value)||"",
    secretary:(window.setSecretary&&setSecretary.value)||"",
    adminMobile:(window.setAdminMobile&&setAdminMobile.value)||"917507514475",
    logoUrl:(window.setLogoUrl&&setLogoUrl.value)||"assets/school-logo.jpg"
  };
  v23SetObj("general",g); applyMasterSettings(); alert("School Settings Save झाले");
}
function applyMasterSettings(){
  const g=v23GetObj("general");
  if(document.getElementById("schoolTitle") && g.school) schoolTitle.innerText=g.school;
  if(document.getElementById("schoolAddressTitle") && g.address) schoolAddressTitle.innerText=g.address;
  if(document.getElementById("academicYear") && g.year) academicYear.innerText=g.year;
  if(window.setSchool) setSchool.value=g.school||"";
  if(window.setAddress) setAddress.value=g.address||"";
  if(window.setYear) setYear.value=g.year||"शैक्षणिक वर्ष 2025 - 26";
  if(window.setUdise) setUdise.value=g.udise||"";
  if(window.setAffiliation) setAffiliation.value=g.affiliation||"";
  if(window.setPrincipal) setPrincipal.value=g.principal||"";
  if(window.setChairman) setChairman.value=g.chairman||"";
  if(window.setSecretary) setSecretary.value=g.secretary||"";
  if(window.setAdminMobile) setAdminMobile.value=g.adminMobile||"917507514475";
  if(window.setLogoUrl) setLogoUrl.value=g.logoUrl||"assets/school-logo.jpg";
  const logo=document.querySelector(".logoText");
  if(logo){
    logo.innerHTML="";
    logo.style.background="#fff url('"+(g.logoUrl||"assets/school-logo.jpg")+"?v="+Date.now()+"') center/cover no-repeat";
    logo.style.color="transparent";
  }
}
function getCertStudent(){try{return (D.students||v23GetArr("students")).find(x=>x.id==certStudent.value)}catch(e){return null}}
function schoolName(){return (document.getElementById("schoolTitle")||{}).innerText||"शाळेचे नाव"}
function schoolAddr(){return (document.getElementById("schoolAddressTitle")||{}).innerText||""}
function schoolYear(){return (document.getElementById("academicYear")||{}).innerText||"शैक्षणिक वर्ष 2025 - 26"}
function makeCertificate(){
  const s=getCertStudent(); if(!s){alert("विद्यार्थी निवडा");return}
  const g=v23GetObj("general"), type=certType.value, reason=certReason.value||"-";
  let sign=`<p style="display:flex;justify-content:space-between;margin-top:60px"><span>लिपिक सही</span><span>वर्गशिक्षक सही</span><span>${g.principal||"मुख्याध्यापक"} सही व शिक्का</span></p>`;
  let commonRows=`<tr><th>विद्यार्थी नाव</th><td>${s.name||""}</td></tr><tr><th>आईचे नाव</th><td>${s.mother||"-"}</td></tr><tr><th>वडिलांचे नाव</th><td>${s.father||"-"}</td></tr><tr><th>जन्म तारीख</th><td>${s.dob||"-"}</td></tr><tr><th>वर्ग / हजेरी क्र.</th><td>${s.className||""} / ${s.roll||""}</td></tr><tr><th>आधार</th><td>${s.aadhar||"-"}</td></tr><tr><th>PEN / APAAR</th><td>${s.pen||"-"}</td></tr><tr><th>UDISE / Student ID</th><td>${s.udise||"-"}</td></tr><tr><th>जात / प्रवर्ग</th><td>${s.caste||"-"}</td></tr><tr><th>पत्ता</th><td>${s.address||"-"}</td></tr><tr><th>उद्देश</th><td>${reason}</td></tr>`;
  if(type==="ID Card"){
    certBox.innerHTML=`<div class="printbox" style="max-width:430px;margin:auto"><h3>${schoolName()}</h3><h2>STUDENT ID CARD</h2><table class="certificate-table" style="width:100%">${commonRows}</table><p style="text-align:right;margin-top:35px">${g.principal||"मुख्याध्यापक"} सही</p></div>`;
  } else if(type==="Hall Ticket"){
    certBox.innerHTML=`<div class="printbox"><h2>${schoolName()}</h2><h3>${schoolAddr()}</h3><div class="certificate-title">HALL TICKET</div><table class="certificate-table" style="width:100%">${commonRows}</table><p>विद्यार्थ्याने परीक्षेसाठी वेळेवर उपस्थित राहावे व शाळेचे सर्व नियम पाळावेत.</p>${sign}</div>`;
  } else {
    certBox.innerHTML=`<div class="printbox"><h2>${schoolName()}</h2><h3>${schoolAddr()}</h3><div class="certificate-title">${type}</div><p>प्रमाणित करण्यात येते की खालील माहिती शाळेच्या नोंदीप्रमाणे बरोबर आहे.</p><table class="certificate-table" style="width:100%">${commonRows}<tr><th>शैक्षणिक वर्ष</th><td>${schoolYear()}</td></tr><tr><th>UDISE Code</th><td>${g.udise||"-"}</td></tr><tr><th>मान्यता क्रमांक</th><td>${g.affiliation||"-"}</td></tr></table>${sign}</div>`;
  }
}
const oldLoadSettingsV23 = window.loadSettings;
window.loadSettings=function(){try{if(oldLoadSettingsV23)oldLoadSettingsV23()}catch(e){} applyMasterSettings();}
const oldBackupDataV23=window.backupData;
window.backupData=function(){
  const keys=["students","documents","teachers","attendance","results","books","issues","distributions","committees","fees","notices","transport","health","mdm","audit"];
  const data={version:"V23 Stable Live",date:new Date().toISOString(),D:{},general:v23GetObj("general"),wa:v23GetObj("wa"),sms:v23GetObj("sms"),firebase:v23GetObj("firebase")};
  keys.forEach(k=>data.D[k]=v23GetArr(k));
  const b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="school_erp_v23_backup_"+new Date().toISOString().slice(0,10)+".json";a.click();
}
window.addEventListener("DOMContentLoaded",()=>{setTimeout(applyMasterSettings,400)});

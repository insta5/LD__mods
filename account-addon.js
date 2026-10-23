/* ============================================================
   LD Add-ons — Account addon
   Login (creeper scene) + Account panel (AR/EN) + People search
   Add before </body> AFTER the main script:
   <script src="account-addon.js"></script>
   ============================================================ */
var LANG=J("ld_lang")||"ar",AC=J("ld_ac")||"#19ff6b",LIT=true,AM="in",PSEC="acc",PTAB="profile",SU=null,STO=null,FBL=null;

/* ---------- icons ---------- */
var SV={
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
logout:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',
chev:'<path d="M9 6l6 6-6 6"/>'
};
function ico(n,s){s=s||18;return '<svg class="ic" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+SV[n]+'</svg>'}
var GSVG='<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';
var ASVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>';
var TGSVG='<svg width="22" height="22" viewBox="0 0 24 24" fill="#29b6f6"><path d="M9.8 15.6l-.4 4.2c.6 0 .9-.3 1.2-.6l2.9-2.7 6 4.4c1.1.6 1.9.3 2.2-1L23.9 4c.4-1.6-.6-2.3-1.7-1.9L1.5 10c-1.5.6-1.5 1.5-.3 1.9l5.3 1.7L18.8 6c.6-.4 1.1-.2.7.2z"/></svg>';

/* ---------- panel texts ---------- */
var TX={
ar:{back:"رجوع",panelTitle:"إعدادات المنصة والحساب",sideAccount:"الحساب وتسجيل الدخول",sideLang:"اللغة",sideAbout:"حقوق الموقع",sideTerms:"شروط الخدمة",sidePriv:"سياسة الخصوصية",
mgmt:"إدارة الحساب",mgmtSub:"عدّل ملفك الشخصي وبيانات الدخول",tabProfile:"الملف الشخصي",tabSec:"الأمان",
followers:"المتابِعين",following:"يتابع",posts:"المنشورات",saved:"المحفوظات",verified:"موثّق",notVerified:"غير موثّق",via:"عبر",viaEmail:"الإيميل",
photo:"تغيير الصورة",dname:"الاسم الظاهر",uname:"اسم المستخدم (حروف إنجليزية صغيرة وأرقام و _ ، 3 فأكثر)",tg:"يوزر قناة تلجرام (بدون @)",save:"حفظ",viewProf:"عرض ملفي",logout:"تسجيل الخروج من الحساب",savedOk:"تم الحفظ",
eUser:"اسم المستخدم: 3 أحرف أو أكثر، حروف إنجليزية صغيرة وأرقام و _ فقط",eName:"اكتب الاسم الظاهر",eTaken:"اسم المستخدم مأخوذ",eFail:"فشل الحفظ: ",eFill:"عبّي كل الحقول",
curEmail:"الإيميل الحالي",newEmail:"الإيميل الجديد",curPass:"كلمة السر الحالية",newPass:"كلمة السر الجديدة (6 أحرف على الأقل)",changeEmail:"تغيير الإيميل",changePass:"تغيير كلمة السر",
provNote:"حسابك مرتبط بـ {p}، لذلك الإيميل وكلمة السر تُدار من حساب {p} نفسه.",done:"تمت العملية بنجاح",
langTitle:"لغة لوحة الحساب",langNote:"تغيير اللغة يخص لوحة الحساب فقط، وباقي الموقع كما هو.",
aboutTitle:"حقوق الموقع",aboutText:"LD Add-ons منصة مجانية لعرض وتحميل مودات وإضافات وخرائط وسكنات ماينكرافت (Bedrock و Java). كل ملف يعود لصاحبه الأصلي ويُنشر باسمه. الموقع غير تابع لشركة Mojang أو Microsoft، و Minecraft علامة تجارية تخص أصحابها. لطلب حذف محتوى أو الإبلاغ عن مخالفة تواصل مع المطوّر عبر تلجرام.",
chUpd:"قناة التحديثات",chNot:"قناة الإشعارات",dev:"مطوّر الموقع",
termsTitle:"شروط الخدمة",terms:["باستخدامك الموقع فأنت توافق على هذه الشروط.","المحتوى للاستخدام الشخصي، ولا يجوز إعادة رفعه أو بيعه بدون إذن صاحبه.","أنت مسؤول عن حسابك وكلمة سرك، ولا تشاركها مع أحد.","يمنع النشر المسيء أو المخالف أو انتحال شخصية غيرك.","يحق للإدارة حذف أي محتوى أو حساب يخالف الشروط.","التحميل على مسؤوليتك؛ ننصح بتجربة الملفات على نسخة احتياطية من عالمك."],
privTitle:"سياسة الخصوصية",priv:["نحفظ الإيميل واسم المستخدم والاسم والصورة لتشغيل حسابك.","الاسم واسم المستخدم والصورة والمتابعون والمحفوظات تظهر في ملفك العام.","الإيميل لا يظهر للآخرين.","تسجيل الدخول بـ Google أو Apple يتم عبر خدماتهم ولا نحصل على كلمة سرك.","نستخدم تخزين المتصفح لحفظ جلسة الدخول وتفضيلاتك.","لحذف حسابك أو بياناتك تواصل مع المطوّر عبر تلجرام."],
e_INVALID_LOGIN_CREDENTIALS:"كلمة السر الحالية غير صحيحة",e_INVALID_PASSWORD:"كلمة السر الحالية غير صحيحة",e_EMAIL_EXISTS:"الإيميل مستخدم من قبل",e_INVALID_EMAIL:"الإيميل غير صحيح",e_WEAK_PASSWORD:"كلمة السر ضعيفة (6 أحرف على الأقل)",e_TOO_MANY_ATTEMPTS_TRY_LATER:"محاولات كثيرة، جرّب لاحقاً"},
en:{back:"Return",panelTitle:"Platform and account settings",sideAccount:"Account & Login",sideLang:"Language",sideAbout:"Site rights",sideTerms:"Terms of Service",sidePriv:"Privacy Policy",
mgmt:"Account management",mgmtSub:"Edit your profile and sign-in details",tabProfile:"Profile",tabSec:"Security",
followers:"Followers",following:"Following",posts:"Posts",saved:"Saved",verified:"Verified",notVerified:"Not verified",via:"Via",viaEmail:"Email",
photo:"Change photo",dname:"Display name",uname:"Username (lowercase letters, numbers and _ , 3+ characters)",tg:"Telegram channel username (without @)",save:"Save",viewProf:"View profile",logout:"Log out of the current account",savedOk:"Saved",
eUser:"Username: 3+ lowercase letters, numbers or _ only",eName:"Enter a display name",eTaken:"That username is taken",eFail:"Save failed: ",eFill:"Fill in all fields",
curEmail:"Current email",newEmail:"New email",curPass:"Current password",newPass:"New password (6+ characters)",changeEmail:"Change email",changePass:"Change password",
provNote:"Your account is linked to {p}, so your email and password are managed from your {p} account.",done:"Done successfully",
langTitle:"Account panel language",langNote:"This only changes the account panel. The rest of the site stays the same.",
aboutTitle:"Site rights",aboutText:"LD Add-ons is a free platform to browse and download Minecraft mods, add-ons, maps and skins (Bedrock and Java). Every file belongs to its original creator and is published under their name. The site is not affiliated with Mojang or Microsoft, and Minecraft is a trademark of its owners. To request removal of content or report a violation, contact the developer on Telegram.",
chUpd:"Updates channel",chNot:"Notifications channel",dev:"Site developer",
termsTitle:"Terms of Service",terms:["By using the site you agree to these terms.","Content is for personal use only; do not re-upload or sell it without the owner's permission.","You are responsible for your account and password; never share them.","Abusive, illegal or impersonating posts are not allowed.","The admins may remove any content or account that breaks the terms.","Downloads are at your own risk; test files on a backup of your world."],
privTitle:"Privacy Policy",priv:["We store your email, username, name and photo to run your account.","Your name, username, photo, followers and saved items appear on your public profile.","Your email is never shown to others.","Google / Apple sign-in goes through their services; we never receive your password.","We use browser storage to keep your session and preferences.","To delete your account or data, contact the developer on Telegram."],
e_INVALID_LOGIN_CREDENTIALS:"Current password is wrong",e_INVALID_PASSWORD:"Current password is wrong",e_EMAIL_EXISTS:"This email is already in use",e_INVALID_EMAIL:"Invalid email",e_WEAK_PASSWORD:"Password must be at least 6 characters",e_TOO_MANY_ATTEMPTS_TRY_LATER:"Too many attempts, try later"}
};
function t(k){return (TX[LANG]&&TX[LANG][k])||TX.en[k]||k}
function perr(m){var v=(TX[LANG]||{})["e_"+String(m).split(" ")[0]];return v||String(m)}
function errEn(m){var s=String(m),T={EMAIL_EXISTS:"This email is already in use",INVALID_EMAIL:"Invalid email",WEAK_PASSWORD:"Password must be at least 6 characters",INVALID_LOGIN_CREDENTIALS:"Wrong email or password",EMAIL_NOT_FOUND:"Wrong email or password",INVALID_PASSWORD:"Wrong email or password",MISSING_PASSWORD:"Enter your password",TOO_MANY_ATTEMPTS_TRY_LATER:"Too many attempts, try again later",USERNAME:"Username: 3-20 lowercase letters, numbers or _",TAKEN:"That username is taken",OPERATION_NOT_ALLOWED:"This sign-in method is not enabled in Firebase"},k;for(k in T)if(s.indexOf(k)==0)return T[k];return s}

/* ---------- styles ---------- */
(function(){var s=document.createElement("style");s.textContent=`
body.lg-on header,body.lg-on .gnav,body.lg-on .foot{display:none}
body.lg-on main{padding:0;max-width:none}
.lgn{position:fixed;inset:0;z-index:60;overflow-y:auto;display:flex;align-items:center;justify-content:center;gap:clamp(20px,6vw,90px);padding:26px 16px;direction:ltr;background:radial-gradient(700px 500px at 28% 55%,#ffffff12,transparent 70%),#0a0c10;transition:background .5s}
.lgn.off{background:#050608}
.lg-star{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;animation:lgtw 3s infinite}
@keyframes lgtw{50%{opacity:.1}}
.lg-scene{position:relative;width:min(380px,40vw);height:min(440px,70vh);flex:none;cursor:pointer;z-index:1;display:grid;place-items:center}
.creeper{width:min(230px,100%);height:auto;position:relative;z-index:2;animation:lgfl 4s ease-in-out infinite;transition:filter .5s}
@keyframes lgfl{50%{transform:translateY(-8px)}}
.halo{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--ac) 35%,transparent),transparent 65%);top:50%;left:50%;transform:translate(-50%,-62%);transition:opacity .5s;pointer-events:none}
.beam{position:absolute;left:55%;top:16%;width:560px;height:420px;background:linear-gradient(95deg,color-mix(in srgb,var(--ac) 40%,transparent),transparent 80%);clip-path:polygon(0 6%,100% 40%,100% 100%,0 24%);transition:opacity .5s;pointer-events:none}
.lgn.off .halo,.lgn.off .beam{opacity:0}
.eye{fill:var(--ac);filter:drop-shadow(0 0 7px var(--ac));transition:fill .4s}
.lgn.off .eye{fill:#050505;filter:none}
.lgn.off .creeper{filter:brightness(.45)}
.lg-hint{position:absolute;bottom:0;font-size:12px;color:#6c7488}
.lg-card{position:relative;z-index:3;width:min(400px,100%);padding:30px 28px;border-radius:30px;background:linear-gradient(#10141c,#0b0e14);border:1px solid #232a38;box-shadow:0 30px 80px #000c}
.lg-card h1{font-size:30px;font-weight:900}
.lg-card .sub{color:var(--mu);font-size:14px;margin:6px 0 20px}
.lg-tabs{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;border-radius:14px;background:#080a0e;border:1px solid var(--line);margin-bottom:6px}
.lg-tabs button{padding:11px;border:0;border-radius:11px;background:none;color:var(--mu);font-weight:700;cursor:pointer}
.lg-tabs button.on{background:#262b35;color:#fff}
.lg-lr{display:flex;justify-content:space-between;margin:14px 0 7px;font-size:13px;color:#aab2c2;font-weight:600}
.lg-lr a{color:#fff;cursor:pointer;font-weight:700}
.lg-f{display:flex;align-items:center;gap:10px;padding:0 14px;border:1px solid var(--line);border-radius:14px;background:#0a0d13;color:var(--mu)}
.lg-f:focus-within{border-color:var(--ac)}
.lg-f input{flex:1;min-width:0;background:none;border:0;outline:0;padding:15px 0;color:#fff}
.lg-eye{background:none;border:0;color:var(--mu);cursor:pointer;display:grid;padding:0}
.lg-go{width:100%;margin-top:18px;padding:15px;border:0;border-radius:14px;font-weight:800;font-size:16px;cursor:pointer;color:#071109;background:linear-gradient(120deg,color-mix(in srgb,var(--ac) 55%,#fff),var(--ac));display:flex;justify-content:center;align-items:center;gap:8px}
.lg-go:disabled{opacity:.6}
.lg-or{display:flex;align-items:center;gap:10px;margin:20px 0 14px;color:#5d6577;font-size:11px;letter-spacing:1.5px}
.lg-or:before,.lg-or:after{content:"";flex:1;height:1px;background:var(--line)}
.lg-soc{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.lg-soc button{padding:14px;border-radius:14px;border:1px solid var(--line);background:#0a0d13;cursor:pointer;display:flex;justify-content:center;align-items:center;gap:8px;font-weight:700;font-size:14px;color:#fff}
.lg-err{color:#ff6b7e;font-size:13px;min-height:18px;margin-top:10px}
.lg-x{position:absolute;top:14px;left:14px;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:#12151c;color:#fff;font-size:22px;cursor:pointer;z-index:5}
.lg-dots{position:absolute;top:16px;right:16px;display:flex;gap:10px;padding:10px 12px;border-radius:999px;background:#12151c;border:1px solid var(--line);z-index:5}
.lg-dots i{width:18px;height:18px;border-radius:50%;cursor:pointer}
.lg-dots i.on{box-shadow:0 0 0 3px #ffffff66}
@media(max-width:820px){.lgn{flex-direction:column;justify-content:flex-start;gap:0;padding-top:64px}.lg-scene{width:100%;height:250px}.creeper{width:150px}.beam{display:none}.halo{width:300px;height:300px}}
/* panel */
.pn{max-width:1000px;margin:0 auto}
.pn-top{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:16px}
.pn-top h2{margin:0;font-size:18px}
.pn-back{display:inline-flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer}
.pn-card{display:grid;grid-template-columns:230px 1fr;border:1px solid var(--line);border-radius:26px;background:#0b0d13;overflow:hidden}
.pn-side{padding:14px;border-inline-end:1px solid var(--line);display:flex;flex-direction:column;gap:6px}
.pn-side button{display:flex;align-items:center;gap:10px;padding:13px 12px;border:0;border-radius:12px;background:none;color:var(--mu);font-size:13px;font-weight:700;cursor:pointer;text-align:start}
.pn-side button.on{background:linear-gradient(135deg,#ff1f5a,var(--r));color:#fff;box-shadow:0 6px 20px #ff2a3d55}
.pn-main{padding:22px;min-width:0}
.pn-h{font-size:18px;margin:0}
.pn-p{color:var(--mu);font-size:13px;margin:4px 0 0;line-height:1.7}
.pn-tabs{display:inline-flex;gap:4px;padding:5px;border:1px solid var(--line);border-radius:999px;background:#0a0c11;margin:14px 0}
.pn-tabs button{display:flex;align-items:center;gap:6px;padding:8px 14px;border:0;border-radius:999px;background:none;color:var(--mu);font-size:12px;font-weight:700;cursor:pointer}
.pn-tabs button.on{background:var(--r);color:#fff}
.pn-user{display:flex;gap:14px;align-items:center;padding:14px;border:1px solid var(--line);border-radius:18px;background:#0d1019}
.pn-user b{font-size:16px}.pn-em{display:block;color:var(--mu);margin-top:3px;word-break:break-all}.pn-via{color:var(--g);font-size:11px;font-weight:700;margin-top:3px}
.pn-chip{font-size:11px;padding:6px 12px;border-radius:999px;border:1px solid var(--line);background:#161a23;color:#b8c0d0;white-space:nowrap}
.st4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}
.st4 .in{text-align:center}.st4 .in small{justify-content:center}.st4 .in b{font-size:22px}
.pn-box{margin-top:14px;padding:16px;border:1px solid var(--line);border-radius:18px;background:#0d1019}
.pn-box h4{font-size:15px;margin-bottom:6px}
.pn-note{margin-top:14px;display:flex;gap:10px;align-items:flex-start;padding:14px;border:1px solid var(--line);border-radius:14px;background:#12151c;color:#b8c0d0;font-size:13px;line-height:1.7}
.btn.out{background:#2a0a14;border:1px solid #ff2a3d66;color:#ff6b7e}
.pn-lang{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.pn-lang button{padding:16px;border-radius:14px;border:1px solid var(--line);background:#0d1019;font-weight:800;cursor:pointer}
.pn-lang button.on{border-color:var(--g);box-shadow:0 0 16px #19ff6b44;color:var(--g)}
.pn-list{margin-top:12px;display:flex;flex-direction:column;gap:8px}
.pn-list div{padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:#0d1019;font-size:13px;line-height:1.7;color:#cfd5e2}
.pn-tgb{display:flex;align-items:center;gap:12px;padding:14px;margin-top:10px;border:1px solid #29b6f655;border-radius:14px;background:#29b6f614;color:#fff;text-decoration:none}
.pn-tgb b{display:block;font-size:14px}.pn-tgb small{color:#7fd6ff;direction:ltr;display:block;text-align:start}
@media(max-width:600px){.pn-card{grid-template-columns:96px 1fr}.pn-side{padding:8px}.pn-side button{flex-direction:column;gap:5px;font-size:10px;padding:10px 4px;text-align:center}.pn-main{padding:14px}.st4{grid-template-columns:1fr 1fr}.pn-user{flex-wrap:wrap}.pn-tabs button{padding:8px 10px}}
/* search + profile */
.urow{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:16px;background:var(--card);margin-top:10px;cursor:pointer}
.urow:hover{border-color:var(--g)}
.urow .av{width:48px!important;height:48px!important}
.urow b{display:block;font-size:15px}.urow small{color:var(--mu)}
.urow .ic{margin-inline-start:auto;color:var(--mu)}
.ptabs{display:flex;gap:8px;margin:18px 0 6px}
.ptabs button{flex:1;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--card);font-weight:700;cursor:pointer}
.ptabs button.on{border-color:var(--g);color:var(--g)}
`;document.head.appendChild(s)})();

/* ---------- creeper ---------- */
function rng(s){return function(){s=(s*16807)%2147483647;return(s&65535)/65535}}
function tex(x,y,w,h,c,seed){var r=rng(seed),o="",cols=["#4caf50","#43a047","#388e3c","#66bb6a","#2e7d32"],i,j;for(i=0;i<w/c;i++)for(j=0;j<h/c;j++)o+='<rect x="'+(x+i*c)+'" y="'+(y+j*c)+'" width="'+(c+.3)+'" height="'+(c+.3)+'" fill="'+cols[Math.floor(r()*cols.length)]+'"/>';return o}
function creeperSvg(){
  return '<svg class="creeper" viewBox="0 0 200 290" shape-rendering="crispEdges">'+
  '<ellipse cx="100" cy="279" rx="70" ry="8" fill="#000" opacity=".5"/>'+
  tex(60,210,40,60,5,3)+tex(100,210,40,60,5,5)+tex(60,90,80,120,5,11)+tex(60,10,80,80,5,7)+
  '<rect x="99" y="212" width="2" height="58" fill="#0a0a0a" opacity=".5"/><rect x="60" y="208" width="80" height="3" fill="#000" opacity=".3"/>'+
  '<rect class="eye" x="70" y="30" width="20" height="20"/><rect class="eye" x="110" y="30" width="20" height="20"/>'+
  '<g fill="#07090b"><rect x="90" y="50" width="20" height="10"/><rect x="80" y="60" width="40" height="10"/><rect x="80" y="70" width="10" height="10"/><rect x="110" y="70" width="10" height="10"/></g></svg>'
}
function starsHtml(){var o="";for(var i=0;i<46;i++)o+='<i class="lg-star" style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*3).toFixed(1)+'s"></i>';return o}
function toggleLight(){LIT=!LIT;var l=$("lgn");if(l)l.classList.toggle("off",!LIT)}
function setAc(c){AC=c;W("ld_ac",c);var l=$("lgn");if(l)l.style.setProperty("--ac",c);var d=document.querySelectorAll("#lgd i");for(var i=0;i<d.length;i++)d[i].classList.toggle("on",d[i].style.backgroundColor&&rgbHex(d[i].style.backgroundColor)==c)}
function rgbHex(s){var m=s.match(/\d+/g);if(!m)return s;return "#"+m.slice(0,3).map(function(n){return("0"+(+n).toString(16)).slice(-2)}).join("")}

/* ---------- login / signup page ---------- */
function lgField(id,label,ic,type,ph){return `<div class="lg-lr"><span>${label}</span></div><div class="lg-f">${ico(ic)}<input id="${id}" type="${type}" placeholder="${ph}" autocomplete="off" onkeydown="if(event.key==='Enter')authGo()"></div>`}
function lgPass(up){return `<div class="lg-lr"><span>Password</span>${up?"":'<a onclick="forgot()">Forgot?</a>'}</div><div class="lg-f">${ico("lock")}<input id="a_p" type="password" placeholder="Enter password" autocomplete="off" onkeydown="if(event.key==='Enter')authGo()"><button type="button" class="lg-eye" onclick="togglePw()">${ico("eye")}</button></div>`}
function togglePw(){var i=$("a_p");i.type=i.type=="password"?"text":"password"}
function authPage(mode){
  AM=mode||"in";var up=AM=="up";document.body.classList.add("lg-on");
  var dots=["#19ff6b","#ff2a3d","#3da5ff","#ffc107","#b66dff"].map(function(c){return '<i style="background:'+c+'" class="'+(c==AC?"on":"")+'" onclick="setAc(\''+c+'\')"></i>'}).join("");
  $("app").innerHTML='<div class="lgn'+(LIT?'':' off')+'" id="lgn" style="--ac:'+AC+'">'+starsHtml()+
  '<button class="lg-x" onclick="go(\'\')" aria-label="close">×</button><div class="lg-dots" id="lgd">'+dots+'</div>'+
  '<div class="lg-scene" onclick="toggleLight()"><div class="halo"></div><div class="beam"></div>'+creeperSvg()+'<span class="lg-hint">Tap the creeper to toggle the light</span></div>'+
  '<div class="lg-card"><h1>'+(up?"Create account":"Welcome")+'</h1><p class="sub">'+(up?"Sign up to join LD Add-ons":"Sign in to continue to your account")+'</p>'+
  '<div class="lg-tabs"><button class="'+(up?'':'on')+'" onclick="authPage(\'in\')">Sign In</button><button class="'+(up?'on':'')+'" onclick="authPage(\'up\')">Sign Up</button></div>'+
  (up?lgField("a_u","Username","user","text","steve_123"):"")+lgField("a_e","Email","mail","email","Enter your email")+lgPass(up)+
  '<div class="lg-err" id="lg_err"></div><button class="lg-go" id="lgb" onclick="authGo()">'+(up?"Create account":"Sign In")+' '+ico("arrow")+'</button>'+
  '<div class="lg-or">OR CONTINUE WITH</div><div class="lg-soc"><button onclick="social(\'google\')">'+GSVG+' Google</button><button onclick="social(\'apple\')">'+ASVG+' Apple</button></div></div></div>';
}
function loginPage(){authPage("in")}
function signupPage(){authPage("up")}
async function authGo(){
  var er=$("lg_err"),em=$("a_e").value.trim().toLowerCase(),pw=$("a_p").value,b=$("lgb");er.textContent="";
  if(!em||!pw){er.textContent="Enter your email and password";return}
  b.disabled=true;
  try{
    if(AM=="up"){
      var un=$("a_u").value.trim().toLowerCase().replace(/^@/,"");
      if(!/^[a-z0-9_]{3,20}$/.test(un))throw new Error("USERNAME");
      if(await db("GET","usernames/"+un))throw new Error("TAKEN");
      setS(await au("signUp",em,pw));
      await db("PUT","usernames/"+un,S.u);
      await db("PUT","users/"+S.u,{name:un,user:un,tg:"",av:"",prov:"password"});UC={};
    }else setS(await au("signInWithPassword",em,pw));
    await afterAuth()
  }catch(x){er.textContent=errEn(x.message);b.disabled=false}
}
async function afterAuth(){await syncSaved();toast("Logged in");go(isAdmin()?"admin":"me")}
async function forgot(){
  var er=$("lg_err"),em=$("a_e").value.trim();if(!em){er.textContent="Enter your email first";return}
  try{var r=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key="+FBK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestType:"PASSWORD_RESET",email:em})});var j=await r.json();if(j.error)throw new Error(j.error.message);toast("Reset link sent to your email")}catch(x){er.textContent=errEn(x.message)}
}
/* Google / Apple via Firebase SDK (loaded on demand) */
function loadFb(){
  if(FBL)return FBL;
  FBL=new Promise(function(ok,no){var n=0,u=["https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"];
    (function nx(){if(n>=u.length){if(!firebase.apps.length)firebase.initializeApp({apiKey:FBK,authDomain:"ldmods-d5b7b.firebaseapp.com",projectId:"ldmods-d5b7b"});ok(firebase)}else{var s=document.createElement("script");s.src=u[n++];s.onload=nx;s.onerror=function(){FBL=null;no(new Error("Could not load sign-in service"))};document.head.appendChild(s)}})()});
  return FBL
}
async function social(kind){
  var er=$("lg_err");er.textContent="";
  try{
    var fb=await loadFb(),p=kind=="apple"?new fb.auth.OAuthProvider("apple.com"):new fb.auth.GoogleAuthProvider(),r;
    if(kind=="apple"){p.addScope("email");p.addScope("name")}
    try{r=await fb.auth().signInWithPopup(p)}
    catch(x){if(/popup-blocked|operation-not-supported|web-storage-unsupported/.test(x.code||"")){try{sessionStorage.setItem("ld_redir",kind)}catch(e){}await fb.auth().signInWithRedirect(p);return}throw x}
    await finishSocial(r,kind)
  }catch(x){var c=x&&x.code||"";er.textContent=c=="auth/popup-closed-by-user"||c=="auth/cancelled-popup-request"?"":c=="auth/operation-not-allowed"?"This sign-in method is not enabled yet":c=="auth/unauthorized-domain"?"This domain is not authorized in Firebase":(x.message||"Sign-in failed")}
}
async function finishSocial(r,kind){
  var u=r.user,tk=await u.getIdToken();
  setS({idToken:tk,refreshToken:u.refreshToken,localId:u.uid,email:u.email||"",expiresIn:3600});
  await ensureProfile(u,kind);await afterAuth()
}
async function ensureProfile(u,kind){
  var cur=await db("GET","users/"+u.uid);if(cur&&cur.user)return;
  var base=((u.email||u.displayName||"user").split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g,"")||"user").slice(0,14);if(base.length<3)base+="_user";
  var un=base,n=0;while(await db("GET","usernames/"+un)){un=base+Math.floor(Math.random()*9000+1000);if(++n>6)break}
  await db("PUT","usernames/"+un,u.uid);
  await db("PUT","users/"+u.uid,{name:u.displayName||un,user:un,tg:"",av:u.photoURL||"",prov:kind});UC={}
}

/* ---------- saved (synced with account) ---------- */
async function syncSaved(){
  if(!S)return;
  try{var r=await db("GET","saved/"+S.u)||{},k;for(k in r)likes[k]=true;for(k in likes)if(likes[k]&&!r[k])db("PUT","saved/"+S.u+"/"+k,true).catch(function(){});W("ld_likes",likes)}catch(e){}
}
function like(id,e){
  e.stopPropagation();var on=!likes[id];if(on)likes[id]=true;else delete likes[id];W("ld_likes",likes);
  if(S)(on?db("PUT","saved/"+S.u+"/"+id,true):db("DELETE","saved/"+S.u+"/"+id)).catch(function(){});
  route(true)
}

/* ---------- account panel ---------- */
function fld2(id,l,type){return '<label class="fld">'+l+'<input id="'+id+'" type="'+type+'" autocomplete="off"></label>'}
async function mePage(){
  if(!S){go("login");return}
  document.body.classList.remove("lg-on");
  $("app").innerHTML='<div class="empty">'+I("cycle",36)+'</div>';
  var u={},fo={},fg={},sv={},ok=function(p){return p.catch(function(){return null})};
  try{var r=await Promise.all([ok(db("GET","users/"+S.u)),ok(db("GET","followers/"+S.u)),ok(db("GET","follows/"+S.u)),ok(db("GET","saved/"+S.u)),ok(db("GET","verified/"+S.u))]);u=r[0]||{};fo=r[1]||{};fg=r[2]||{};sv=r[3]||{};u.v=!!r[4]}catch(e){}
  var lk=Object.keys(likes).filter(function(k){return likes[k]});
  window._me={u:u,fo:Object.keys(fo).length,fg:Object.keys(fg).length,sv:Math.max(Object.keys(sv).length,lk.length)};
  myAv=u.av||"";panelRender()
}
function pnSec(k){PSEC=k;panelRender()}
function pnTab(k){PTAB=k;panelBody()}
function setLang(l){LANG=l;W("ld_lang",l);panelRender()}
function panelRender(){
  var secs=[["acc","user","sideAccount"],["lang","globe","sideLang"],["about","info","sideAbout"],["terms","doc","sideTerms"],["priv","lock","sidePriv"]];
  var side=secs.map(function(s){return '<button class="'+(PSEC==s[0]?"on":"")+'" onclick="pnSec(\''+s[0]+'\')">'+ico(s[1],18)+'<span>'+t(s[2])+'</span></button>'}).join("");
  $("app").innerHTML='<div class="pn" dir="'+(LANG=="ar"?"rtl":"ltr")+'"><div class="pn-top"><button class="pn-back" onclick="go(\'\')">'+(LANG=="ar"?"→ ":"← ")+t("back")+'</button><h2>'+t("panelTitle")+'</h2></div><div class="pn-card"><div class="pn-side">'+side+'</div><div class="pn-main" id="pnm"></div></div></div>';
  panelBody()
}
function profileHtml(u,pv){
  var me=window._me,pt=pv=="google"?"Google":pv=="apple"?"Apple":t("viaEmail");
  var h='<div class="pn-user"><div id="pn_av">'+avHtml({av:myAv},64)+'</div><div style="min-width:0;flex:1"><b>'+esc(u.name||"—")+(u.v?vbadge():"")+'</b><div class="pu">@'+esc(u.user||"")+'</div><small class="pn-em" dir="ltr">'+esc(S.e)+'</small><div class="pn-via">'+t("via")+' '+pt+' ✓</div></div><span class="pn-chip">'+(u.v?t("verified"):t("notVerified"))+'</span></div>';
  var np=u.user?mods.filter(function(m){return m.pub==u.user}).length:0;
  h+='<div class="st4"><div class="in c-b"><small>'+t("followers")+'</small><b>'+me.fo+'</b></div><div class="in c-g"><small>'+t("following")+'</small><b>'+me.fg+'</b></div><div class="in c-y"><small>'+t("posts")+'</small><b>'+np+'</b></div><div class="in c-r"><small>'+t("saved")+'</small><b>'+me.sv+'</b></div></div>';
  h+='<div class="pn-box"><label class="fld">'+t("photo")+'<input id="m_i" type="file" accept="image/*"></label>'+fld2("m_n",t("dname"),"text")+fld2("m_u",t("uname"),"text")+fld2("m_t",t("tg"),"text")+'<div class="err" id="pn_err"></div><div class="row" style="margin-top:12px"><button class="btn g" id="msv" onclick="saveMe2()">'+t("save")+'</button>'+(u.user?'<button class="btn d" onclick="go(\'u-'+esc(u.user)+'\')">'+t("viewProf")+'</button>':'')+'</div></div>';
  h+='<div style="text-align:center;margin-top:16px"><button class="btn out" onclick="logout()">'+ico("logout",16)+' '+t("logout")+'</button></div>';
  return h
}
function secHtml(u,pv){
  if(pv=="google"||pv=="apple")return '<div class="pn-note">'+ico("shield",20)+'<span>'+t("provNote").split("{p}").join(pv=="google"?"Google":"Apple")+'</span></div>';
  return '<div class="pn-box"><h4>'+t("changeEmail")+'</h4><div class="pn-p">'+t("curEmail")+': <b dir="ltr">'+esc(S.e)+'</b></div>'+fld2("s_cp1",t("curPass"),"password")+fld2("s_ne",t("newEmail"),"email")+'<div class="err" id="pn_e1"></div><button class="btn g" style="margin-top:12px" onclick="secEmail()">'+t("changeEmail")+'</button></div>'+
  '<div class="pn-box"><h4>'+t("changePass")+'</h4>'+fld2("s_cp2",t("curPass"),"password")+fld2("s_np",t("newPass"),"password")+'<div class="err" id="pn_e2"></div><button class="btn g" style="margin-top:12px" onclick="secPass()">'+t("changePass")+'</button></div>'
}
function panelBody(){
  var m=$("pnm");if(!m)return;var u=window._me.u,pv=u.prov||"password",h="";
  if(PSEC=="acc"){
    h='<h3 class="pn-h">'+t("mgmt")+'</h3><p class="pn-p">'+t("mgmtSub")+'</p><div class="pn-tabs"><button class="'+(PTAB=="profile"?"on":"")+'" onclick="pnTab(\'profile\')">'+ico("user",14)+' '+t("tabProfile")+'</button><button class="'+(PTAB=="sec"?"on":"")+'" onclick="pnTab(\'sec\')">'+ico("shield",14)+' '+t("tabSec")+'</button></div>';
    h+=PTAB=="profile"?profileHtml(u,pv):secHtml(u,pv)
  }else if(PSEC=="lang"){
    h='<h3 class="pn-h">'+t("langTitle")+'</h3><p class="pn-p">'+t("langNote")+'</p><div class="pn-lang"><button class="'+(LANG=="ar"?"on":"")+'" onclick="setLang(\'ar\')">العربية</button><button class="'+(LANG=="en"?"on":"")+'" onclick="setLang(\'en\')">English</button></div>'
  }else if(PSEC=="about"){
    h='<h3 class="pn-h">'+t("aboutTitle")+'</h3><p class="pn-p">'+t("aboutText")+'</p>'+
    [["ld_adddon","chUpd"],["ld_adddons","chNot"],["s_xns","dev"]].map(function(c){return '<a class="pn-tgb" href="https://t.me/'+c[0]+'" target="_blank" rel="noopener">'+TGSVG+'<span><b>'+t(c[1])+'</b><small>@'+c[0]+'</small></span></a>'}).join("")
  }else{
    var k=PSEC=="terms"?"terms":"priv";
    h='<h3 class="pn-h">'+t(k+"Title")+'</h3><div class="pn-list">'+t(k).map(function(x,i){return '<div>'+(i+1)+'. '+x+'</div>'}).join("")+'</div>'
  }
  m.innerHTML=h;
  if(PSEC=="acc"&&PTAB=="profile"){
    $("m_n").value=u.name||"";$("m_u").value=u.user||"";$("m_t").value=u.tg||"";
    $("m_i").onchange=async function(){var f=this.files[0];if(f){var d=await rd(f,160);if(d){myAv=d;$("pn_av").innerHTML=avHtml({av:d},64)}}}
  }
}
async function saveMe2(){
  var er=$("pn_err"),n=$("m_n").value.trim(),un=$("m_u").value.trim().toLowerCase().replace(/^@/,""),tg=$("m_t").value.trim().replace(/^@/,"");
  if(!/^[a-z0-9_]{3,20}$/.test(un)){er.textContent=t("eUser");return}
  if(!n){er.textContent=t("eName");return}
  var b=$("msv");b.disabled=true;er.textContent="";
  try{
    var old=(await db("GET","users/"+S.u))||{},ex=await db("GET","usernames/"+un);
    if(ex&&ex!==S.u){er.textContent=t("eTaken");b.disabled=false;return}
    if(!ex)await db("PUT","usernames/"+un,S.u);
    if(old.user&&old.user!==un)try{await db("DELETE","usernames/"+old.user)}catch(e){}
    await db("PUT","users/"+S.u,{name:n,user:un,tg:tg,av:myAv||"",prov:old.prov||"password"});UC={};SU=null;toast(t("savedOk"));mePage()
  }catch(e){er.textContent=t("eFail")+e.message;b.disabled=false}
}
async function accUpdate(body){
  var r=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key="+FBK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}),k=await r.json();
  if(k.error)throw new Error(k.error.message);return k
}
async function secEmail(){
  var er=$("pn_e1"),cp=$("s_cp1").value,ne=$("s_ne").value.trim().toLowerCase();er.textContent="";
  if(!cp||!ne){er.textContent=t("eFill");return}
  try{var j=await au("signInWithPassword",S.e,cp),k=await accUpdate({idToken:j.idToken,email:ne,returnSecureToken:true});setS(k);toast(t("done"));mePage()}catch(x){er.textContent=perr(x.message)}
}
async function secPass(){
  var er=$("pn_e2"),cp=$("s_cp2").value,np=$("s_np").value;er.textContent="";
  if(!cp||!np){er.textContent=t("eFill");return}
  try{var j=await au("signInWithPassword",S.e,cp),k=await accUpdate({idToken:j.idToken,password:np,returnSecureToken:true});setS(k);toast(t("done"));mePage()}catch(x){er.textContent=perr(x.message)}
}

/* ---------- public profile (posts + saved + follow) ---------- */
async function profilePage(u){
  $("app").innerHTML='<div class="empty">'+I("cycle",36)+'</div>';var x;
  try{x=await getU(u)}catch(e){$("app").innerHTML='<div class="empty">Could not connect to Firebase</div>';return}
  if(!x){$("app").innerHTML='<div class="empty">'+I("creeper",48)+'<p style="margin-top:10px">Account not found</p></div>';return}
  var ok=function(p){return p.catch(function(){return null})};
  var r=await Promise.all([ok(db("GET","followers/"+x.uid)),ok(db("GET","follows/"+x.uid)),ok(db("GET","saved/"+x.uid))]);
  var fol=r[0]||{},fg=r[1]||{},sv=r[2]||{},isF=!!(S&&fol[S.u]),n=Object.keys(fol).length,mine=S&&S.u===x.uid;
  if(mine)for(var k in likes)if(likes[k])sv[k]=true;
  var posts=mods.filter(function(m){return m.pub==u}),sm=mods.filter(function(m){return sv[m.id]});
  window._pp={posts:posts,saved:sm};
  var h='<div class="box prof">'+avHtml(x,96)+'<h2 class="pn" style="justify-content:center;margin-bottom:2px">'+esc(x.name||u)+(x.v?vbadge():"")+'</h2><div class="pu">@'+esc(u)+'</div>'+(x.tg?'<div style="margin-top:8px"><a class="tgi" href="https://t.me/'+esc(x.tg)+'" target="_blank" rel="noopener" style="color:#29b6f6;text-decoration:none"><svg viewBox="0 0 24 24"><path d="M9.8 15.6l-.4 4.2c.6 0 .9-.3 1.2-.6l2.9-2.7 6 4.4c1.1.6 1.9.3 2.2-1L23.9 4c.4-1.6-.6-2.3-1.7-1.9L1.5 10c-1.5.6-1.5 1.5-.3 1.9l5.3 1.7L18.8 6c.6-.4 1.1-.2.7.2z"/></svg> @'+esc(x.tg)+'</a></div>':'')+
  '<div class="st4"><div class="in c-b"><small>Followers</small><b id="fn">'+n+'</b></div><div class="in c-g"><small>Following</small><b>'+Object.keys(fg).length+'</b></div><div class="in c-y"><small>Posts</small><b>'+posts.length+'</b></div><div class="in c-r"><small>Saved</small><b>'+sm.length+'</b></div></div>'+
  '<div class="row" style="margin-top:12px;justify-content:center">'+(mine?'<button class="btn d" onclick="go(\'me\')">'+I("pencil",18)+' Edit profile</button>':'<button class="btn g" id="fb" onclick="toggleF(\''+x.uid+'\','+n+')">'+(isF?I("check",18)+" Following":"+ Follow")+'</button>')+'</div></div>'+
  '<div class="ptabs"><button id="pt_p" class="on" onclick="pTab(\'posts\')">Posts ('+posts.length+')</button><button id="pt_s" onclick="pTab(\'saved\')">Saved ('+sm.length+')</button></div><div id="ptab"></div>';
  $("app").innerHTML=h;window._fs={f:isF,n:n};pTab("posts")
}
function pTab(k){
  var l=window._pp[k],a=$("pt_p"),b=$("pt_s");if(!a)return;
  a.classList.toggle("on",k=="posts");b.classList.toggle("on",k=="saved");
  $("ptab").innerHTML=l.length?'<div class="grid">'+l.map(card).join("")+'</div>':'<div class="empty">'+I("creeper",40)+'<p style="margin-top:8px">Nothing here yet</p></div>';
  decorPubs()
}

/* ---------- search (people + mods) ---------- */
function searchPage(){
  document.body.classList.remove("lg-on");
  $("app").innerHTML='<h2>'+ico("search",26)+' Search</h2><div class="search">'+ico("search",22)+'<input id="sq" placeholder="Search people by @username, or mods..." autocomplete="off"></div><div id="sr"><div class="empty">'+I("creeper",44)+'<p style="margin-top:10px">Type a username or a mod name</p></div></div>';
  var i=$("sq");i.oninput=function(){clearTimeout(STO);STO=setTimeout(function(){doSearch(i.value)},250)};i.focus()
}
async function doSearch(v){
  var q2=v.trim().toLowerCase().replace(/^@/,""),box=$("sr");if(!box)return;
  if(!q2){box.innerHTML='<div class="empty">'+I("creeper",44)+'<p style="margin-top:10px">Type a username or a mod name</p></div>';return}
  var ms=mods.filter(function(m){return(m.title+" "+m.sub+" "+(m.pub||"")).toLowerCase().indexOf(q2)>-1}).slice(0,12);
  if(!SU){try{var tk=await tok(),r=await fetch(FBDB+"/usernames.json?shallow=true"+(tk?"&auth="+tk:""));if(r.ok)SU=Object.keys(await r.json()||{})}catch(e){}}
  var us=(SU||[]).filter(function(u){return u.indexOf(q2)>-1}).sort(function(a,b){return(a.indexOf(q2)==0?0:1)-(b.indexOf(q2)==0?0:1)||a.length-b.length}).slice(0,15);
  var xs=await Promise.all(us.map(function(u){return getU(u).catch(function(){return null})}));
  if($("sq")&&$("sq").value.trim().toLowerCase().replace(/^@/,"")!==q2)return;
  var h="";xs=xs.filter(Boolean);
  if(xs.length)h+='<h2>'+I("totem",26)+' People</h2>'+xs.map(function(x){return '<div class="urow" onclick="go(\'u-'+esc(x.user)+'\')">'+avHtml(x,48)+'<div style="min-width:0"><b>'+esc(x.name||x.user)+(x.v?vbadge():"")+'</b><small>@'+esc(x.user)+'</small></div>'+ico("chev",18)+'</div>'}).join("");
  if(ms.length)h+='<h2>'+I("creeper",26)+' Mods</h2><div class="grid">'+ms.map(card).join("")+'</div>';
  box.innerHTML=h||'<div class="empty">'+I("creeper",44)+'<p style="margin-top:10px">No results</p></div>';decorPubs()
}

/* ---------- menu, header button, router ---------- */
function menu(){
  $("menu").innerHTML='<button onclick="go(\'\')">'+I("grass",20)+' Home</button><button onclick="go(\'search\')">'+ico("search",20)+' Search</button>'+
  (S?'<button onclick="go(\'me\')">'+I("shield",20)+' Account</button>':'<button onclick="go(\'login\')">'+I("key",20)+' Log in</button><button onclick="go(\'signup\')">'+I("star",20)+' Sign up</button>')+
  (isAdmin()?'<button onclick="go(\'admin\')">'+I("anvil",20)+' Admin panel</button>':'')+(S?'<button onclick="logout()">'+I("door",20)+' Log out</button>':'')
}
(function(){var b=document.createElement("button");b.className="ibtn";b.setAttribute("aria-label","search");b.innerHTML=ico("search",22);b.onclick=function(){go("search")};document.querySelector("header").insertBefore(b,$("mbtn"))})();
var _rt=route;
route=function(keep){
  document.body.classList.remove("lg-on");
  var h=location.hash.replace("#","");
  if(h=="search"){searchPage();setNav(h);if(!keep)scrollTo(0,0);return}
  _rt(keep)
};
try{var rk=sessionStorage.getItem("ld_redir");if(rk){sessionStorage.removeItem("ld_redir");loadFb().then(function(fb){return fb.auth().getRedirectResult()}).then(function(r){if(r&&r.user)finishSocial(r,rk)}).catch(function(){})}}catch(e){}
if(S)syncSaved();

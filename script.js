const jobs = [
 {id:1,title:"Staff Administrasi Kesehatan",company:"RSU Medika Utama",initial:"MU",logo:"",city:"Samarinda",major:["Administrasi Kesehatan","Manajemen Rumah Sakit"],type:"Penuh waktu",typeKey:"full",salary:"Rp4–5 jt",posted:"2 hari lalu",deadline:"30 Oktober 2025",description:"Mendukung kegiatan administrasi pelayanan kesehatan, pengelolaan dokumen, serta koordinasi data operasional fasilitas.",requirements:["Pendidikan D3/S1 Administrasi Kesehatan, Manajemen Rumah Sakit, atau bidang relevan.","Mampu mengoperasikan Microsoft Office dan mengelola dokumen.","Teliti, komunikatif, dan mampu bekerja dalam tim."]},
 {id:2,title:"Petugas Rekam Medis",company:"Klinik Sehat Sentosa",initial:"SS",logo:"cream",city:"Balikpapan",major:["Rekam Medis"],type:"Kontrak",typeKey:"contract",salary:"Rp3–4 jt",posted:"3 hari lalu",deadline:"5 November 2025",description:"Bertanggung jawab pada pencatatan, pengarsipan, dan pengelolaan informasi rekam medis pasien sesuai prosedur fasilitas.",requirements:["Pendidikan D3 Rekam Medis dan Informasi Kesehatan.","Memahami klasifikasi dan pengkodean diagnosis menjadi nilai tambah.","Menjaga kerahasiaan informasi pasien dan teliti dalam bekerja."]},
 {id:3,title:"Perawat Pelaksana",company:"RSIA Bunda Borneo",initial:"BB",logo:"mint",city:"Bontang",major:["Keperawatan"],type:"Penuh waktu",typeKey:"full",salary:"Rp4–5 jt",posted:"5 hari lalu",deadline:"10 November 2025",description:"Memberikan asuhan keperawatan yang aman, profesional, dan berorientasi pada kebutuhan pasien.",requirements:["Pendidikan D3/S1 Keperawatan.","Memiliki STR aktif sesuai ketentuan.","Memiliki komunikasi baik, empati, dan mampu bekerja bergiliran."]},
 {id:4,title:"Staf Administrasi Rumah Sakit",company:"RS Harapan Keluarga",initial:"HK",logo:"lilac",city:"Kutai Kartanegara",major:["Administrasi Kesehatan","Rekam Medis","Manajemen Rumah Sakit"],type:"Paruh waktu",typeKey:"part",salary:"Rp2–3 jt",posted:"1 minggu lalu",deadline:"12 November 2025",description:"Membantu proses administrasi unit layanan, pembaruan data, dan koordinasi dokumen internal rumah sakit.",requirements:["Lulusan Administrasi Kesehatan, Rekam Medis, atau Manajemen Rumah Sakit.","Mampu bekerja dengan data dan aplikasi perkantoran.","Terorganisir, teliti, dan bertanggung jawab."]},
 {id:5,title:"Tenaga Teknis Kefarmasian",company:"Apotek Keluarga",initial:"AK",logo:"peach",city:"Berau",major:["Farmasi"],type:"Kontrak",typeKey:"contract",salary:"Rp3–4 jt",posted:"1 minggu lalu",deadline:"15 November 2025",description:"Mendukung pelayanan kefarmasian, penataan persediaan obat, dan pelayanan informasi dasar sesuai kewenangan.",requirements:["Pendidikan D3 Farmasi atau sesuai kualifikasi posisi.","Memiliki STRTTK aktif bila dipersyaratkan.","Ramah, cermat, dan memahami pengelolaan stok."]},
 {id:6,title:"Analis Laboratorium Medis",company:"Laboratorium Diagnos",initial:"LD",logo:"",city:"Penajam Paser Utara",major:["Teknologi Laboratorium Medis"],type:"Penuh waktu",typeKey:"full",salary:"Rp4–5 jt",posted:"2 minggu lalu",deadline:"20 November 2025",description:"Melakukan kegiatan teknis pemeriksaan laboratorium dan memastikan mutu proses sesuai standar operasional.",requirements:["Pendidikan D3/D4 Teknologi Laboratorium Medis.","Memiliki STR aktif sesuai ketentuan.","Memahami prosedur keselamatan dan pengendalian mutu."]}
];
const $ = (id) => document.getElementById(id);
let activeType = "all", visibleCount = 6, selectedJob = null;
function filteredJobs(){
 const q=$("keyword").value.trim().toLowerCase(), city=$("cityFilter").value, major=$("majorFilter").value;
 return jobs.filter(j=>(!q||[j.title,j.company,j.city,...j.major].join(" ").toLowerCase().includes(q))&&(!city||j.city===city)&&(!major||j.major.includes(major))&&(activeType==="all"||j.typeKey===activeType));
}
function renderJobs(){
 const found=filteredJobs(), shown=found.slice(0,visibleCount);
 $("resultCount").textContent=found.length;
 $("jobsGrid").innerHTML=shown.map(j=>`<article class="job-card" tabindex="0" role="button" aria-label="Lihat detail ${j.title}" data-id="${j.id}">
 <div class="job-top"><div class="company-logo ${j.logo}">${j.initial}</div><span class="job-type">${j.type}</span></div>
 <h3>${j.title}</h3><p class="company-name">${j.company}</p>
 <div class="job-meta"><span><i>⌖</i>${j.city}</span><span><i>▤</i>${j.major[0]}</span></div>
 <div class="job-bottom"><span class="job-salary">${j.salary} <small>/ bulan</small></span><span class="job-detail-link">Detail <span>↗</span></span></div></article>`).join("");
 $("emptyState").hidden=found.length!==0;
 $("loadMore").style.display=found.length>visibleCount?"inline-flex":"none";
 document.querySelectorAll(".job-card").forEach(card=>{card.addEventListener("click",()=>openJob(Number(card.dataset.id)));card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openJob(Number(card.dataset.id));}})});
}
function openJob(id){
 selectedJob=jobs.find(j=>j.id===id); if(!selectedJob)return;
 const j=selectedJob;
 $("modalContent").innerHTML=`<div class="job-top"><div class="company-logo ${j.logo}">${j.initial}</div><span class="job-type">${j.type}</span></div>
 <h2 id="modalTitle">${j.title}</h2><p class="company-name">${j.company}</p>
 <div class="modal-tags"><span class="modal-tag">⌖ ${j.city}</span><span class="modal-tag">▤ ${j.major.join(", ")}</span><span class="modal-tag">◷ ${j.salary}/bulan</span></div>
 <h4>Deskripsi pekerjaan</h4><p>${j.description}</p><h4>Kualifikasi</h4><ul>${j.requirements.map(r=>`<li>${r}</li>`).join("")}</ul>
 <div class="modal-form"><h4>Formulir minat melamar</h4><p>Form ini hanya simulasi untuk demonstrasi. Data tidak dikirim ke server.</p>
 <form id="applyForm"><label for="applicantName">Nama lengkap</label><input id="applicantName" name="name" required placeholder="Masukkan nama lengkap">
 <label for="applicantEmail">Email aktif</label><input id="applicantEmail" name="email" type="email" required placeholder="nama@email.com">
 <label for="applicantMajor">Jurusan / pendidikan</label><select id="applicantMajor" required><option value="">Pilih jurusan</option>${["Administrasi Kesehatan","Rekam Medis","Keperawatan","Kebidanan","Farmasi","Teknologi Laboratorium Medis","Gizi","Fisioterapi","Kedokteran","Manajemen Rumah Sakit"].map(m=>`<option ${j.major.includes(m)?"selected":""}>${m}</option>`).join("")}</select>
 <button class="btn btn-primary" type="submit">Kirim minat melamar <span>→</span></button></form></div>`;
 $("jobModal").hidden=false;document.body.style.overflow="hidden";
 $("applyForm").addEventListener("submit",e=>{e.preventDefault();const name=$("applicantName").value.trim();$("jobModal").hidden=true;document.body.style.overflow="";showToast(`Terima kasih, ${name}. Simulasi lamaran berhasil dicatat.`)});
}
function closeModal(){$("jobModal").hidden=true;document.body.style.overflow=""}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200)}
function clearFilters(){$("keyword").value="";$("cityFilter").value="";$("majorFilter").value="";activeType="all";visibleCount=6;document.querySelectorAll(".filter-pill").forEach(b=>b.classList.toggle("selected",b.dataset.type==="all"));renderJobs()}
$("searchBtn").addEventListener("click",()=>{visibleCount=6;renderJobs();$("lowongan").scrollIntoView({behavior:"smooth"})});
$("keyword").addEventListener("input",()=>{visibleCount=6;renderJobs()});$("cityFilter").addEventListener("change",renderJobs);$("majorFilter").addEventListener("change",renderJobs);
document.querySelectorAll(".filter-pill").forEach(b=>b.addEventListener("click",()=>{activeType=b.dataset.type;visibleCount=6;document.querySelectorAll(".filter-pill").forEach(x=>x.classList.toggle("selected",x===b));renderJobs()}));
$("loadMore").addEventListener("click",()=>{visibleCount+=3;renderJobs()});$("resetFilters").addEventListener("click",e=>{e.preventDefault();clearFilters()});$("clearSearch").addEventListener("click",clearFilters);
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{$("majorFilter").value=b.dataset.major;activeType="all";document.querySelectorAll(".filter-pill").forEach(x=>x.classList.toggle("selected",x.dataset.type==="all"));visibleCount=6;renderJobs();$("lowongan").scrollIntoView({behavior:"smooth"})}));
$("closeModal").addEventListener("click",closeModal);$("jobModal").addEventListener("click",e=>{if(e.target===$("jobModal"))closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("menuToggle").addEventListener("click",()=>{const open=$("navLinks").classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open))});document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{$("navLinks").classList.remove("open");$("menuToggle").setAttribute("aria-expanded","false")}));
renderJobs();

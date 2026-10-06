const jobs = [
  {id:1,title:"Staff Administrasi Kesehatan",company:"RSU Medika Utama",location:"Samarinda",major:"Administrasi Kesehatan",type:"Full Time",salary:"Rp4,5 - 6,0 jt",initial:"MU",requirements:["Minimal D3/S1 Administrasi Kesehatan atau bidang terkait","Menguasai administrasi pelayanan kesehatan","Mampu menggunakan Microsoft Office","Komunikatif dan teliti"]},
  {id:2,title:"Petugas Rekam Medis",company:"Klinik Sehat Sentosa",location:"Balikpapan",major:"Rekam Medis",type:"Full Time",salary:"Rp4,0 - 5,5 jt",initial:"KS",requirements:["Minimal D3 Rekam Medis","Memahami sistem pengelolaan rekam medis","Memiliki STR aktif menjadi nilai tambah","Teliti dan bertanggung jawab"]},
  {id:3,title:"Perawat Pelaksana",company:"RSIA Bunda Borneo",location:"Bontang",major:"Keperawatan",type:"Kontrak",salary:"Rp4,5 - 6,5 jt",initial:"BB",requirements:["Minimal D3/S1 Keperawatan","Memiliki STR dan sertifikat kompetensi","Mampu bekerja dalam tim","Bersedia bekerja shift"]},
  {id:4,title:"Staf Administrasi Rumah Sakit",company:"RS Harapan Keluarga",location:"Kutai Kartanegara",major:"Manajemen Rumah Sakit",type:"Full Time",salary:"Rp4,2 - 5,8 jt",initial:"HK",requirements:["Minimal D3/S1 Manajemen Rumah Sakit","Memahami administrasi rumah sakit","Menguasai komputer","Memiliki kemampuan komunikasi yang baik"]},
  {id:5,title:"Tenaga Teknis Kefarmasian",company:"Apotek Keluarga",location:"Berau",major:"Farmasi",type:"Full Time",salary:"Rp4,0 - 5,2 jt",initial:"AK",requirements:["Minimal D3 Farmasi","Memiliki STRTTK aktif","Memahami pelayanan kefarmasian","Jujur dan disiplin"]},
  {id:6,title:"Analis Laboratorium Medis",company:"Laboratorium Diagnos",location:"Penajam Paser Utara",major:"Teknologi Laboratorium Medis",type:"Kontrak",salary:"Rp4,3 - 5,7 jt",initial:"LD",requirements:["Minimal D3 Teknologi Laboratorium Medis","Memiliki STR aktif","Memahami prosedur pemeriksaan laboratorium","Teliti dan mampu bekerja di bawah tekanan"]},
  {id:7,title:"Bidan Pelaksana",company:"Klinik Ibu Sehat",location:"Samarinda",major:"Kebidanan",type:"Part Time",salary:"Rp3,8 - 5,0 jt",initial:"IS",requirements:["Minimal D3 Kebidanan","Memiliki STRB aktif","Mampu memberikan pelayanan kebidanan","Ramah dan komunikatif"]},
  {id:8,title:"Nutrisionis",company:"Puskesmas Sehat Bersama",location:"Balikpapan",major:"Gizi",type:"Kontrak",salary:"Rp4,1 - 5,4 jt",initial:"SB",requirements:["Minimal D3/S1 Gizi","Memahami konseling gizi","Mampu membuat pencatatan dan pelaporan","Mampu bekerja lintas program"]},
  {id:9,title:"Petugas Administrasi Klaim",company:"RS Borneo Sejahtera",location:"Samarinda",major:"Administrasi Kesehatan",type:"Full Time",salary:"Rp4,2 - 5,6 jt",initial:"BS",requirements:["Minimal D3 Administrasi Kesehatan","Memahami administrasi klaim layanan","Menguasai spreadsheet","Teliti dan mampu bekerja dengan target"]}
];

const categories = [
  ["🗂️","Administrasi Kesehatan"],["📋","Rekam Medis"],["🩺","Keperawatan"],["💊","Farmasi"],["👶","Kebidanan"],["🧪","Teknologi Laboratorium Medis"],["🥗","Gizi"],["🏥","Manajemen Rumah Sakit"]
];

const grid = document.getElementById("jobGrid");
const empty = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const modal = document.getElementById("jobModal");
const modalBody = document.getElementById("modalBody");
const applyModal = document.getElementById("applyModal");
const applyForm = document.getElementById("applyForm");
const successBox = document.getElementById("successBox");

function renderJobs(list = jobs){
  grid.innerHTML = "";
  empty.style.display = list.length ? "none" : "block";
  resultCount.textContent = `${list.length} lowongan ditemukan`;
  list.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <div class="job-top"><div class="company-logo">${job.initial}</div><span class="badge">${job.type}</span></div>
      <h3>${job.title}</h3><div class="company">${job.company}</div>
      <div class="job-meta"><span>📍 ${job.location}</span><span>🎓 ${job.major}</span></div>
      <div class="job-footer"><span class="salary">${job.salary}</span><button class="detail-btn" data-job="${job.id}">Lihat Detail →</button></div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll(".detail-btn").forEach(btn => btn.addEventListener("click", () => showJob(Number(btn.dataset.job))));
}

function filterJobs(){
  const keyword = document.getElementById("keyword").value.toLowerCase().trim();
  const location = document.getElementById("location").value;
  const major = document.getElementById("major").value;
  const type = document.getElementById("jobType").value;
  const result = jobs.filter(job =>
    (!keyword || `${job.title} ${job.company} ${job.major} ${job.location}`.toLowerCase().includes(keyword)) &&
    (!location || job.location === location) && (!major || job.major === major) && (!type || job.type === type)
  );
  renderJobs(result);
}

function showJob(id){
  const job = jobs.find(item => item.id === id); if(!job) return;
  modalBody.innerHTML = `
    <span class="eyebrow">${job.type.toUpperCase()}</span><h2>${job.title}</h2>
    <div class="modal-company">${job.company} · ${job.location}</div>
    <div class="job-meta"><span>🎓 ${job.major}</span><span>💰 ${job.salary}</span></div>
    <div class="modal-section"><h4>Persyaratan</h4><ul>${job.requirements.map(r => `<li>${r}</li>`).join("")}</ul></div>
    <div class="modal-section"><h4>Tentang Lamaran</h4><p>Isi formulir singkat untuk melakukan simulasi pengajuan lamaran pada website ini.</p></div>
    <button class="btn btn-primary" id="applyNow" style="margin-top:20px">Lamar Sekarang →</button>`;
  document.getElementById("applyNow").addEventListener("click", () => openApply(job));
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
}

function openApply(job){
  modal.classList.remove("show");
  document.getElementById("applyJobId").value = job.id;
  document.getElementById("applyTitle").textContent = `Lamar: ${job.title}`;
  applyForm.hidden = false; successBox.hidden = true; applyForm.reset();
  document.getElementById("applyJobId").value = job.id;
  applyModal.classList.add("show"); applyModal.setAttribute("aria-hidden","false");
}

function closeModal(target){ target.classList.remove("show"); target.setAttribute("aria-hidden","true"); }

document.getElementById("searchBtn").addEventListener("click", filterJobs);
["keyword","location","major","jobType"].forEach(id => document.getElementById(id).addEventListener("change", filterJobs));
document.getElementById("keyword").addEventListener("input", filterJobs);
document.getElementById("keyword").addEventListener("keydown", e => { if(e.key === "Enter") filterJobs(); });
document.getElementById("resetBtn").addEventListener("click", () => { ["keyword","location","major","jobType"].forEach(id => document.getElementById(id).value = ""); renderJobs(); });
document.getElementById("modalClose").addEventListener("click", () => closeModal(modal));
document.getElementById("applyClose").addEventListener("click", () => closeModal(applyModal));
document.getElementById("successClose").addEventListener("click", () => closeModal(applyModal));
[modal,applyModal].forEach(m => m.addEventListener("click", e => { if(e.target === m) closeModal(m); }));
document.addEventListener("keydown", e => { if(e.key === "Escape"){ closeModal(modal); closeModal(applyModal); } });

document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open")));

const categoryGrid = document.getElementById("categoryGrid");
categories.forEach(([icon,name]) => {
  const item = document.createElement("div"); item.className = "category-card";
  const count = jobs.filter(j => j.major === name).length;
  item.innerHTML = `<div class="category-icon">${icon}</div><h3>${name}</h3><p>${count} lowongan demo</p>`;
  item.addEventListener("click", () => { document.getElementById("major").value = name; filterJobs(); document.getElementById("lowongan").scrollIntoView({behavior:"smooth"}); });
  categoryGrid.appendChild(item);
});

applyForm.addEventListener("submit", e => {
  e.preventDefault();
  applyForm.hidden = true; successBox.hidden = false;
});

renderJobs();

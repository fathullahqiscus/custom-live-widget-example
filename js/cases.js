/**
 * cases.js
 * ========
 * Registry data untuk dashboard showcase kustomisasi widget.
 * Single source of truth: dipakai dashboard.js (render kartu/kategori)
 * dan config.js (resolve config aktual widget berdasarkan ?case=).
 * Harus di-load PALING AWAL, sebelum config.js.
 */

var CASE_CATEGORIES = [
  { id: "header-branding", label: "Header & Branding" },
  { id: "login-behavior", label: "Login Form Behavior" },
  { id: "chat-room-style", label: "Chat Room Styling" },
];

var CASES = [
  {
    id: "default",
    categoryId: "header-branding",
    label: "Default",
    tagline: "Widget apa adanya, tanpa kustomisasi",
    description: [
      "Widget Qiscus Omnichannel standar, tanpa override tampilan",
      "Form login pre-chat ditampilkan apa adanya (tidak di-bypass)",
      "Warna & layout header mengikuti default platform",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
    },
  },
  {
    id: "q1-title-button-color",
    categoryId: "header-branding",
    label: "Q1 · Warna Judul & Tombol Terpisah",
    tagline: "Judul #000000, tombol Start Chat #0043CE — tidak lagi satu warna",
    description: [
      "Default platform: warna teks judul header ikut warna tombol utama (satu setting warna di dashboard Qiscus)",
      "Dengan custom CSS, keduanya bisa diatur independen: judul memakai #000000, tombol memakai #0043CE",
      "Custom CSS dikirim ke iframe form login Qiscus via opsi widgetCustomCSS / postMessage — tanpa menyentuh internal widget",
    ],
    overrides: {
      loginHeader: {
        titleColor: "#000000",
        buttonColor: "#0043CE",
        allowLongTitle: false,
        bannerImageUrl: "",
        bannerAspectRatio: "2.5 / 1",
      },
      enableLoginBypass: false,
    },
    snippets: [
      {
        title: "Custom CSS — warna judul & tombol terpisah",
        code:
          "/* Judul header form login → hitam */\n" +
          ".qismo-login-form__header,\n" +
          ".qismo-login-form__header h3 {\n" +
          "  color: #000000 !important;\n" +
          "}\n\n" +
          "/* Tombol Start Chat → biru brand */\n" +
          ".qcw-cs-submit-form.qismo-login-btn {\n" +
          "  background-color: #0043CE !important;\n" +
          "}",
      },
      {
        title: "Cara mengirim custom CSS ke widget",
        code:
          "new Qismo(\"YOUR_APP_ID\", {\n" +
          "  options: {\n" +
          "    channel_id: YOUR_CHANNEL_ID,\n" +
          "    widgetCustomCSS: customCss, // string CSS di atas\n" +
          "  },\n" +
          "});\n\n" +
          "// Form login dirender di iframe terpisah — kirim CSS-nya juga ke sana:\n" +
          "var iframe = document.getElementById(\"qcw-login-form-iframe\");\n" +
          "iframe.contentWindow.postMessage(\n" +
          "  { event_name: \"custom-css\", css: customCss },\n" +
          "  \"*\"\n" +
          ");",
      },
    ],
  },
  {
    id: "q2-long-title",
    categoryId: "header-branding",
    label: "Q2 · Judul Header 35 Karakter",
    tagline: "Judul lebih panjang dari batas default 20 karakter, wrap rapi",
    description: [
      "Default platform: judul header form login dibatasi ±20 karakter (input di dashboard Qiscus)",
      "Custom CSS mengganti teks judul dengan versi panjang (demo ini 35 karakter) tanpa tergantung batas input dashboard",
      "Judul panjang tetap wrap rapi ke baris berikutnya, tidak terpotong/overflow",
    ],
    overrides: {
      loginHeader: {
        titleColor: "",
        buttonColor: "",
        allowLongTitle: true,
        titleOverrideText: "Chat dengan POEMS Support Sekarang!",
        bannerImageUrl: "",
        bannerAspectRatio: "2.5 / 1",
      },
      enableLoginBypass: false,
    },
    snippets: [
      {
        title: "Custom CSS — ganti judul dengan teks 35 karakter",
        code:
          "/* Sembunyikan teks judul bawaan (maks 20 char dari dashboard) */\n" +
          ".qismo-login-form__header h3 {\n" +
          "  font-size: 0 !important;\n" +
          "  line-height: 0 !important;\n" +
          "}\n\n" +
          "/* Render judul pengganti — bebas hingga 35 karakter */\n" +
          ".qismo-login-form__header h3::after {\n" +
          "  content: \"Chat dengan POEMS Support Sekarang!\";\n" +
          "  display: block;\n" +
          "  font-size: 22px;\n" +
          "  line-height: 1.35;\n" +
          "  font-weight: 700;\n" +
          "}",
      },
      {
        title: "Custom CSS — judul panjang wrap rapi",
        code:
          ".qismo-login-form__header,\n" +
          ".qismo-login-form__header h3 {\n" +
          "  white-space: normal !important;\n" +
          "  overflow-wrap: break-word !important;\n" +
          "  word-break: break-word !important;\n" +
          "}",
      },
    ],
  },
  {
    id: "q3-banner-header",
    categoryId: "header-branding",
    label: "Q3 · Banner Gambar di Header",
    tagline: "Gambar full-width menggantikan teks sapaan di layar login",
    description: [
      "Default platform: area konten header form login hanya mendukung teks",
      "Dengan custom CSS, teks sapaan bisa diganti banner gambar full-width",
      "Rekomendasi aset: rasio ~2.5:1, dimensi 1000×400 px (2× retina untuk lebar form ±424 px), format PNG/JPG/WebP, ukuran ≤ 200 KB",
    ],
    overrides: {
      loginHeader: {
        titleColor: "",
        buttonColor: "",
        allowLongTitle: false,
        bannerImageUrl: "https://picsum.photos/seed/poems-banner/1000/400",
        bannerAspectRatio: "2.5 / 1",
      },
      enableLoginBypass: false,
    },
    snippets: [
      {
        title: "Custom CSS — banner gambar menggantikan teks header",
        code:
          "/* Sembunyikan teks sapaan & logo default */\n" +
          ".qismo-login-form__header { display: none !important; }\n" +
          ".qcw-login-avatar img { display: none !important; }\n\n" +
          "/* Render banner full-width di area logo */\n" +
          ".qcw-login-avatar {\n" +
          "  width: 100% !important;\n" +
          "  height: auto !important;\n" +
          "  margin: 0 !important;\n" +
          "  display: block !important;\n" +
          "}\n" +
          ".qcw-login-avatar::after {\n" +
          "  content: \"\";\n" +
          "  display: block;\n" +
          "  width: 100%;\n" +
          "  aspect-ratio: 2.5 / 1;\n" +
          "  background-image: url('https://cdn.example.com/banner.webp');\n" +
          "  background-size: cover !important;\n" +
          "  background-position: center !important;\n" +
          "  border-radius: 12px !important;\n" +
          "}",
      },
      {
        title: "Rekomendasi aset banner",
        code:
          "Rasio     : 2.5 : 1 (mengikuti lebar area header form login)\n" +
          "Dimensi   : 1000 × 400 px (2× retina, form login ±424 px)\n" +
          "Format    : WebP (disarankan), PNG, atau JPG\n" +
          "Ukuran    : ≤ 200 KB agar load tetap cepat\n" +
          "Hosting   : URL publik HTTPS (CDN milik client)",
      },
    ],
  },

  // ══ Login Form Behavior ══════════════════════════════════════
  {
    id: "q4-bypass-login",
    categoryId: "login-behavior",
    label: "Q4 · Bypass Form Login",
    tagline: "User yang sudah login di website langsung masuk chat, tanpa isi form",
    description: [
      "Default platform: setiap user harus mengisi form login pre-chat (nama, email) sebelum bisa chat",
      "Kalau user sudah login di website client, datanya bisa dipakai langsung — form login di-skip total",
      "Caranya: set localStorage key \"qismo-widget\" berisi data user SEBELUM Qismo di-init",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: true,
    },
    snippets: [
      {
        title: "Bypass login — isi localStorage sebelum init Qismo",
        code:
          "// Ambil data user dari sesi login website Anda (dinamis!)\n" +
          "var loggedInUser = {\n" +
          "  unique_id: \"budi@perusahaan.com\",   // wajib unik per user\n" +
          "  display_name: \"Budi Santoso\",\n" +
          "  extra_fields: JSON.stringify([\n" +
          "    { key: \"company\", value: \"PT Maju Jaya\" },\n" +
          "  ]),\n" +
          "};\n\n" +
          "// HARUS dipanggil SEBELUM new Qismo(...)\n" +
          "if (!localStorage.getItem(\"qismo-widget\")) {\n" +
          "  localStorage.setItem(\"qismo-widget\", JSON.stringify(loggedInUser));\n" +
          "}\n\n" +
          "new Qismo(\"YOUR_APP_ID\", { options: { channel_id: YOUR_CHANNEL_ID } });",
      },
      {
        title: "Bersihkan sesi saat user logout dari website",
        code:
          "// Panggil di handler logout website Anda, supaya user berikutnya\n" +
          "// tidak mewarisi sesi chat user sebelumnya.\n" +
          "localStorage.removeItem(\"qismo-widget\");",
      },
    ],
  },
  {
    id: "q13-custom-button-bypass",
    categoryId: "login-behavior",
    label: "Q13 · Tombol Custom \"Hubungi CS\" + Bypass Login",
    tagline: "Tombol bawaan disembunyikan, chat dibuka dari tombol milik dashboard client — user login langsung masuk chat",
    description: [
      "Kebutuhan: client punya dashboard/web app dengan user yang SUDAH login, dan ingin live chat dibuka dari tombol mereka sendiri (mis. \"Hubungi CS\" di navbar), bukan dari bubble bawaan Qiscus di pojok kanan bawah",
      "Langkah 1 — Sembunyikan tombol bawaan: CSS .qcw-trigger-btn { display: none !important; } di halaman client (BUKAN lewat widgetCustomCSS, karena tombol ini ada di halaman utama, bukan di iframe Qiscus)",
      "Langkah 2 — Bypass form login: tulis data user yang login ke localStorage key \"qismo-widget\" SEBELUM script qismo-v5.js di-load. Beda dengan Q4: data di-overwrite kalau unique_id yang tersimpan berbeda dengan user yang sedang login, supaya ganti akun di browser yang sama tidak mewarisi chat user sebelumnya",
      "Langkah 3 — Load widget seperti biasa (new Qismo(APP_ID, { options: { channel_id } }))",
      "Langkah 4 — Tombol custom memanggil .click() pada .qcw-trigger-btn. Tombol bawaan tetap ada di DOM (hanya tidak terlihat), jadi .click() tetap berfungsi. Karena user sudah di-bypass, klik ini langsung membuka/menutup chat room",
      "Demo di preview ini: tombol bulat di kanan bawah berperan sebagai tombol \"Hubungi CS\" — sekali klik langsung membuka chat room (tanpa menu channel, tanpa form login)",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: true,
      directChat: true,
    },
    snippets: [
      {
        title: "1 · HTML + CSS — tombol custom & sembunyikan tombol bawaan",
        code:
          "<style>\n" +
          "  /* Sembunyikan tombol bubble bawaan widget Qiscus.\n" +
          "     Taruh di CSS halaman client (bukan widgetCustomCSS),\n" +
          "     karena .qcw-trigger-btn dirender di halaman utama. */\n" +
          "  .qcw-trigger-btn { display: none !important; }\n\n" +
          "  /* Style tombol custom — sesuaikan dengan desain dashboard */\n" +
          "  #btn-hubungi-cs {\n" +
          "    padding: 10px 20px;\n" +
          "    background: #2563eb;\n" +
          "    color: #fff;\n" +
          "    border: none;\n" +
          "    border-radius: 6px;\n" +
          "    cursor: pointer;\n" +
          "  }\n" +
          "</style>\n\n" +
          "<!-- Letakkan di mana saja: navbar, sidebar, halaman bantuan, dll. -->\n" +
          "<button id=\"btn-hubungi-cs\" type=\"button\">Hubungi CS</button>",
      },
      {
        title: "2 · Bypass login — tulis data user ke localStorage (SEBELUM load widget)",
        code:
          "// Data user yang sedang login di dashboard.\n" +
          "// WAJIB diisi dinamis dari session/backend — JANGAN hardcode.\n" +
          "var currentUser = {\n" +
          "  unique_id: \"user@example.com\",   // email / user ID, unik per user\n" +
          "  display_name: \"Nama User\",\n" +
          "};\n\n" +
          "try {\n" +
          "  var stored = JSON.parse(localStorage.getItem(\"qismo-widget\") || \"null\");\n\n" +
          "  // Tulis kalau belum ada, ATAU kalau yang tersimpan milik user lain\n" +
          "  // (mis. ganti akun di browser yang sama).\n" +
          "  if (!stored || stored.unique_id !== currentUser.unique_id) {\n" +
          "    localStorage.setItem(\"qismo-widget\", JSON.stringify({\n" +
          "      unique_id: currentUser.unique_id,\n" +
          "      display_name: currentUser.display_name,\n" +
          "      // opsional — info tambahan yang terlihat agent:\n" +
          "      // extra_fields: JSON.stringify([{ key: \"company\", value: \"...\" }]),\n" +
          "    }));\n" +
          "  }\n" +
          "} catch (e) {\n" +
          "  // localStorage bisa diblokir (private mode / setting browser)\n" +
          "  // → widget tetap jalan, hanya form login yang akan tampil.\n" +
          "  console.error(\"Gagal set data qismo-widget:\", e);\n" +
          "}",
      },
      {
        title: "3 · Load widget Qiscus",
        code:
          "document.addEventListener(\"DOMContentLoaded\", function () {\n" +
          "  var s = document.createElement(\"script\");\n" +
          "  s.type = \"text/javascript\";\n" +
          "  s.src = \"https://omnichannel.qiscus.com/js/qismo-v5.js\";\n" +
          "  s.async = true;\n" +
          "  s.onload = s.onreadystatechange = function () {\n" +
          "    new Qismo(\"YOUR_APP_ID\", {\n" +
          "      options: {\n" +
          "        channel_id: YOUR_CHANNEL_ID,\n" +
          "        mobileBreakPoint: 400,\n" +
          "        extra_fields: [],\n" +
          "        baseUrl: \"https://omnichannel.qiscus.com\",\n" +
          "        qismoIframeUrl: \"https://omnichannel.qiscus.com\",\n" +
          "      },\n" +
          "    });\n" +
          "  };\n" +
          "  var t = document.getElementsByTagName(\"script\")[0];\n" +
          "  t.parentNode.insertBefore(s, t);\n" +
          "});",
      },
      {
        title: "4 · Tombol custom membuka live chat",
        code:
          "// Taruh di dalam handler DOMContentLoaded yang sama (langkah 3).\n" +
          "document.getElementById(\"btn-hubungi-cs\").addEventListener(\"click\", function () {\n" +
          "  // Tombol bawaan hanya disembunyikan (display:none), masih ada di DOM,\n" +
          "  // jadi .click() tetap memicu buka/tutup chat room.\n" +
          "  var trigger = document.querySelector(\".qcw-trigger-btn\");\n" +
          "  if (trigger) {\n" +
          "    trigger.click();\n" +
          "  } else {\n" +
          "    // Script qismo-v5.js belum selesai load (async).\n" +
          "    console.warn(\"Widget Qiscus belum siap, coba lagi sebentar.\");\n" +
          "  }\n" +
          "});",
      },
      {
        title: "Checklist & catatan penting",
        code:
          "• URUTAN WAJIB: localStorage \"qismo-widget\" diisi SEBELUM qismo-v5.js\n" +
          "  di-load. Kalau terbalik, widget sudah terlanjur menampilkan form login.\n" +
          "• currentUser harus dinamis dari sesi login dashboard. Hardcode = semua\n" +
          "  user masuk ke room chat yang sama.\n" +
          "• Saat user logout dari dashboard, panggil:\n" +
          "    localStorage.removeItem(\"qismo-widget\");\n" +
          "  supaya user berikutnya di browser yang sama tidak melihat chat lama.\n" +
          "• Tombol custom bisa diklik sebelum widget siap (script async). Untuk UX\n" +
          "  lebih baik: disable tombol dulu, lalu enable saat .qcw-trigger-btn muncul\n" +
          "  (cek berkala / MutationObserver), atau tampilkan pesan \"memuat...\".\n" +
          "• .qcw-trigger-btn berfungsi toggle: klik pertama membuka chat room,\n" +
          "  klik berikutnya menutup/minimize.\n" +
          "• Ganti YOUR_APP_ID & YOUR_CHANNEL_ID dengan App ID dan Channel ID\n" +
          "  dari halaman integrasi Qiscus Widget di dashboard Omnichannel.",
      },
    ],
  },
  {
    id: "q5-extra-fields",
    categoryId: "login-behavior",
    label: "Q5 · Field Tambahan di Form Login",
    tagline: "Tambah field custom (mis. Nomor Order) di form pre-chat",
    description: [
      "Default platform: form login hanya berisi nama & email",
      "Lewat opsi extra_fields, form bisa ditambah field custom — mis. nama perusahaan dan nomor order",
      "Isian field ini ikut terkirim sebagai info customer, terlihat agent di dashboard Omnichannel",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      qiscusOptions: {
        extra_fields: [
          {
            name: "company",
            placeholder: "Nama perusahaan Anda",
            visible: true,
          },
          {
            name: "order_number",
            placeholder: "Nomor order (jika ada)",
            visible: true,
          },
        ],
      },
    },
    snippets: [
      {
        title: "Konfigurasi extra_fields di options Qismo",
        code:
          "new Qismo(\"YOUR_APP_ID\", {\n" +
          "  options: {\n" +
          "    channel_id: YOUR_CHANNEL_ID,\n" +
          "    extra_fields: [\n" +
          "      {\n" +
          "        name: \"company\",\n" +
          "        placeholder: \"Nama perusahaan Anda\",\n" +
          "        visible: true,\n" +
          "      },\n" +
          "      {\n" +
          "        name: \"order_number\",\n" +
          "        placeholder: \"Nomor order (jika ada)\",\n" +
          "        visible: true,\n" +
          "      },\n" +
          "    ],\n" +
          "  },\n" +
          "});",
      },
    ],
  },
  {
    id: "q6-button-text",
    categoryId: "login-behavior",
    label: "Q6 · Ganti Teks Tombol Start Chat",
    tagline: "Label tombol jadi CTA brand sendiri, mis. \"Mulai Konsultasi\"",
    description: [
      "Default platform: teks tombol submit form login adalah \"Start Chat\" dan tidak ada setting untuk mengubahnya",
      "Dengan custom CSS, teks aslinya di-nolkan lalu diganti via ::after content — pola yang sama dengan override judul (Q2)",
      "Cocok untuk lokalisasi bahasa atau CTA yang lebih sesuai funnel client",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qcw-cs-submit-form.qismo-login-btn" +
        " { font-size: 0 !important; line-height: 0 !important; }" +
        " .qcw-cs-submit-form.qismo-login-btn::after" +
        " { content: \"Mulai Konsultasi\"; display: block;" +
        "   font-size: 15px; line-height: 1.4; font-weight: 600; }",
    },
    snippets: [
      {
        title: "Custom CSS — ganti label tombol Start Chat",
        code:
          "/* Nolkan teks asli \"Start Chat\" */\n" +
          ".qcw-cs-submit-form.qismo-login-btn {\n" +
          "  font-size: 0 !important;\n" +
          "  line-height: 0 !important;\n" +
          "}\n\n" +
          "/* Render label pengganti */\n" +
          ".qcw-cs-submit-form.qismo-login-btn::after {\n" +
          "  content: \"Mulai Konsultasi\";\n" +
          "  display: block;\n" +
          "  font-size: 15px;\n" +
          "  line-height: 1.4;\n" +
          "  font-weight: 600;\n" +
          "}",
      },
    ],
  },
  {
    id: "q7-input-styling",
    categoryId: "login-behavior",
    label: "Q7 · Styling Input Form Login",
    tagline: "Input rounded + border warna brand saat focus",
    description: [
      "Default platform: tampilan input form login mengikuti style bawaan, tidak bisa diubah dari dashboard",
      "Dengan custom CSS, border-radius, warna border saat focus, dan warna placeholder bisa disesuaikan brand",
      "Custom CSS dikirim ke iframe form login (qcw-login-form-iframe) via postMessage, sama seperti case lain",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qismo-login-form input[type=\"text\"]," +
        " .qismo-login-form input[type=\"email\"]," +
        " .qismo-login-form input" +
        " { border-radius: 10px !important; border: 1.5px solid #d6dbe4 !important;" +
        "   padding: 10px 14px !important; transition: border-color .15s ease; }" +
        " .qismo-login-form input:focus" +
        " { border-color: #0043CE !important; outline: none !important;" +
        "   box-shadow: 0 0 0 3px rgba(0,67,206,0.12) !important; }" +
        " .qismo-login-form input::placeholder" +
        " { color: #9aa3b2 !important; }",
    },
    snippets: [
      {
        title: "Custom CSS — input rounded + focus warna brand",
        code:
          ".qismo-login-form input {\n" +
          "  border-radius: 10px !important;\n" +
          "  border: 1.5px solid #d6dbe4 !important;\n" +
          "  padding: 10px 14px !important;\n" +
          "  transition: border-color .15s ease;\n" +
          "}\n\n" +
          ".qismo-login-form input:focus {\n" +
          "  border-color: #0043CE !important;\n" +
          "  outline: none !important;\n" +
          "  box-shadow: 0 0 0 3px rgba(0, 67, 206, 0.12) !important;\n" +
          "}\n\n" +
          ".qismo-login-form input::placeholder {\n" +
          "  color: #9aa3b2 !important;\n" +
          "}",
      },
    ],
  },

  // ══ Chat Room Styling ════════════════════════════════════════
  {
    id: "q8-header-color",
    categoryId: "chat-room-style",
    label: "Q8 · Warna Header Chat Room",
    tagline: "Header room memakai warna brand #0043CE, bukan default",
    description: [
      "Default platform: warna header chat room mengikuti satu setting warna global di dashboard Qiscus",
      "Dengan custom CSS, header room bisa dipaksa memakai warna brand yang presisi (demo ini #0043CE, teks putih)",
      "Berlaku juga untuk nama channel & subteks di dalam header",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qcw-header" +
        " { background: #0043CE !important; color: #ffffff !important; }" +
        " .qcw-header *" +
        " { color: #ffffff !important; }",
    },
    snippets: [
      {
        title: "Custom CSS — header chat room warna brand",
        code:
          ".qcw-header {\n" +
          "  background: #0043CE !important;\n" +
          "  color: #ffffff !important;\n" +
          "}\n\n" +
          "/* Nama channel & subteks di header ikut putih */\n" +
          ".qcw-header * {\n" +
          "  color: #ffffff !important;\n" +
          "}",
      },
    ],
  },
  {
    id: "q9-bubble-colors",
    categoryId: "chat-room-style",
    label: "Q9 · Warna Bubble Chat",
    tagline: "Bubble customer biru brand, bubble agent abu muda",
    description: [
      "Default platform: warna bubble chat mengikuti tema bawaan, tidak ada setting terpisah customer vs agent",
      "Dengan custom CSS, bubble pesan customer (kanan) dan agent (kiri) bisa diberi warna berbeda",
      "Demo ini: customer #0043CE teks putih, agent #f1f3f7 teks gelap",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qcw-comment--me .qcw-comment__message," +
        " .comment--me .comment__bubble," +
        " div[class*=\"comment--me\"] div[class*=\"bubble\"]" +
        " { background: #0043CE !important; color: #ffffff !important; }" +
        " .qcw-comment--other .qcw-comment__message," +
        " .comment--other .comment__bubble," +
        " div[class*=\"comment--other\"] div[class*=\"bubble\"]" +
        " { background: #f1f3f7 !important; color: #1f2733 !important; }",
    },
    snippets: [
      {
        title: "Custom CSS — bubble customer vs agent beda warna",
        code:
          "/* Bubble pesan customer (sisi kanan) */\n" +
          ".qcw-comment--me .qcw-comment__message {\n" +
          "  background: #0043CE !important;\n" +
          "  color: #ffffff !important;\n" +
          "}\n\n" +
          "/* Bubble pesan agent (sisi kiri) */\n" +
          ".qcw-comment--other .qcw-comment__message {\n" +
          "  background: #f1f3f7 !important;\n" +
          "  color: #1f2733 !important;\n" +
          "}",
      },
    ],
  },
  {
    id: "q10-custom-font",
    categoryId: "chat-room-style",
    label: "Q10 · Custom Font Chat Room",
    tagline: "Seluruh chat room memakai font brand, bukan font default",
    description: [
      "Default platform: font widget mengikuti bawaan, tidak ada setting font di dashboard",
      "Dengan custom CSS, font-family seluruh chat room bisa diganti mengikuti font brand client",
      "Untuk webfont (mis. Google Fonts), @import harus diletakkan di BARIS PERTAMA string CSS — kalau tidak, browser mengabaikannya",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qcw-container, .qcw-container *," +
        " .qismo-login-form, .qismo-login-form *, body" +
        " { font-family: Georgia, \"Times New Roman\", serif !important; }",
    },
    snippets: [
      {
        title: "Custom CSS — ganti font seluruh widget (Google Fonts)",
        code:
          "/* @import WAJIB di baris paling atas string CSS */\n" +
          "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');\n\n" +
          "body,\n" +
          ".qcw-container,\n" +
          ".qcw-container *,\n" +
          ".qismo-login-form,\n" +
          ".qismo-login-form * {\n" +
          "  font-family: 'Plus Jakarta Sans', sans-serif !important;\n" +
          "}",
      },
      {
        title: "Catatan penggunaan",
        code:
          "• @import harus jadi rule PERTAMA di string widgetCustomCSS,\n" +
          "  sebelum rule CSS lain — kalau tidak, font tidak akan ter-load.\n" +
          "• Demo di preview ini memakai font sistem (Georgia) supaya\n" +
          "  perubahan langsung terlihat tanpa request eksternal.\n" +
          "• Alternatif tanpa @import: @font-face dengan file WOFF2 di CDN\n" +
          "  milik client (boleh diletakkan di posisi mana pun).",
      },
    ],
  },
  {
    id: "q11-widget-size",
    categoryId: "chat-room-style",
    label: "Q11 · Ukuran & Breakpoint Widget",
    tagline: "Widget desktop lebih tinggi (640/700px), mode mobile mulai 480px",
    description: [
      "Default platform: tinggi widget desktop dan breakpoint mobile memakai nilai bawaan SDK",
      "Lewat opsi widgetDesktopSizes, tinggi chat room desktop bisa diatur (demo ini 640px, membesar ke 700px saat viewport tinggi)",
      "Opsi mobileBreakPoint menentukan lebar layar maksimum saat widget beralih ke tampilan fullscreen mobile (demo ini 480px)",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      qiscusOptions: {
        widgetDesktopSizes: [640, 700],
        mobileBreakPoint: 480,
      },
    },
    snippets: [
      {
        title: "Konfigurasi ukuran & breakpoint di options Qismo",
        code:
          "new Qismo(\"YOUR_APP_ID\", {\n" +
          "  options: {\n" +
          "    channel_id: YOUR_CHANNEL_ID,\n\n" +
          "    // Tinggi widget di desktop: [normal, saat viewport tinggi]\n" +
          "    widgetDesktopSizes: [640, 700],\n\n" +
          "    // Layar ≤ 480px → widget tampil fullscreen ala mobile\n" +
          "    mobileBreakPoint: 480,\n" +
          "  },\n" +
          "});",
      },
    ],
  },
  {
    id: "q12-hide-agent-name",
    categoryId: "chat-room-style",
    label: "Q12 · Sembunyikan Nama Agent",
    tagline: "Nama & avatar agent yang membalas tidak ditampilkan ke customer",
    description: [
      "Default platform: nama dan foto avatar agent yang membalas selalu tampil di atas/dekat bubble pesannya",
      "Tidak ada setting di dashboard Qiscus untuk mematikan ini — perlu custom CSS untuk menyembunyikannya",
      "Bubble pesan agent tetap tampil normal, hanya label nama & avatarnya yang disembunyikan",
    ],
    overrides: {
      loginHeader: null,
      enableLoginBypass: false,
      extraCss:
        ".qcw-comment__username, .qcw-avatar" +
        " { display: none !important; }",
    },
    snippets: [
      {
        title: "Custom CSS — sembunyikan nama & avatar agent di bubble chat",
        code:
          "/* Label nama (mis. \"Support\") & foto avatar di atas bubble pesan */\n" +
          ".qcw-comment__username,\n" +
          ".qcw-avatar {\n" +
          "  display: none !important;\n" +
          "}",
      },
      {
        title: "Catatan",
        code:
          "• Ini murni kosmetik (CSS): nama agent tetap tercatat & terlihat\n" +
          "  di dashboard Omnichannel, hanya disembunyikan dari sisi customer.",
      },
    ],
  },
];

// ── Helper: resolve case dari id, fallback ke "default" ──────
function resolveCase(caseId) {
  var found = null;
  for (var i = 0; i < CASES.length; i++) {
    if (CASES[i].id === caseId) {
      found = CASES[i];
      break;
    }
  }
  if (!found) {
    if (caseId) {
      console.warn('[cases] unknown case id "' + caseId + '", falling back to default');
    }
    for (var j = 0; j < CASES.length; j++) {
      if (CASES[j].id === "default") {
        found = CASES[j];
        break;
      }
    }
  }
  return found;
}

// ── Helper: baca ?case= dari query string ────────────────────
function getCaseIdFromLocation(loc) {
  var search = (loc || window.location).search || "";
  var match = search.match(/[?&]case=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

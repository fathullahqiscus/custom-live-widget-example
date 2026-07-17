# Demo Melawai — Qiscus Widget Customization Showcase

Static site berisi dua bagian:

1. **`widget/`** — implementasi "custom channel menu" untuk Qiscus Omnichannel:
   tombol mengambang yang membuka panel menu (live chat, WhatsApp, telepon,
   email) sebelum masuk ke widget chat Qiscus asli.
2. **Dashboard showcase** (`index.html` di root) — halaman untuk
   mendemokan berbagai kustomisasi tampilan widget (`?case=<id>`) ke klien,
   dengan live preview widget asli (bukan mockup) lewat iframe.

## Struktur

```
index.html         Dashboard showcase (case picker + live iframe preview)
dashboard.css       Style khusus dashboard
widget/index.html   Entry point widget (dimuat di iframe dashboard, atau
                    di-embed langsung ke situs klien)
styles.css          Style widget (toggle button, panel menu)
js/
  cases.js          Registry case kustomisasi (dipakai dashboard.js & config.js)
  config.js         Konfigurasi terpusat: menu, Qiscus app id/channel,
                    custom CSS untuk iframe Qiscus, resolve case aktif
  app.js            Logika widget: render menu, load Qiscus SDK, kirim
                    custom CSS ke iframe Qiscus
  dashboard.js      Logika dashboard: render case picker, reload iframe
                    preview saat case dipilih
```

## Menjalankan lokal

```bash
npm start   # serve, buka index.html di browser
```

Atau tanpa install apapun:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000/index.html` untuk dashboard showcase, atau
`http://localhost:8000/widget/index.html` untuk widget saja.

## Menambah case kustomisasi baru

Tambahkan entry baru ke `CASES` di `js/cases.js` (lihat contoh yang sudah
ada), lalu resolve override-nya di `js/config.js` (mis. `LOGIN_HEADER`,
`WIDGET_CUSTOM_CSS`). Dashboard akan otomatis merender kartu case baru
berdasarkan `categoryId`-nya.

## Custom CSS ke widget Qiscus

Qiscus merender beberapa iframe terpisah tergantung tahap alur chat
(`qcw-welcome-iframe`, `qcw-login-form-iframe`, `qcw-iframe`). Custom CSS
dikirim via `postMessage` ke semua iframe tersebut (lihat
`QiscusLoader.attachCustomCSS` di `js/app.js`), di-retry beberapa kali dan
dipantau lewat `MutationObserver` karena iframe-iframe ini muncul bertahap.

# PARS M13 Araç Kamerası — Vercel Statik Web Sitesi

Bu paket, Vercel'de `public` Output Directory ayarıyla çalışacak şekilde güncellenmiştir.

## Dosya yapısı

```text
pars-m13-vercel-public/
├── public/
│   ├── index.html
│   └── assets/
│       ├── css/styles.css
│       ├── js/main.js
│       └── img/...
├── package.json
├── vercel.json
└── README.md
```

## Vercel ayarları

Vercel Project Settings içinde şu ayarlar kullanılabilir:

- Framework Preset: **Other**
- Build Command: `npm run build` veya boş bırakılabilir
- Output Directory: `public`
- Root Directory: bu klasörün kökü (`pars-m13-vercel-public`)

`vercel.json` içinde `"outputDirectory": "public"` bulunduğu için Vercel, build sonrası `public/` klasörünü yayın çıktısı olarak kullanır.

## Yerel önizleme

Terminalde proje klasöründe:

```bash
npm run dev
```

Ardından tarayıcıda:

```text
http://localhost:3000
```

Alternatif olarak `public/index.html` dosyasını doğrudan tarayıcıda açabilirsiniz.

## İçerik notu

Sayfa, PARS M13 Araç İçi Kamera / Mobil NVR teknik dokümanındaki ürün bilgileri, teknik özellikler, WHDR ve LFM performans bölümleri temel alınarak hazırlanmıştır. YouTube video bağlantıları korunmuş, video kartları için dokümandaki ilgili örnek kareler yerel görsel olarak eklenmiştir.

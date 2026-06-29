# PARS M13 Araç Kamerası — Vercel Statik Web Sayfası

Bu paket, PARS M13 Araç Kamerası için hazırlanmış profesyonel tek sayfalık Türkçe ürün tanıtım sitesidir.

## Dosya yapısı

```text
pars-m13-vercel/
├── index.html
├── package.json
├── vercel.json
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── ürün görselleri
│       ├── WHDR kanıt kareleri ve grafikler
│       └── LFM kanıt kareleri ve grafikler
└── README.md
```

## Yerel önizleme

Klasörü açıp doğrudan `index.html` dosyasını tarayıcıda açabilirsiniz. Alternatif olarak terminalde:

```bash
cd pars-m13-vercel
python3 -m http.server 3000
```

Sonra tarayıcıda `http://localhost:3000` adresini açın.

## Vercel yayına alma

1. Bu klasörü GitHub reposuna yükleyin veya Vercel Dashboard üzerinden sürükleyip bırakın.
2. Framework Preset: **Other** seçin.
3. Build Command: boş bırakılabilir veya `npm run build` kullanılabilir.
4. Output Directory: `./` olarak bırakın.
5. Deploy edin.

## Notlar

- Sayfa dış bağımlılık kullanmaz; CSS, JavaScript ve görseller paket içindedir.
- Video kartlarındaki görseller, teknik dokümandaki ilgili karşılaştırma karelerinden yerel varlık olarak eklenmiştir.
- Video kartlarına tıklayınca ilgili YouTube bağlantısı yeni sekmede açılır.

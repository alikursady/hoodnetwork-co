# Hood Network

Next.js 14 App Router + TypeScript + Tailwind tabanli Hood Network web sitesi.

## Guest List sistemi route'lari

- `GET /guest-list` (Yazdir + Kontrol birlikte)
- `GET /guest-list/yazdir` (legacy, otomatik `/guest-list`'e yonlenir)
- `GET /guest-list/kontrol` (legacy, otomatik `/guest-list`'e yonlenir)
- `GET /guest-list/kontrol/login` (legacy, otomatik `/guest-list`'e yonlenir)

## Guest List env ayarlari

`.env.local` dosyasina su alanlari ekle:

```bash
DATABASE_URL=
SESSION_SECRET=
STAFF_LOGIN_PASSWORD=
ORGANIZER_MERT_PASSWORD=
ORGANIZER_KURSAT_PASSWORD=
ORGANIZER_EMRE_PASSWORD=
ORGANIZER_BATUHAN_PASSWORD=
NEXT_PUBLIC_SITE_URL=https://hoodnetwork.co
```

`SESSION_SECRET` icin uzun ve rastgele bir deger kullan.

## Organizer girislerini yonetme

Organizer listesi `lib/guest-list/config.ts` dosyasinda:

- Mert
- Kürşat
- Emre
- Batuhan

Bu organizer'larin sifreleri kod icinde tutulmaz, sadece env uzerinden okunur.

## Staff sifresi

`STAFF_LOGIN_PASSWORD` degeri ile:

- `/guest-list/kontrol/login` uzerinden giris yapilir
- basarili giris sonrasi `/guest-list/kontrol` sayfasina erisilir

## Database migration

Migration dosyasi:

- `db/migrations/001_guest_list_entries.sql`

Calistirmak icin (PostgreSQL):

```bash
psql "$DATABASE_URL" -f db/migrations/001_guest_list_entries.sql
```

Windows PowerShell:

```powershell
psql $env:DATABASE_URL -f db/migrations/001_guest_list_entries.sql
```

## Lokal calistirma

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Vercel deploy sonrasi test checklist

1. Env degiskenlerinin Vercel Project Settings > Environment Variables altinda tanimli oldugunu kontrol et.
2. Migration'in bagli veritabaninda calistigini dogrula.
3. `/guest-list/yazdir` sayfasinda organizer ile giris yapip isim ekle.
4. Ayni organizer + ayni ad/soyad icin duplicate hatasini test et.
5. Organizer tarafinda kayit silme islemini test et.
6. `/guest-list/kontrol/login` ile staff girisi yap.
7. Kontrol panelinde arama/filtreleme yap, `Geldi` butonunu test et.
8. Check-in degisimi sonrasinda satirin aninda guncellendigini dogrula.

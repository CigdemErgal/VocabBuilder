# VocabBuilder Calisma Yol Haritasi

Bu dosya, teknik sartname, Figma, Google Sheet notlari ve proje boyunca netlesen kararlar baz alinarak hazirlanan ana calisma planidir.

Bu dosyayi proje boyunca tek referans plan olarak kullanacagiz.

## 1. Sabit Kararlar

### Teknoloji Kararlari

- Proje `React Native` ile gelistirilecek.
- Navigation icin `React Navigation` kullanilacak.
- State yonetimi icin `Redux Toolkit` kullanilacak.
- API istekleri icin `Axios` kullanilacak.
- Form yonetimi icin `react-hook-form` kullanilacak.
- Validation icin `Yup` kullanilacak.
- Token saklama icin `expo-secure-store` kullanilacak.

### Navigation Karari

Google Sheet icinde acikca su beklentiler var:

- `createStackNavigator`
- `createBottomTabNavigator`

Bu nedenle navigation tarafinda `expo-router` yerine `React Navigation` kullanilacak.

### Veri Esleme Karari

Backend alan isimleri degistirilmeyecek:

- `ua`
- `en`

Ama uygulama icinde kullanici dostu isimler kullanilacak:

- `turkish`
- `english`

Ornek:

- form state:
  - `turkish`
  - `english`
- API payload:
  - `ua: form.turkish`
  - `en: form.english`
- API response mapping:
  - `turkish: item.ua`
  - `english: item.en`

### Validation Karari

Frontend Turkish validation icin bu yaklasim baz alinacak:

```ts
/^[A-Za-zÇĞİÖŞÜçğıöşü'’\-\s]+$/;
```

Not:

- Backend server tarafinda Ukraynaca regex zorluyorsa Turkish karakterli veri hata verebilir.
- Bu durum gercek API testinde ayrica dogrulanacak.

### Tasarim Karari

- Figma ana referanstir.
- Tasarim iOS icin hazirlanmis gorunuyor.
- Test ortami su an Android emulator.
- Tasarimi Figma'ya yakin kuracagiz ama Android uzerinde test edecegiz.

## 2. Mentor Modu Kurallari

- Buyuk isleri tek seferde bitirmeye calismayacagiz.
- Once statik UI, sonra davranis ekleyecegiz.
- Once ekran iskeleti, sonra inputlar, sonra form mantigi kuracagiz.
- Once component yapisi, sonra API baglantisi kuracagiz.
- Her adim mumkun oldugunca kucuk tutulacak.
- Onay almadan kod yazilmayacak.

## 3. Hedef Proje Mimarisi

```text
src/
  constants/
  navigation/
  screens/
    auth/
    app/
```

### Klasor Rolleri

- `constants`
  - renkler, spacing, sabitler
- `navigation`
  - stack ve tab navigator dosyalari
- `screens`
  - ekran seviyesindeki bilesenler
- `screens/auth`
  - splash, login, register
- `screens/app`
  - dictionary, recommend, training

## 4. Ana Navigation Agaci

### Auth Stack

- `SplashScreen`
- `RegisterScreen`
- `LoginScreen`

### Home / App Stack

- `HomeNavigator`
  - `BottomTabNavigator`
    - `DictionaryScreen`
    - `RecommendScreen`
    - `TrainingScreen`

### Ek Ekranlar

- `AddWordScreen`
- `EditWordScreen`
- `WellDoneScreen`

### Auth Kontrolu

Google Sheet mantigi:

```tsx
isAuth ? <HomeNavigator /> : <AuthNavigator />;
```

## 5. Ekran Bazli Teknik Beklentiler

### 5.1 Register Screen

- form isaretlemesi eklenecek
- stil eklenecek
- form mantigi eklenecek
- submit sirasinda kayit mantigi baglanacak
- form alani disinda press olunca klavye kapanacak
- `Login` metnine basininca `LoginScreen`e gidilecek
- basarili register sonrasinda kullanici `Home` alanina gececek ve dogrudan `DictionaryScreen` gorecek

### 5.2 Login Screen

- form isaretlemesi eklenecek
- stil eklenecek
- form mantigi eklenecek
- submit sirasinda login mantigi baglanacak
- form alani disinda press olunca klavye kapanacak
- `Register` metnine basininca `RegisterScreen`e gidilecek
- basarili login sonrasinda kullanici `Home` alanina gececek ve dogrudan `DictionaryScreen` gorecek

### 5.3 Home / Yetkili Kullanici Alani

- header bolumunde kullanici bilgisi olacak
- logout icin ikon olacak
- logout press mantigi eklenecek
- alt navigation `createBottomTabNavigator` ile kurulacak

Alt navigation gecisleri:

- ikon 1 -> `DictionaryScreen`
- ikon 2 -> `RecommendScreen`
- ikon 3 -> `TrainingScreen`

### 5.4 Dictionary Screen

Uc ana bolum:

- `Dashboard`
- `WordsTable`
- `WordsPagination`

Dashboard icerigi:

- `Filters`
- `Statistics`
- `Add word`
- `Train oneself`

### 5.5 AddWord Screen

- kategori select
- 2 radio button
- eger kategori `verb` ise fiil turu secimi
- 2 input alani:
  - `en`
  - `ua`
- `Add`
- `Cancel`

Davranis:

- gecersiz degerlerde hata gosterilecek
- veri backend'e gonderilmeyecek
- gecerliyse create istegi atilacak
- basarili olursa kullanici `DictionaryScreen`e donecek
- `Cancel` press -> `DictionaryScreen`

### 5.6 Recommend Screen

- `Dashboard`
- `WordsTable`
- `WordsPagination`

Farklar:

- `Add word` gorunmeyecek
- ikonlu `ActionsBtn` gorunmeyecek
- onun yerine `Add to dictionary` blogu olacak

### 5.7 Training Screen

- `ProgressBar`
- `TrainingRoom`

Davranis:

- ilk yuklemede backend'den training gorevleri istenecek
- gorev yoksa bilgi mesaji ve `Add word` yonlendirmesi sunulacak
- `Save` ile cevaplar backend'e gonderilecek
- basariliysa `WellDoneScreen`e gidilecek

## 6. Teknik Gorevlerin Uygulama Sirasi

### Faz 1. Altyapi

1. Navigation paketlerini kur
2. React Navigation yapisini kur
3. Root auth kontrol agacini kur
4. Redux store temelini kur
5. Auth slice temelini kur
6. Axios client olustur
7. Secure store yardimcilarini olustur

### Faz 2. Auth UI

8. Splash UI tamamla
9. Register UI tamamla
10. Login UI tamamla
11. Auth ekranlarinda ortak ihtiyaclari cikar

### Faz 3. Auth Davranisi

12. Register ekranini gercek `TextInput` ile bagla
13. Login ekranini gercek `TextInput` ile bagla
14. Keyboard davranisini iyilestir
15. `react-hook-form` bagla
16. `yup` validation bagla
17. Register API entegrasyonu
18. Login API entegrasyonu
19. Token yaz / oku / sil
20. Basarili auth sonrasinda `Home -> Dictionary` yonlendirmesini bagla

### Faz 4. Authorized Navigation

21. Header kullanici alanini kur
22. Logout ikonunu ekle
23. Logout akisina bagla
24. Bottom tab navigation kur
25. Dictionary / Recommend / Training gecislerini bagla

### Faz 5. Dictionary

26. Dictionary statik UI
27. Dashboard statik UI
28. WordsTable statik UI
29. WordsPagination statik UI
30. Categories fetch
31. Statistics fetch
32. User words fetch
33. Search + filter + verb radio davranisi
34. Pagination baglama

### Faz 6. Add / Edit / Delete

35. AddWord UI
36. AddWord validation
37. AddWord submit
38. EditWord UI
39. EditWord submit
40. DeleteWord action
41. Listeyi guncelleme

### Faz 7. Recommend

42. Recommend statik UI
43. Dashboard yeniden kullanimi
44. Recommend words fetch
45. `Add to dictionary` akisini bagla
46. Recommend pagination bagla

### Faz 8. Training

47. Training statik UI
48. ProgressBar UI
49. TrainingRoom UI
50. Training gorevlerini cek
51. Empty state kur
52. Next davranisi
53. Save / submit davranisi
54. Hata yonlendirmesi
55. Basarili sonuc yonlendirmesi

### Faz 9. Well Done ve Son Dokunuslar

56. WellDone ekrani
57. Sonuc listesini goster
58. Loading state'leri ekle
59. Error state'leri ekle
60. Stil ve component temizligi yap
61. README hazirla
62. Son test listesini uygula

## 7. Bug ve Risk Notlari

- Backend Turkish karakterli `ua` degerini reddedebilir.
- SVG yerine mumkun oldugunda PNG kullanmak daha guvenli.
- Figma iOS odakli, test Android uzerinde yapiliyor.
- Ozel font kullanilacaksa once gercekten projeye yuklenmeli.
- Eski `expo-router` iskeleti refactor gerektirdi ve React Navigation'a gecildi.

## 8. Gunluk Calisma Prensibi

Her yeni ekran veya ozellikte genel akis:

1. Statik UI
2. Gercek input / gercek kontrol
3. Form state
4. Validation
5. API baglantisi
6. Error / loading durumu
7. Navigation sonucu
8. Temizlik

## 9. Sonuc

Bu dosya artik:

- teknik sartname
- sheet maddeleri
- mentor modu kararlari
- navigation tercihi
- veri esleme kararlari

ile uyumlu ana calisma planidir.

Buradan sonra adim adim bu dosyaya gore ilerleyecegiz.

## 10. Gunluk Not - 20 Haziran 2026

### Bugun tamamlananlar

- `src/screens/auth/SplashScreen.tsx` olusturuldu.
- Splash ekrani icin yesil zemin, solda logo ve sagda `VocabBuilder` yazisi kuruldu.
- Splash ekranindan `Login` ekranina 3 saniye sonra gecis akisi eklendi.
- `src/navigation/AuthNavigator.tsx` icine `Splash` ekrani eklendi.
- `src/screens/auth/LoginScreen.tsx` UI olarak Figma'ya yaklastirildi.
- `src/screens/auth/RegisterScreen.tsx` UI olarak Figma'ya yaklastirildi.
- `LoginScreen` ve `RegisterScreen` icinde gercek `TextInput` alanlari kuruldu.
- Her iki auth ekraninda da `KeyboardAvoidingView` ve `ScrollView` eklendi.
- Her iki auth ekraninda da password alanina `eye-off / eye` toggle mantigi eklendi.
- Her iki auth ekraninda da button press feedback eklendi.
- `LoginScreen` icinde `email` ve `password` state baglandi.
- `RegisterScreen` icinde `name`, `email` ve `password` state baglandi.
- Auth ekranlari arasinda `Login <-> Register` gecisleri calisir duruma geldi.

### Bugun bilerek eksik birakilanlar

- Gercek backend login istegi
- Gercek backend register istegi
- `Redux Toolkit` ile auth state baglantisi
- Token saklama mantigi
- Input disina basinca keyboard dismiss davranisinin ekstra iyilestirmesi

### Siradaki mantikli adimlar

1. `RootNavigator` icinde gercek auth state baglamak
2. `DictionaryScreen` UI iskeletine baslamak
3. Bottom tab gorunumunu Figma'ya yaklastirmak
4. Auth ekranlarinda `react-hook-form` ve `yup` entegrasyonuna gecmek

## 11. Gunluk Not - 22 Haziran 2026

### Bugun tamamlananlar

- `Redux Toolkit` temel auth akisi projeye baglandi.
- `src/store/store.ts` olusturuldu.
- `src/store/authSlice.ts` olusturuldu.
- `App.tsx` icine `Provider` eklenerek store tum uygulamaya tanitildi.
- `RootNavigator` artik Redux icindeki `isAuth` durumuna gore `AuthNavigator` ve `HomeNavigator` arasinda secim yapiyor.
- `LoginScreen` icinde `dispatch(login())` calisir hale getirildi.
- `RegisterScreen` icinde `dispatch(login())` calisir hale getirildi.
- Basarili login ve register sonrasinda kullanici `DictionaryScreen` ekranina gecebilir hale geldi.
- `DictionaryScreen` icin ilk app-ici iskelet kuruldu.
- `DictionaryScreen` header yapisi Figma'ya yaklastirildi.
- Header icin logo, kullanici alani ve hamburger menu yerlesimi uzerinde calisildi.
- `DictionaryScreen` icinde acilir menu mantigi baslatildi.
- `Recommend` ve `Training` ekranlarina menu uzerinden navigation mantigi hazirlandi.
- `Log out` davranisi Redux `logout()` aksiyonuna baglandi.

### Bugun netlesen kararlar

- Header'da birlesik `Craftwork.png` yerine parcali yapi mantigi tercih edildi:
  - logo icon
  - `VocabBuilder` metni
  - `Iryna`
  - user icon
  - hamburger menu
- Header sag blogunda bosluk mantigi netlesti:
  - `Iryna -> user icon` = `8px`
  - `user icon -> hamburger` = `16px`
- `DictionaryScreen` icin kullanilan dogru dosya yolunun `src/screens/app/DictionaryScreen.tsx` oldugu netlestirildi.
- Projede ayni isimli fazladan ekran dosyalari oldugu icin bundan sonra dosya yolu kontrolu daha dikkatli yapilacak.

### Halen devam eden / tamamlanmayan kisimlar

- `DictionaryScreen` header gorunumu son piksel duzeyinde hala ince ayar isteyebilir.
- `DictionaryScreen` burger menu paneli henuz Figma'daki son yan panel gorunumune tam ulasmadi.
- Alt tab ikonlari henuz Figma'daki son haline cekilmedi.
- `DictionaryScreen` icerigi henuz sadece placeholder asamasinda.
- `react-hook-form` ve `yup` henuz auth ekranlarina baglanmadi.
- Gercek backend login/register entegrasyonu henuz yapilmadi.
- Token saklama ve oturum kaliciligi henuz eklenmedi.

### Bir sonraki mantikli adimlar

1. `DictionaryScreen` header ve menu panelini Figma ile tamamen hizalamak
2. Bottom tab ikonlarini ve aktif durumlarini tasarima yaklastirmak
3. `DictionaryScreen` icinde search, categories, statistics ve ust dashboard iskeletini kurmak
4. Auth ekranlarinda `react-hook-form` ve `yup` entegrasyonuna gecmek
5. Sonraki asamada gercek API ve token akisina baslamak

## 12. Gunluk Not - 23 Haziran 2026

### Bugun tamamlananlar

- `DictionaryScreen` icin burger menu yapisi component mantigiyla netlestirildi.
- `src/components/BurgerMenu.tsx` icinde menu acik hali uzerinde calisildi.
- Burger menu icindeki `Dictionary`, `Recommend`, `Training` ve `Log out` satirlari duzenlendi.
- `Log out` satirina sag ok ikonu eklendi.
- Ok ikonunda gorunurluk sorunu incelendi ve PNG export kalitesinin sonucu etkiledigi netlesti.
- Sag ok ikonu Figma'dan `2x` export edilerek daha dengeli hale getirildi.
- Burger menu icindeki ilustrasyon yerlesimi uzerinde calisildi.
- `DictionaryScreen` ile `BurgerMenu` ayrimi daha temiz hale getirildi.
- `Dictionary` ekraninin Figma okumasi netlestirildi:
  - normal dictionary hali
  - `verb` secilmis hali
  - edit popup acik hali
- `Dictionary` ekranini componentlere bolme karari alindi.
- `src/components/dictionary/` altinda acilacak yeni dosya yapisi netlestirildi:
  - `DictionaryHeader.tsx`
  - `DictionaryFilters.tsx`
  - `DictionaryActions.tsx`
  - `WordsTable.tsx`
  - `WordsPagination.tsx`
  - `EditWordModal.tsx`
- `DictionaryHeader.tsx` ve `DictionaryFilters.tsx` icin ilk kod iskeletleri hazirlanip yazilmaya baslandi.

### Bugun netlesen kararlar

- `DictionaryScreen` tek bir ekran olacak, ancak birden fazla gorunume sahip olacak:
  - normal durum
  - kategori `Verb` secilmis durum
  - edit popup acik durum
- Figma'da yan yana duran tum mobil kartlar ayri screen olarak yorumlanmayacak.
- `WordsPagination` alani ayri screen degil, `DictionaryScreen` icindeki alt kontrol bolumu olacak.
- `BurgerMenu` ayri bir component olarak kalacak, `dictionary` alt klasorune tasinmayacak.
- Burger menu ilustrasyonu piksel piksel birebir olmak zorunda degil; genel his ve yerlesim yeterince yakin oldugu surece kabul edilebilir.

### Halen devam eden / tamamlanmayan kisimlar

- `DictionaryHeader.tsx` ile `DictionaryScreen` entegrasyonu tamamlanmadi.
- `DictionaryFilters.tsx` ile `DictionaryScreen` entegrasyonu tamamlanmadi.
- `DictionaryActions.tsx` henuz yazilmadi.
- `WordsTable.tsx` henuz yazilmadi.
- `WordsPagination.tsx` henuz yazilmadi.
- `EditWordModal.tsx` henuz yazilmadi.
- `DictionaryScreen` halen tam Figma akisina gore parcali componentlerle birlestirilmedi.
- `Verb` secilince radio button gosterme davranisi henuz ekran ustunde gercek baglantiya kavusmadi.
- Tablodaki `Edit/Delete` aksiyonlari henuz component seviyesinde kurulmedi.

### Bir sonraki mantikli adimlar

1. `DictionaryHeader.tsx` componentini `DictionaryScreen` icine baglamak
2. `DictionaryFilters.tsx` componentini `DictionaryScreen` icine baglamak
3. `DictionaryActions.tsx` olusturmak
4. `WordsTable.tsx` statik iskeletini kurmak
5. `WordsPagination.tsx` statik iskeletini kurmak
6. Sonrasinda `EditWordModal.tsx` ile popup duzenini eklemek

## 13. Gunluk Not - 24 Haziran 2026

### Bugun tamamlananlar

- `DictionaryScreen` icindeki bolumlerin Figma karsiliklari daha net cozuldu.
- `Find the word` ve `Categories` alanlarinin `DictionaryFilters` componentine ait oldugu netlestirildi.
- `To study`, `Add word` ve `Train oneself` satirinin `DictionaryActions` componentine ait oldugu netlestirildi.
- `src/components/dictionary/DictionaryFilters.tsx` icinde kategori acilir liste mantigi kuruldu.
- Kategori listesine Figma'daki secenekler eklendi:
  - `Verb`
  - `Participle`
  - `Noun`
  - `Adjective`
  - `Pronoun`
  - `Numerals`
  - `Adverb`
  - `Preposition`
  - `Conjunction`
  - `Phrasal verb`
  - `Functional phrase`
- `Verb` secildiginde radio seceneklerini gosterme mantigi baslatildi.
- `DictionaryActions.tsx` yapisi uzerinde calisilmaya baslandi.
- Burger menu gorseli tekrar duzenlendi.
- `Log out` satirindaki sag ok ikonu icin daha net PNG export kullanildi.
- Figma'daki mobil kartlarin ayri ekran degil, ayni ekranin farkli durumlari oldugu tekrar netlestirildi.

### Bugun netlesen kararlar

- `DictionaryScreen` once statik componentler halinde tamamlanacak.
- Sonra bu componentlere davranis eklenecek.
- Burger menu acikken arkadaki filtrelerin ustune gelmesi beklenen davranistir.
- Illustration yerlesiminde birebir piksel zorunlulugu yerine genel Figma hissi korunacak.
- Dictionary tarafinda once:
  1. `DictionaryHeader`
  2. `DictionaryFilters`
  3. `DictionaryActions`
  4. `WordsTable`
  5. `WordsPagination`
  6. `EditWordModal`
  sirasiyla ilerlenecek.

### Halen devam eden / tamamlanmayan kisimlar

- `DictionaryScreen` icinde `DictionaryHeader`, `DictionaryFilters` ve `DictionaryActions` entegrasyonu tamamen toparlanmadi.
- `Find the word` alani henuz gercek `TextInput` davranisina baglanmadi.
- `Categories` alaninda son stil ve icon duzeltmeleri gerekebilir.
- `DictionaryActions.tsx` henuz tamamlanmadi.
- `WordsTable.tsx` henuz yazilmadi.
- `WordsPagination.tsx` henuz yazilmadi.
- `EditWordModal.tsx` henuz yazilmadi.
- Dictionary ekrani henuz tam Figma akisina gore tek parca olarak tamamlanmadi.

### Bir sonraki mantikli adimlar

1. `DictionaryActions.tsx` componentini tamamlamak
2. `DictionaryScreen` icinde `DictionaryHeader + DictionaryFilters + DictionaryActions` baglantisini temizlemek
3. `WordsTable.tsx` statik iskeletini kurmak
4. `WordsPagination.tsx` statik iskeletini kurmak
5. Sonrasinda `EditWordModal.tsx` ile edit popup akisina gecmek

# Wizytówka Google (Google Business Profile) – gotowe treści

Dla zapytań „auto do ślubu Warszawa” i „auto do ślubu Radom” Google pokazuje nad wynikami mapę z trzema firmami.
Do tej sekcji nie da się wejść samą stroną – decyduje wizytówka: kategoria, obszar działania, zdjęcia, aktywność
i przede wszystkim opinie. Poniżej treści do wklejenia 1:1. Fakty są takie same jak na stronie (src/data/site.js).

## Stan na 2026-10-23 (wprowadzone i zatwierdzone przez Google)

Konto j.mateusz14@gmail.com ma dwie zweryfikowane wizytówki: „Auto do Ślubu Radom” i „Auto do Ślubu Warszawa”
(nazw nie zmieniano, żeby nie wywołać ponownej weryfikacji). W obu:

- nowy opis z faktami ze strony (2 BMW, szofer, dekoracja, 800–1200 zł, 30 km gratis);
- witryna → podstrona miasta z UTM (`utm_campaign=gbp-radom` / `gbp-warszawa`); Radom wcześniej wskazywał stary
  adres autodosluburadom.pl;
- kategoria główna bez zmian („Obsługa ślubów”), dodatkowe: Wynajem samochodu z kierowcą, Limuzyny,
  Wypożyczalnia samochodów;
- obszar obsługi rozszerzony (Radom +5 miejscowości, Warszawa +6);
- 5 usług z cenami „od 800 zł” i opisami, 2 produkty (oba BMW) ze zdjęciem i linkiem do strony auta.

Do zrobienia ręcznie: zdjęcia (ostatnie dodane 129 dni temu), link „Poproś o opinie” i wysyłka do par, cotygodniowe posty.

Otwarcie panelu w przeglądarce z osobnym profilem (logujesz się sam, skrypt niczego nie wpisuje):

```
node scripts/gbp-open.mjs
```

## 1. Nazwa

`AutoDoŚlubu Warszawa & Radom`

Wytyczne Google: nazwa ma być taka, jakiej firma używa na co dzień (szyld, umowy, faktury). Nie dopisuj słów kluczowych
w rodzaju „Auto do ślubu BMW Warszawa” – za to Google zawiesza wizytówki.

## 2. Kategorie

Wybierz z listy (wpisz pierwsze litery, nazwy w panelu mogą się minimalnie różnić):

- Główna: **Wynajem limuzyn** (ang. Limousine service)
- Dodatkowe: **Usługi szoferskie** (Chauffeur service), **Wypożyczalnia samochodów** (Car rental agency),
  jeśli jest dostępna – **Usługi ślubne** (Wedding service)

## 3. Obszar działania (firma bez obsługi klientów pod adresem)

Ukryj adres i ustaw obszary: Warszawa, Radom, województwo mazowieckie, Piaseczno, Pruszków, Legionowo, Otwock,
Grójec, Kozienice, Białobrzegi, Zwoleń, Pionki (Google pozwala na maks. 20 pozycji).

## 4. Kontakt i link

- Telefon: +48 881 358 838
- Strona: `https://autodoslubuwarszawa.pl/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
  (parametry UTM pozwolą w GA4 odróżnić ruch z mapy od zwykłych wyników)
- Link do rezerwacji / wizyty: `https://autodoslubuwarszawa.pl/kontakt?utm_source=google&utm_medium=organic&utm_campaign=gbp-booking`
- Godziny: codziennie 9:00–20:00 (tak jak na stronie kontaktu)

## 5. Opis firmy (maks. 750 znaków)

```
Wynajem luksusowego auta do ślubu z szoferem w Warszawie, Radomiu i na całym Mazowszu. Do wyboru dwa białe BMW: BMW 650i xDrive Gran Coupé z silnikiem V8 i napędem 4×4, wygodne o każdej porze roku, oraz romantyczne BMW 4 Cabrio z elektrycznie otwieranym dachem. W każdym pakiecie jest elegancki szofer, dekoracja florystyczna dopasowana do kolorów wesela i postój na sesję zdjęciową. Pakiet 3 godziny kosztuje od 800 do 1200 zł, dojazd do 30 km od Warszawy lub Radomia jest bezpłatny. Organizujemy też kortez weselny. Rezerwacja na podstawie umowy i zadatku. Napiszcie datę i miejsce ślubu – tego samego dnia odpowiemy, czy auto jest wolne.
```

## 6. Usługi (sekcja „Usługi”, z ceną „od”)

| Usługa | Cena | Opis |
|---|---|---|
| Wynajem BMW 650i Gran Coupé do ślubu z szoferem | od 800 zł | Pakiet 3 h: szofer, dekoracja kwiatowa, postój na sesję, dojazd do 30 km gratis. |
| Wynajem BMW 4 Cabrio do ślubu z szoferem | od 800 zł | Kabriolet z elektrycznym dachem, pakiet 3 h z szoferem i dekoracją. |
| Kortez weselny | wycena indywidualna | Oba BMW razem lub z autami zaprzyjaźnionych firm, koordynacja trasy. |
| Dekoracja auta ślubnego | w cenie | Wstążki, bukiet na masce, dekoracja wnętrza w kolorach wesela. |
| Dodatkowa godzina / dojazd powyżej 30 km | wycena indywidualna | Dojazd 3 zł/km poza promieniem 30 km. |

## 7. Produkty (dwie karty ze zdjęciem)

- **BMW 650i xDrive Gran Coupé – auto do ślubu** · cena: 800–1200 zł · link: `https://autodoslubuwarszawa.pl/flota/bmw-650i-gran-coupe`
- **BMW 4 Cabrio – kabriolet do ślubu** · cena: 800–1200 zł · link: `https://autodoslubuwarszawa.pl/flota/bmw-4-cabrio`

## 8. Zdjęcia (najważniejszy sygnał po opiniach)

Wgraj co najmniej 15 zdjęć, potem dokładaj 2–3 po każdym ślubie (Google premiuje świeże zdjęcia z telefonu):
oba auta z przodu, z boku, z tyłu, wnętrze, dekoracja z bliska, auto pod kościołem, auto przy sali, szofer przy aucie,
Para wsiadająca do auta (za zgodą). Okładka: BMW 650i z dekoracją. Logo: `public/logo-512.png`.
Gotowe pliki w dobrej jakości: `images-src/`.

## 9. Opinie – bez nich nie ma mapy

Wizytówka bez opinii praktycznie nie pojawia się w trójce na mapie. Plan:

1. Skopiuj w panelu link „Poproś o opinie” (skrócony link g.page/r/…).
2. Wyślij go każdej Parze z ostatnich sezonów (SMS lub e-mail), np.:

```
Dzień dobry! Dziękujemy, że mogliśmy wieźć Was w dniu ślubu naszym BMW. Jeśli wszystko było tak, jak sobie wymarzyliście, będziemy wdzięczni za kilka słów opinii w Google – to dla nas ogromna pomoc: <LINK>. Wszystkiego dobrego na nowej drodze życia! AutoDoŚlubu Warszawa & Radom
```

3. Od teraz wysyłaj link dzień po każdym ślubie (najwyższa skuteczność) i odpowiadaj na każdą opinię w ciągu 48 h.
4. Nie kupuj opinii i nie proś o same piątki – Google je usuwa, a za oferowanie nagrody za opinię grozi blokada.

Gdy pojawią się prawdziwe opinie, można dodać na stronie ich wyświetlanie (np. widget z linkiem do Google).
Gwiazdek ze schematu AggregateRating nie dodajemy – Google nie pokazuje ich dla opinii o własnej firmie.

## 10. Posty (raz w tygodniu)

Bot bloga publikuje 2 wpisy tygodniowo. Raz w tygodniu dodaj w wizytówce post „Aktualności” z jednym z nich:
2–3 zdania, zdjęcie auta i przycisk „Więcej informacji” z linkiem do wpisu. Przykład:

```
Ile godzin wynająć auto do ślubu? Rozpisaliśmy dzień ślubu na etapy i pokazujemy, kiedy wystarczy pakiet 3 h, a kiedy warto domówić czas. Zajrzyjcie przed rezerwacją!
```

## 11. Spójność danych (NAP) w sieci

Ta sama nazwa, telefon i adres strony wszędzie: Facebook, Instagram, OLX, Allegro Lokalnie, wesele.pl,
weselezklasa.pl, zankiewicz… (katalogi ślubne), Panorama Firm, pkt.pl. Każdy wpis z linkiem do
`https://autodoslubuwarszawa.pl` to też link zwrotny, który pomaga stronie w Google.

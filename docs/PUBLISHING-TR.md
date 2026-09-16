# GitHub yayın planı — henüz uygulanmadı

Alpha3 güncellemesi: aşağıdaki ilk yayın örneklerindeki alpha2 yerine alpha3
tag/sürüm ve ZIP adlarını kullanın. Güncel updates/update.xml Alpha3'ü gösterir.

Hedef: `JoomTheme/rahisi`, herkese açık, varsayılan dal `main`.
Bu oturumdaki bağlantı yeni depo oluşturma işlemi sunmadı. Depo sorgusu 404 döndü;
bu, deponun bulunmadığı veya bağlantıdan erişilemediği anlamına gelebilir.
Hiçbir GitHub deposu, commit, release veya uzak dosya oluşturulmadı.

1. GitHub'da JoomTheme sahibi altında `rahisi` isimli public depoyu oluşturun.
   Sahip farklıysa manifestte ve updates/update.xml içinde tüm hedef adresleri değiştirin.
2. Kaynak ZIP'ini açıp dosyaları `main` dalının köküne yerleştirin. ZIP dosyasını
   tek dosya olarak yüklemek yerine src/, package/, updates/, docs/, tests/ korunmalı.
3. Testlerden sonra `python3 build.py` çalıştırın. Ardından
   `python3 tests/validate.py` ve `node tests/preferences.cjs` çalıştırın.
4. `v0.1.0-alpha2` tag'i ile bir **pre-release** oluşturun. Build'in ürettiği
   `pkg_rahisi-0.1.0-alpha2.zip` dosyasını release asset olarak yükleyin.
   GitHub'ın otomatik Source code ZIP'i Joomla kurulum paketi değildir.
5. Build tarafından checksum'u doldurulmuş updates/update.xml ve changelog.xml
   dosyalarını main dalında yayımlayın. ZIP'i elle değiştirirseniz yeniden build gerekir.
6. Şu hedeflerin oturum açmadan HTTP 200 verdiğini, XML'in HTML sayfasına
   yönlenmediğini ve indirilen ZIP SHA-256 değerini doğrulayın:

- https://raw.githubusercontent.com/JoomTheme/rahisi/main/updates/update.xml
- https://raw.githubusercontent.com/JoomTheme/rahisi/main/updates/changelog.xml
- https://github.com/JoomTheme/rahisi/releases/download/v0.1.0-alpha2/pkg_rahisi-0.1.0-alpha2.zip

Yayımlanana kadar bunlar planlanan adreslerdir; çalışan servis olarak sunmayın.
Paketteki update-server bildirimi tek başına uzak dosyaları oluşturmaz.

## Joomla güncelleme testi

Alpha1 update sunucusu içermediğinden alpha2 ZIP'ini elle kurun. Yayın sonrası
Rahisi Updates'i etkinleştirin. Alfa sürümlerini görmek için test sitesinin Eklenti
Güncelleme seçeneklerinde minimum kararlılığı Alpha olarak ayarlamak gerekebilir;
bu ayarın diğer uzantıları da etkilediğini dikkate alın, üretim sitesinde kullanmayın.
Gerçek sürüm yükseltme akışını sonraki alpha3 ile test edin; alpha2 kurulu siteye
aynı alpha2 sürümünün yeniden önerilmemesi beklenir.

Güncelleme bütün paket üzerinden yapılır; alt uzantılara bağımsız sunucu eklenmez.

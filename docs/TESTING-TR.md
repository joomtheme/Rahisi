# Rahisi 0.1.0-alpha2 — kurulum ve test

Bu paket alfa sürümüdür. Canlı site yerine yedeği alınmış Joomla 6.1.3 test sitesi kullanın.
PHP 8.3+ ve kurulu Cassiopeia gereklidir. Joomla kurulum paketi ZIP'e dahil değildir.

## Kurulum

1. Joomla: Sistem > Yükle > Eklentiler bölümünden `pkg_rahisi-0.1.0-alpha2.zip` yükleyin.
2. Sistem > Yönet > Eklentiler listesinde paket, rahisi şablonu, System - Rahisi ve
   Rahisi modülü olmak üzere dört kaydı kontrol edin.
3. Sistem > Site Şablon Stilleri: Rahisi stilini yalnız test menüsüne atayın
   veya temiz test sitesinde varsayılan yapın. Cassiopeia'yı kaldırmayın.
4. Sistem > Eklentiler: `System - Rahisi` / `Sistem - Rahisi` eklentisini etkinleştirin.
5. Site Modülleri: `Rahisi — Okuma tercihleri` türünde bir modül oluşturun veya
   kurulumda oluşmuş yayımlanmamış örneği düzenleyin. Konum: `main-top`.
   Durum: Yayımlandı. Erişim: Public. Dil: Tümü. Menü ataması: tüm test sayfaları.
6. Modül başlığını gizleyebilirsiniz; panel zaten Okuma tercihleri etiketi taşır.
7. Türkçe test için Joomla Türkçe dil paketinin kurulu ve etkin olduğundan emin olun.
8. Önbelleği temizleyip ön yüzü açın. Tarayıcı Network/Console ekranını da kontrol edin.

Kurulum varsayılan şablonu değiştirmez, eklentiyi etkinleştirmez, modül yayımlamaz.
Panelin görünmemesi bu ayarlar yapılmadıysa kurulum hatası anlamına gelmez.

## Test matrisi — sonuçları işaretleyin

- [ ] ZIP kurulumu ve dört uzantı kaydı; hata/günlük kontrolü.
- [ ] Joomla geriye uyumluluk eklentisi kapalıyken aynı işlemler.
- [ ] Üst şablon index.php mirası; eksik dosya veya 500 hatası yok.
- [ ] user.css ve preferences.css/js istekleri 200; kaynaklar birer kez yükleniyor.
- [ ] %100, %125, %150, %175, %200; metin ve kontroller büyüyor.
- [ ] Sayfa değişimi, yenileme ve ikinci sekmede tercihler korunuyor.
- [ ] Sıfırla tüm üç tercihi sıfırlıyor; diğer sitelerin depolamasına dokunmuyor.
- [ ] Tek makalede aralık ve kontrast seçenekleri çalışıyor.
- [ ] Menü/kategori sayfasında makale aralığı veya kontrastı değişmeyebilir: beklenen kapsam.
- [ ] Aynı sayfada iki modül yayımlandığında durumları eşitleniyor; kimlikler benzersiz.
- [ ] Klavye: Tab, Shift+Tab, Enter/Space, select ok tuşları; odak görünür ve tuzak yok.
- [ ] 320 CSS px ekran, %200 metin, tarayıcı %400 zoom; menü/formlarda kayıp yok.
- [ ] İngilizce/Türkçe; uzun çeviri; RTL dil ile yerleşim.
- [ ] NVDA veya VoiceOver: etiketler, fieldset/legend, durum mesajları anlaşılır.
- [ ] JavaScript kapalı: temel içerik açık, kontroller devre dışı ve açıklama var.
- [ ] localStorage engelli: sayfa çalışıyor ve yalnız sayfalık uygulama bildiriliyor.
- [ ] Başka şablona geçince plugin kaynakları yüklenmiyor; yönetim/API etkilenmiyor.
- [ ] Joomla sayfa önbelleği açık/kapalı; anonim ve oturum açmış kullanıcı.
- [ ] İletişim/giriş formu ve standart menüler; doğrulama mesajları ve mobil gezinme.
- [ ] Aynı ZIP'i tekrar yükleme: ikinci uzantı kaydı yok; tercihler ve modül ayarları korunuyor.
- [ ] Kaldırma: önce Cassiopeia'yı varsayılan yapın ve Rahisi menü atamalarını kaldırın;
  sonra Rahisi paketini kaldırın. Cassiopeia ve içerik korunmalı.

Tarayıcı tercihlerinin sunucudan kaldırma ile silinmesi mümkün değildir. Kaldırmadan
önce Sıfırla kullanın veya tarayıcıdaki bu siteye ait `rahisi:v1:<site-yolu>` anahtarını silin.

## JED Checker

Kurulum ZIP'inin `constituents/` klasöründe üç bağımsız uzantı ZIP'i vardır.
Checker paket taramasını desteklemiyorsa bunları ayrı ayrı tarayın; alt şablonun
JED dağıtım kategorisine uygunluğu ayrıca değerlendirilecek. Bu bir JED onayı değildir.
Kaynaklar artık ayrı `rahisi-source-0.1.0-alpha2.zip` dosyasındadır; kaynak ZIP'ini
Joomla'ya yüklemeyin ve JED kurulum paketi taramasına vermeyin.
Yazar: JoomTheme / support@joomtheme.com / https://joomtheme.com.
Update server manifestte tanımlandı; hedef GitHub deposu ve yayın henüz hazır değil.
Yayın tamamlanana kadar Sistem > Güncelleme Siteleri bölümünde Rahisi Updates'i
devre dışı bırakın; aksi halde erişim uyarısı alabilirsiniz. Yayın için PUBLISHING-TR.md.

## Alpha1 üzerinden yükseltme

Yeni ZIP'i önceki paketi kaldırmadan aynı siteye yükleyin. Paket ve üç uzantının
sürümü 0.1.0-alpha2 olmalı; mevcut modül/şablon atamaları korunmalıdır.
Önbelleği temizleyin ve JED Checker'ı yeni kurulum ZIP'iyle yeniden çalıştırın.
Alpha1'de güncelleme sunucusu olmadığı için ilk geçiş elle ZIP yükleme ile yapılır.

## Geri bildirim biçimi

Joomla sürümü / PHP sürümü / tarayıcı / site dili / önbellek durumu:

Hatanın oluştuğu adımlar ve beklenen/gerçek sonuç:

JED Checker çıktısı, PHP hata satırı, ekran görüntüsü veya Console/Network hatası:

Şifre, cookie, oturum belirteci, configuration.php veya kişisel veri paylaşmayın.

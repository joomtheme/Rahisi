# Rahisi Alpha3 — yükseltme ve yeni ayarlar

Alpha2 için bildirdiğiniz sonuçlar: JED Checker geçti; Joomla kurulumu, metin ölçeği,
aralık, kontrast, sıfırlama ve sayfalar arasında tercih hatırlama çalıştı.
Bu sonuçlar Alpha3'ün otomatik olarak testten geçtiği anlamına gelmez.

## Yükseltme

Yedekli test sitesinde Alpha2'yi kaldırmadan `pkg_rahisi-0.1.0-alpha3.zip` yükleyin.
Kaynak ZIP'ini kurmayın. Joomla/tarayıcı önbelleğini temizleyin. Mevcut modül ve
şablon atamaları korunmalı; eklentiyi yeniden kurmanız veya yeni modül açmanız gerekmez.
Güncelleme adresleri henüz yayınlanmadı; Rahisi Updates kapalı kalsın.

## Şablon

Gelişmiş: site logosu, logo alternatif metni, site başlığı/açıklaması ve genişlik.
Logo yoksa özel başlık; özel başlık da boşsa Joomla Genel Yapılandırma'daki site adı
gösterilir. Hepsi boşsa Rahisi yazılır; Cassiopeia logosu artık varsayılan değildir.
Logo alt metni boşsa etkili site başlığı kullanılır. Medya yöneticisinden yerel görsel seçin.

Okuma varsayılanları: %100–200 metin ölçeği, 1.6/1.7/1.8 satır yüksekliği,
60/65/72ch makale genişliği ve üç renk paleti. 100% temel yazı boyutu 1.125rem'dir;
tarayıcının varsayılanı 16px ise 18px'e karşılık gelir. Bunlar sabit piksel zorlaması değildir.
Kayıtlı ziyaretçi tercihi varsayılan ölçeğin önüne geçer. Yeni varsayılanı kontrol etmek
için Sıfırla veya yeni tarayıcı profili kullanın. Aralık tercihi açıkken satır yüksekliği
makalede 2 olur; bu ziyaretçi tercihi de şablon varsayılanından önceliklidir.

## Modül

Okuma paneli seçenekleri: başlangıçta açık/kapalı, üç kontrolü ayrı göster/gizle,
kontroller altında açıklamaları göster/gizle.
Gizleme yalnız görünürlüğü etkiler; önceki ziyaretçi tercihini devre dışı bırakmaz.
Örneğin kontrast seçeneği gizlense bile önceden kaydedilmiş kontrast açık kalır.
Sıfırla her zaman görünürdür ve gizli olanlar dahil tüm tercihleri temizler.

## Öncelikli testler

- [ ] Alpha2 üzerine kurulum; dört uzantının sürümü Alpha3; mevcut atamalar korunuyor.
- [ ] JED Checker yeni kurulum ZIP'iyle geçiyor.
- [ ] Logo yok/başlık var, ikisi de boş, logo var/alt metin var ve boş senaryoları.
- [ ] Marka gösterimi kapalı; Türkçe, İngilizce, tırnak ve Türkçe karakterli başlık/alt metin.
- [ ] PNG/JPEG/WebP ve Joomla görsel boyut metadata'sı içeren yerel logo yolları.
- [ ] Varsayılan %125, kayıtlı tercih %150: %150 korunmalı; Sıfırla sonrası %125 olmalı.
- [ ] Her göster/gizle kombinasyonu; özellikle üç kontrol de gizliyken Sıfırla çalışmalı.
- [ ] İki modülün farklı görünürlük ayarlarında tercih senkronizasyonu.
- [ ] Açıklamalar kapalıyken boşa işaret eden aria-describedby yok; klavye ve ekran okuyucu.
- [ ] Üç palet, satır yüksekliği ve metin genişliği; tek makale, mobil ve %200 metin.
- [ ] JavaScript kapalı: site kimliği ve şablon varsayılanları görünür; panel kontrolleri pasif.
- [ ] Daha önce çalışan büyütme, aralık, kontrast, sıfırlama ve sayfalar arası hatırlama.

Bu sürüm yalnız bir şablon dosyasını özelleştirir: index.php, Cassiopeia 6.1.3 temelinde.
Çekirdek dosyalara dokunulmaz; sonraki Joomla güncellemelerinde bu override karşılaştırılmalı.

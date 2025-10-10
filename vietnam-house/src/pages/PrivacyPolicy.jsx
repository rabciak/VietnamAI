import { Mail, Phone, MapPin } from 'lucide-react'
import HeroBackground from '../components/HeroBackground'

export default function PrivacyPolicy() {
  return (
    <HeroBackground
      src="/background.jpg?v=2"
      alt="Vietnam House Background"
      opacity={40}
      overlayColor="black"
      overlayOpacity={65}
      enableVignette={true}
      topFade={true}
      bottomFade={true}
      className="min-h-screen"
    >
      <div className="min-h-screen">
        {/* Header */}
        <section className="py-16 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Polityka Prywatności
            </h1>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
            <p className="text-gray-300 text-center mt-4">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">1. Wprowadzenie</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
                przekazanych przez użytkowników w związku z korzystaniem ze strony internetowej
                restauracji Vietnam House.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Administratorem danych osobowych jest Vietnam House, z siedzibą w Zamościu
                przy ul. Prymasa Stefana Wyszyńskiego 4, 22-400 Zamość.
              </p>
            </section>

            {/* Data Controller */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">2. Administrator Danych</h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <p className="text-white font-semibold mb-3">Vietnam House</p>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p>Prymasa Stefana Wyszyńskiego 4</p>
                      <p>22-400 Zamość, Polska</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-secondary flex-shrink-0" size={20} />
                    <a href="tel:665559841" className="hover:text-white transition-colors">
                      665 559 841
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-secondary flex-shrink-0" size={20} />
                    <a href="mailto:kontakt@vietnamhouse.pl" className="hover:text-white transition-colors">
                      kontakt@vietnamhouse.pl
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Collected */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">3. Zbierane Informacje</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                W ramach prowadzonej działalności możemy zbierać następujące dane osobowe:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong className="text-white">Dane kontaktowe:</strong> imię, nazwisko, adres e-mail, numer telefonu</li>
                <li><strong className="text-white">Dane dotyczące rezerwacji:</strong> data, godzina, liczba gości</li>
                <li><strong className="text-white">Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny</li>
                <li><strong className="text-white">Pliki cookie:</strong> informacje o preferencjach użytkownika i aktywności na stronie</li>
              </ul>
            </section>

            {/* How Data is Used */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">4. Cel Przetwarzania Danych</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Zbierane dane osobowe przetwarzane są w następujących celach:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Obsługa rezerwacji stolików i potwierdzanie wizyt</li>
                <li>Komunikacja z klientami i odpowiedzi na zapytania</li>
                <li>Poprawa jakości świadczonych usług</li>
                <li>Analiza ruchu na stronie internetowej i optymalizacja jej działania</li>
                <li>Realizacja obowiązków prawnych ciążących na administratorze</li>
                <li>Marketing bezpośredni własnych produktów i usług (tylko za zgodą użytkownika)</li>
              </ul>
            </section>

            {/* Legal Basis */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">5. Podstawa Prawna</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dane osobowe przetwarzane są na podstawie:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Zgody użytkownika (art. 6 ust. 1 lit. a RODO)</li>
                <li>Umowy lub działań zmierzających do jej zawarcia (art. 6 ust. 1 lit. b RODO)</li>
                <li>Prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO)</li>
                <li>Obowiązku prawnego ciążącego na administratorze (art. 6 ust. 1 lit. c RODO)</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">6. Polityka Plików Cookie</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Nasza strona internetowa wykorzystuje pliki cookie (ciasteczka) – małe pliki tekstowe
                zapisywane na urządzeniu użytkownika, które pozwalają na zapamiętanie preferencji
                i ułatwiają korzystanie ze strony.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Rodzaje plików cookie:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>
                  <strong className="text-white">Cookie niezbędne:</strong> Umożliwiają podstawowe funkcje strony,
                  takie jak nawigacja i dostęp do zabezpieczonych obszarów
                </li>
                <li>
                  <strong className="text-white">Cookie preferencji:</strong> Zapamiętują wybory użytkownika
                  (np. język, region) dla lepszego doświadczenia
                </li>
                <li>
                  <strong className="text-white">Cookie analityczne:</strong> Pomagają zrozumieć, jak użytkownicy
                  korzystają ze strony poprzez zbieranie anonimowych danych statystycznych
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Zarządzanie plikami cookie:</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookie w swojej przeglądarce
                lub skorzystać z opcji "Ustawienia cookie" dostępnej w stopce strony. Należy jednak pamiętać,
                że zablokowanie niektórych plików cookie może wpłynąć na funkcjonalność witryny.
              </p>
            </section>

            {/* Data Sharing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">7. Udostępnianie Danych</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dane osobowe mogą być udostępniane:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Podmiotom przetwarzającym dane na zlecenie administratora (np. dostawcy usług IT, hosting)</li>
                <li>Organom uprawnionym do otrzymania danych na podstawie przepisów prawa</li>
                <li>Podmiotom współpracującym przy realizacji usług (np. dostawcy systemów rezerwacyjnych)</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-white">Ważne:</strong> Nie przekazujemy danych osobowych do państw trzecich
                ani organizacji międzynarodowych. Nie sprzedajemy ani nie udostępniamy danych osobowych
                w celach marketingowych podmiotom trzecim.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">8. Bezpieczeństwo Danych</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające ochronę danych osobowych:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Szyfrowanie przesyłanych danych (protokół HTTPS)</li>
                <li>Regularne kopie zapasowe danych</li>
                <li>Ograniczenie dostępu do danych osobowych tylko dla upoważnionych pracowników</li>
                <li>Regularne aktualizacje systemów zabezpieczeń</li>
                <li>Procedury reagowania na incydenty bezpieczeństwa</li>
              </ul>
            </section>

            {/* User Rights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">9. Prawa Użytkownika (RODO)</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Zgodnie z Rozporządzeniem o Ochronie Danych Osobowych (RODO), każdemu użytkownikowi przysługują następujące prawa:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
                <li>
                  <strong className="text-white">Prawo dostępu do danych:</strong> Użytkownik ma prawo uzyskać
                  potwierdzenie, czy przetwarzamy jego dane osobowe oraz dostęp do tych danych
                </li>
                <li>
                  <strong className="text-white">Prawo do sprostowania:</strong> Użytkownik ma prawo żądać
                  niezwłocznego sprostowania nieprawidłowych lub uzupełnienia niekompletnych danych
                </li>
                <li>
                  <strong className="text-white">Prawo do usunięcia ("prawo do bycia zapomnianym"):</strong> Użytkownik
                  ma prawo żądać usunięcia dotyczących go danych osobowych
                </li>
                <li>
                  <strong className="text-white">Prawo do ograniczenia przetwarzania:</strong> Użytkownik ma prawo
                  żądać ograniczenia przetwarzania swoich danych osobowych
                </li>
                <li>
                  <strong className="text-white">Prawo do przenoszenia danych:</strong> Użytkownik ma prawo otrzymać
                  swoje dane w ustrukturyzowanym formacie i przesłać je innemu administratorowi
                </li>
                <li>
                  <strong className="text-white">Prawo sprzeciwu:</strong> Użytkownik ma prawo w dowolnym momencie
                  wnieść sprzeciw wobec przetwarzania dotyczących go danych osobowych
                </li>
                <li>
                  <strong className="text-white">Prawo do cofnięcia zgody:</strong> W przypadku przetwarzania danych
                  na podstawie zgody, użytkownik może ją w każdej chwili wycofać
                </li>
                <li>
                  <strong className="text-white">Prawo wniesienia skargi:</strong> Użytkownik ma prawo wnieść skargę
                  do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                W celu realizacji powyższych praw należy skontaktować się z administratorem danych pod adresem:{' '}
                <a href="mailto:kontakt@vietnamhouse.pl" className="text-primary hover:text-primary/80 underline">
                  kontakt@vietnamhouse.pl
                </a>
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">10. Okres Przechowywania Danych</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dane osobowe przechowywane są przez okres:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Niezbędny do realizacji celów, dla których zostały zebrane</li>
                <li>Wymagany przepisami prawa (np. przepisy podatkowe - 5 lat)</li>
                <li>Do momentu wycofania zgody na przetwarzanie danych</li>
                <li>Do czasu wniesienia skutecznego sprzeciwu wobec przetwarzania danych</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Po upływie okresu przechowywania dane są bezpiecznie usuwane lub anonimizowane.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">11. Usługi Podmiotów Trzecich</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Nasza strona może korzystać z następujących usług zewnętrznych:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>
                  <strong className="text-white">Google Maps:</strong> Do wyświetlania lokalizacji restauracji
                  (jeśli jest używane). Google może zbierać dane zgodnie z własną polityką prywatności.
                </li>
                <li>
                  <strong className="text-white">Hosting:</strong> Dane są przechowywane na bezpiecznych
                  serwerach dostawcy usług hostingowych.
                </li>
                <li>
                  <strong className="text-white">Media społecznościowe:</strong> Linki do naszych profili
                  w mediach społecznościowych (Facebook) mogą używać plików cookie tych platform.
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Zachęcamy do zapoznania się z politykami prywatności tych podmiotów.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">12. Prywatność Dzieci</h2>
              <p className="text-gray-300 leading-relaxed">
                Nasza strona nie jest skierowana do osób poniżej 16 roku życia. Nie zbieramy świadomie
                danych osobowych od dzieci. Jeśli rodzic lub opiekun dowie się, że jego dziecko przekazało
                nam dane osobowe bez zgody, prosimy o kontakt pod adresem kontakt@vietnamhouse.pl,
                a dane zostaną niezwłocznie usunięte.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">13. Zmiany w Polityce Prywatności</h2>
              <p className="text-gray-300 leading-relaxed">
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
                O wszelkich zmianach użytkownicy zostaną poinformowani poprzez umieszczenie nowej wersji
                polityki na stronie internetowej wraz z datą aktualizacji. Zalecamy regularne przeglądanie
                tej strony w celu zapoznania się z ewentualnymi zmianami.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">14. Kontakt</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                W przypadku pytań dotyczących niniejszej Polityki Prywatności lub sposobu przetwarzania
                danych osobowych, prosimy o kontakt:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <Mail className="text-secondary flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-medium mb-1">Email:</p>
                      <a href="mailto:kontakt@vietnamhouse.pl" className="hover:text-white transition-colors">
                        kontakt@vietnamhouse.pl
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-secondary flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-medium mb-1">Telefon:</p>
                      <a href="tel:665559841" className="hover:text-white transition-colors">
                        665 559 841
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-secondary mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-medium mb-1">Adres:</p>
                      <p>Vietnam House</p>
                      <p>Prymasa Stefana Wyszyńskiego 4</p>
                      <p>22-400 Zamość, Polska</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Note */}
            <section className="bg-secondary/10 border border-secondary/30 rounded-lg p-6 mt-8">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Nota prawna:</strong> Niniejsza Polityka Prywatności została
                przygotowana zgodnie z wymogami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
                osobowych i w sprawie swobodnego przepływu takich danych (RODO) oraz ustawą o ochronie danych
                osobowych.
              </p>
            </section>
          </div>
        </div>
      </div>
    </HeroBackground>
  )
}

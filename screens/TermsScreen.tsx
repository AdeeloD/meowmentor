import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Általános Szerződési Feltételek</Text>
      <Text style={styles.content}>
        {`MeowMentor Kft. Általános Szerződési Feltételek (ÁSZF)

1. Bevezető rendelkezésekEz a dokumentum a MeowMentor Kft. (székhely: 2407 Dunaújváros, Dózsa György út 37.; e-mail: meowmeowmentorpurr@gmail.com; cégjegyzékszám: 09-10-987654; adószám: 98765432-1-09) által fejlesztett "MeowMentor" mobilalkalmazás (a továbbiakban: "Alkalmazás") használatának feltételeit rögzíti.

2. Az Alkalmazás célja és szolgáltatásaiA MeowMentor az alábbi funkciókkal segíti a macskatulajdonosokat:

Szakértői tippek és cikkek macskák etetéséről, egészségéről és viselkedéséről.

Emlékeztetők állatorvosi vizsgálatokra, féregtelenítésre és oltásokra.

Naplózás és nyomon követés (pl. étkezési szokások, egészségi állapot).

Interaktív tanácsadó és közösségi funkciók.

3. Használati feltételek

Az alkalmazás ingyenesen letölthető, de prémium funkciók vásárlást igényelhetnek.

A prémium funkciókhoz előfizetés szükséges.

A használat alsó korhatára 6 év, 18 év alatt szülői hozzájárulás ajánlott.

4. Tiltott tevékenységekTilos:

Illetéktelen vagy sértő tartalmak feltöltése.

Más felhasználók zaklatása vagy félrevezetése.

Az alkalmazás funkcióinak visszaélésszerű használata.

5. AdatkezelésAz alkalmazás az alábbi személyes adatokat gyűjti:

Név, e-mail cím, profilkép.

Helyadatok (opcionálisan, funkciók optimalizálására).

Push értesítések küldése a beállításoknak megfelelően.

6. Fizetés és visszatérítés

A fizetések az App Store és Google Play biztonságos rendszerén keresztül történnek.

Indokolt esetben 3 napon belül visszatérítés kérhető.

7. FelelősségkorlátozásA MeowMentor Kft. mindent megtesz a zavartalan működés érdekében, de nem vállal felelősséget technikai problémákból vagy adatvesztésből eredő károkért.

8. Szellemi tulajdonjogokAz Alkalmazás teljes tartalma (szoftverkód, grafika, szövegek) a MeowMentor Kft. tulajdona, annak másolása vagy engedély nélküli felhasználása tilos.

9. Záró rendelkezésekAz ÁSZF a magyar jogszabályok alapján készült, és Magyarország területén érvényes. A MeowMentor Kft. fenntartja a jogot a feltételek módosítására.

Kelt: Budapest, 2025. március 13.`}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TermsScreen;
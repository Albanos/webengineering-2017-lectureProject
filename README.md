# Überblick
Dies ist das Repository der Projektaufgabe, welche im Rahmen der Veranstaltung Webengineering im Sommersemester 2017 entwickelt wurde.

## Installation des Projektes
Das Projekt wurde mit Maven entwickelt. Demzufolge ist nach dem Checkout aus diesem repository der Download und die Integration der genutzten Dependencys mit folgendem Befehl möglich:
```
mvn install clean
```

Das Frontend wurde mit unteranderem mit Webpack entwickelt. Um dieses starten zu können, gilt es zum frontend-verzeichnis zu navigieren und dort folgenden Befehl auszuführen:
```
npm start
```
welcher ein webpack-skript ausführt, was für den Bau des Frontends verantwortlich ist.

Nach dem Ausführen dieses Befehls ist der Login-screen der Anwendung über das Frontend durch folgende URL erreichbar:
```
http://localhost:8080/#/user/login
```

## Nutzung der Anwendung über das Frontend

### Anmeldevorgang und Kontoeröffnung
Nachdem das Frontend über die obige URL gestartet wurde, muss zunächst ein Login erfolgen. Bereits während des Login-Vorgangs ist im Kopf der Anwendung eine Navigations-leiste zu sehen, über die bereits jetzt die Sprache eingestellt werden kann (DE = Deutsch, EN = Englisch). 

Existiert noch kein eigener Account, kann dieser über den Login-Bildschirm angelegt werden (oben rechts). Nach dem Klick erscheint ein Formular, in welchem die Mail-Adresse, ein Passwort und der spezifische User-text verlangt wird. Nach dem ausfüllen des Formular kann der User sich über einen klick auf den Button ein Konto einrichten und sich direkt anmelden.


### Aktueller Benutzer und dessen Listen
Nach dem Anmelde-vorgang gelangt der User zu seinem Profil ("Aktueller Benutzer"). Dort kann der User sehen wem er folgt, wer ihm folgt und mit welchen Usern es Treffer gibt. Die einzelnen Kategorien lassen sich durch einen klick auf den jeweilligen Kategorie-namen auf- und zuklappen, wobei die erste Kategorie ("Folge ich") immer direkt aufgeklappt ist. Nach einem Klick auf die Kategorie "Treffer" werden die User angezeigt, die den User liken und die gleichzeitig von dem User gelikt werden. Nach einem Klick auf den entsprechenden User gelangt man zum Chat-Bereich.


### Chat-Bereich und Benachrichtigungen
Im Chat-Bereich ist als erste Nachricht der Usertext des Partners zu sehen. Die eigenen Nachrichten werden links, die des Chat-partners rechts angezeigt. Unmittelbar nach dem Login wird ein Timer gestartet, der die neuen Nachrichten in einem Intervall von fünf Sekunden abfragt. Sobald für den eingeloggten User neue Nachrichten eingehen (und dieser zu diesem Zeitpunkt nicht auf dem jeweilligen Chat-Bereich ist) wird er über ein Info-Alert-Fenster oben rechts benachrichtigt. Das Fenster teilt dem User zum einen mit, dass eine neue Nachricht vorliegt und zum anderen auch von wem (gehen mehrere Nachrichten ein, werde die jeweilligen Absender in diesem Fenster komma-separiert gelistet). Diese Nachricht bleibt solange sichtbar, bis der User entweder den jeweilligen Chat-Bereicht betritt und damit die Nachricht liest (bei mehreren Usern verschwindet dann eben nur dieser aus dem Alert-Fenster, die anderen bleiben) oder der User das Fenster "manuell" über ein x-Symbol schliesst. Damit bestätigt der User, dass er Kenntnis von den neuen Nachrichten hat. Betätigt der User das x-symbol des Alert-Fensters, wird dieses geschlossen und popt erst dann wieder auf, wenn wieder neue Nachrichten eintreffen 

Ein Beispiel-Szenario: 
User A schickt an User B eine Nachricht. User B ist nicht im Chat-Bereich von User A, wird also benachrichtigt. User B schließt nach Kenntnisnahme das Alert-Fenster manuell. Nun schickt User A erneut eine NAchricht an User B. User B würde nun wieder eine Alert-Benachrichtigung erhalten)


### Trefferspiel
Über die Navigations-leiste ist auch das Treffer-Spiel erreichbar. Dort können Texte, die von einem User noch nicht kategorisiert wurden (like oder dislike) angesehen und bewertet werden. Je nach Entscheidung werden die Texte dem Benutzer zugeordnet: gelikte wie auch nicht gelikte texte werden in Listen des Users abgelegt und danach nicht mehr im Treffer-Spiel angezeigt.

## Fehlerbehandlung
Ist der Login-vorgang oder die Konto-einrichtung nicht möglich, erscheinen entsprechende Alarm-banner auf dem Bildschirm (natürlich immer in der jeweills gesetzten Sprache). Werden beim Treffer-spiel alle Benutzertexte "aufgebraucht" (weil alle Texte von einem User bereits bewertet wurden) erscheint ebenfalls ein entsprechendes Alarm-Fenster auf dem Bildschirm mit einem entsprechenden Hinweis.
Sollte der User versuchen über die URL aus seinem Browser-verlauf zu einer bestimmten Seite zu springen, ohne dabei angemeldet zu sein, wird er automatisch an den Login-bereich weitergeleitet, wo ein login oder eben eine Konto-Anlegung möcglich ist.

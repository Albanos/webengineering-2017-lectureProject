# Überblick
Dies ist das Repository der Projektaufgabe, welche im Rahmen der Veranstaltung Webengineering im Sommersemester 2017 entwickelt wurde.

## Installation des Projektes
Grundvoraussetzungen für das Ausführen der Anwendung sind folgende Programme:
* Maven
* NodeJS und NPM

Nach dem Checkout aus diesem Repository ist der Download und die Integration der genutzten Dependencys mit folgendem Befehl möglich:
```
mvn install clean
```
### Frontend einrichten und starten
Das Frontend wurde unteranderem mit Webpack entwickelt. Um dieses starten zu können, gilt es folgende Befehle auszuführen:
```
cd src/main/frontend
npm install
npm start
```
Diese führen ein webpack-skript aus, was für den Bau des Frontends verantwortlich ist.

Nach dem Ausführen dieses Befehls ist der Login-screen der Anwendung über das Frontend durch über URL erreichbar:
```
http://localhost:8080/#/user/login
```

## Nutzung der Anwendung über das Frontend

### Anmeldevorgang und Kontoeröffnung
Nachdem das Frontend über die obige URL gestartet wurde, muss zunächst ein Login erfolgen. Bereits während des Login-Vorgangs ist im Kopf der Anwendung eine Navigations-leiste zu sehen, über die bereits jetzt die Sprache eingestellt werden kann (DE = Deutsch, EN = Englisch). 

Existiert noch kein eigener Account, kann dieser über den Login-Bildschirm angelegt werden (oben rechts). Nach dem Klick erscheint ein Formular, in welchem die Mail-Adresse, ein Passwort und ein spezifischer User-text verlangt wird. Nach dem ausfüllen des Formulars kann der User sich über einen klick auf den Button ein Konto einrichten und sich direkt anmelden.


### Aktueller Benutzer und dessen Listen
Nach dem Anmeldevorgang gelangt der User zu seinem Profil ("Aktueller Benutzer"). Dort kann der User sehen wem er folgt, wer ihm folgt und mit welchen Usern es Treffer gibt. Die einzelnen Kategorien lassen sich durch einen klick auf den jeweilligen Kategorienamen auf- und zuklappen, wobei die erste Kategorie ("Folge ich") immer direkt aufgeklappt ist. Nach einem Klick auf die Kategorie "Treffer" werden die User angezeigt, die den User liken und die gleichzeitig von dem User geliket werden. Nach einem Klick auf einen User gelangt man zum Chat-Bereich mit diesem.


### Chat-Bereich und Benachrichtigungen
Im Chat-Bereich ist als erste Nachricht der Usertext des Partners zu sehen. Die eigenen Nachrichten werden links, die des Chat-partners rechts angezeigt. Unmittelbar nach dem Login wird ein Timer gestartet, der die neuen Nachrichten in einem Intervall von fünf Sekunden abfragt. Sobald für den eingeloggten User neue Nachrichten eingehen (und dieser zu diesem Zeitpunkt nicht in dem jeweilligen Chat-Bereich ist) wird er über ein Info-Popup oben rechts benachrichtigt. Das Fenster teilt dem User zum einen mit, dass eine neue Nachricht vorliegt und zum anderen auch von wem (gehen mehrere Nachrichten ein, werde die jeweilligen Absender in diesem Popup komma-separiert gelistet). Diese Nachricht bleibt solange sichtbar, bis der User entweder den jeweilligen Chat-Bereicht betritt und damit die Nachricht liest (bei mehreren Usern verschwindet dann eben nur dieser aus dem Popup-Fenster, die anderen bleiben) oder der User das Fenster "manuell" über ein x-Symbol schliesst. Damit bestätigt der User, dass er Kenntnis von den neuen Nachrichten hat. Betätigt der User das x-symbol des Popup-Fensters, wird dieses geschlossen und popt erst dann wieder auf, wenn wieder neue Nachrichten eintreffen.

### Trefferspiel
Über die Navigationsleiste ist auch das Treffer-Spiel erreichbar. Dort können Texte, die von einem User noch nicht kategorisiert wurden (like oder dislike) angesehen und bewertet werden. Je nach Entscheidung werden die Texte dem Benutzer zugeordnet: gelikte wie auch nicht gelikte texte werden in Listen des Users abgelegt und danach nicht mehr im Treffer-Spiel angezeigt. Die gelikten Usertexte sind im Bereich "Aktueller Benutzer" unter der Liste "Folge ich" zu finden.

### Fehlerbehandlung
Ist der Loginvorgang oder die Kontoeinrichtung nicht möglich, erscheinen entsprechende Alarm-banner auf dem Bildschirm (natürlich immer in der jeweills gesetzten Sprache). Werden beim Treffer-spiel alle Benutzertexte "aufgebraucht" (weil alle Texte von einem User bereits bewertet wurden) erscheint ebenfalls ein Alarm-Fenster auf dem Bildschirm mit einem entsprechenden Hinweis.
Sollte der User versuchen über die URL aus seinem Browserverlauf zu einer bestimmten Seite zu springen, ohne dabei angemeldet zu sein, wird er automatisch an den Login-Bereich weitergeleitet, wo ein Login oder eben eine Konto-Anlegung möglich ist.

## Datenbestand, Initialzustand & Neustart
### Lokal
Die Datenbank der Anwendung verfügt über acht Benutzer (siehe im Projekt -> src -> main -> resources -> data-h2.sql). Der Datei ist auch zu entnehmen, in welcher Beziehung die User zueinander stehen (bspw. besteht ein Match zwischen Luan und Rovi). Um übergroße Datenmengen in der Datenbank zu verhindern und um nach jedem Neustart immer wieder den Initialzustand zu besitzen, wird dieser Initialzustand **nach jedem Neustart der Anwendung wiederhergestellt.** Um dies zu verhindern, muss der Inhalt der Datei data-h2.sql auskommentiert werden.

### Unter Heroku
Die Postgres-Datenbank, welche für die Persistierung unter Heroku verantwortlich ist, verfügt über exakt den selben Datenbestand, wie die lokale Version. Die deployte Onlineversion ist unter der folgenden URL erreichbar:
```
https://webengineering-2017-project.herokuapp.com/
```
Da hier kein "Neustart" der Anwendung durchgeführt wird, **bleiben die durchgeführten Operationen erhalten (like/dislike,...).** Erst nachdem die Anwendung über Heroku neugestartet wird, wird der selbe Initialzustand wie zuvor (und auch wie bei jedem Neustart der lokalen Anwendung) wiederhergestellt.

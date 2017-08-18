# Überblick
Dies ist das Repository der Projektaufgabe, welche im Rahmen der Veranstaltung Webengineering entwickelt wurde.

## Installation des Projektes
Das Projekt wurde mit Maven entwickelt. Demzufolge ist nach dem Checkout aus diesem repository der Download und die Integration der genutzten Dependencys mit folgendem Befehl möglich:
```
mvn instll clean
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
Nachdem das Frontend über die obige URL gestartet wurde, muss zunächst ein Login erfolgen. Bereits während des Login-Vorgangs ist im Kopf der Anwendung eine Navigations-leiste zu sehen, über die bereits jetzt die Sprache eingestellt werden kann (DE = Deutsch, EN = Englisch). 

Existiert noch kein eigener Account, kann dieser über den Login-Bildschirm durchgeführt werden (oben rechts). Nach dem Klick erscheint ein Formular, in welcher die Mail-Adresse, ein Passwort und der spezifische User-text verlangt wird. Nach dem ausfüllen des Formular kann der User sich über einen klick auf den Button ein Konto einrichten und sich direkt anmelden.

Nach dem Anmelde-vorgang gelangt der User zu seinem Profil ("Aktueller Benutzer"). Dort kann der User sehen wem er folgt, wer ihm folgt und mit welchen Usern es Treffer gibt. Die einzelnen Kategorien lassen sich durch einen klick auf den jeweilligen Kategorie-namen auf- und zuklappen, wobei die erste Kategorie ("Folge ich") immer direkt aufgeklappt ist. Nach einem Klick auf die Kategorie "Treffer" werden die User angezeigt, die von den User liken und die gleichzeitig vom User gelikt werden. Nach einem Klick auf den entsprechenden User gelangt man zum Chat-Bereich.

Im Chat-Bereich ist als erste Nachricht der Usertext des Partners zu sehen. Die eigenen Nachrichten werden links, die des Chat-partners rechts angezeigt. Die jeweilligen Nachrichten werden in einem Intervall von fünf sekunden abgefragt. Sobald der Bildschirm verlassen wird, wird dieser Timer zurück gesetzt/gestoppt.

Über die Navigations-leiste ist auch das Treffer-Spiel erreichbar. Dort können Texte, die von einem User noch nicht kategorisiert wurden (like oder dislike) angesehen und bewertet werden. Je nach Entscheidung werden die Texte dem Benutzer zugeordnet: gelikte wie auch nicht gelikte texte werden in Listen des Users abgelegt und danach nicht mehr im Treffer-Spiel angezeigt.

## Fehlerbehandlung
Ist der Login-vorgang oder die Konto-einrichtung nicht möglich, erscheinen entsprechende Alarm-banner auf dem Bildschirm (natürlich immer in der jeweills gesetzten Sprache). Werden beim Treffer-spiel alle Benutzertexte "aufgebraucht" (weil alle Texte von einem User bereits bewertet wurden) erscheint ebenfalls ein entsprechendes Alarm-Fenster auf dem Bildschirm mit einem entsprechenden Hinweis.
Sollte der User versuchen über die URL aus seinem Browser-verlauf zu einer bestimmten Seite zu springen, ohne dabei angemeldet zu sein, wird er automatisch an den Login-bereich weitergeleitet, wo ein login oder eben eine Konto-Anlegung möcglich ist.

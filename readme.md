<h1>Sumsi Malwettbewerb Webseite</h1>

<p>Dieses Repository stellt ein Übungsprojekt dar. Es enthält alle Dateien für die Sumsi Malwettbewerb Webseite, die als Gruppenprojekt in 2er Teams im Rahmen der Coding Challenge 2 an der Coding School Wörthersee erstellt wurde.</p>

<h2>Inhalt</h2>
<ul>
<li>Allgemeine Informationen</li>
<li>Installation</li>
<li>Projektstruktur</li>
<li>Verwendung</li>
<li>Features</li>
<li>API-Dokumentation</li>
</ul>

<h2>Allgemeine Informationen</h2>
<p>Die Sumsi Malwettbewerb Webseite ermöglicht es Kindern, zum Weltspartag selbst gemalte Bilder einzureichen. Die Webseite bietet folgende Funktionen:</p>

<ul>
<li>Bilder hochladen</li>
<li>Bilder anderer User:innen durchsuchen</li>
<li>Bilder bewerten</li>
</ul>

<h2>Installation</h2>

<h3>Voraussetzungen</h3>
<ul>
<li>Node.js</li>
<li>npm (Node Package Manager)</li>
<li>Git</li>
</ul>

<h3>Schritt-für-Schritt-Anleitung</h3>
<ol>
<li>Repository klonen:<br> 
<code>git clone https://github.com/christina-sfmn/SumsiMalwettbewerb.git</code></li>
<li>In das Verzeichnis wechseln:<br> 
<code>cd SumsiMalwettbewerb</code></li>
<li>Abhängigkeiten installieren:<br> 
<code>npm install</code></li>
</ol>

<h2>Projektstruktur</h2>
<p>Die Struktur des Projekts ist wie folgt aufgebaut:</p>

<p>
.<br> 
- assets<br> 
–– fonts<br>
–– icons<br> 
–– img<br> 
–– logos<br> 
- node_modules<br> 
- src<br> 
–– cookies.html<br> 
–– datenschutz.html<br> 
–– index.html<br> 
–– teilnahmebedingungen.html<br> 
–– mobilenav.js<br> 
–– script.js<br> 
–– scriptTranslate.js<br> 
–– input.css<br> 
–– output.css<br> 
- README.md<br> 
- tailwind.config.js<br> 
- package-lock.json<br>
- package.json<br> 
- SumsiMalwettbewerb_Landingpage_Screendesign.pdf
</p>

<h2>Verwendung</h2>
<p>Um die Anwendung lokal zu starten, folgenden Befehl ausführen:</p>
<p><code>npm start</code></p>
<p>Zum Öffnen der Website in den Ordner "src" navigieren und dort Doppelkick auf die Datei "index.html". Alternativ die Datei per Drag and Drop in einen beliebigen Browser ziehen.</p>

<h2>Features</h2>
<ul>
<li><strong>Allgemeine Informationen:</strong> Informationen zum Wettbewerb in Textform.</li>
<li><strong>Bilder hochladen:</strong> Über ein Formular kann pro E-Mail-Adresse ein Bild hochgeladen werden. Zustimmung zu Datenschutzbedingungen, Teilnehmebedingungen und Verständigung per Mail sind erforderlich. Der Upload ist bis zum 01.11.2024 möglich. Danach wird eine entsprechende Meldung angezeigt und das Formular ausgeblendet. Zu Testzwecken kann das Datum über die hinterlegten Variablen in der Datei "script.js" beliebig verändert werden.</li>
<li><strong>Bildergalerie:</strong> Auflistung aller eingereichten Bilder in einer Bildergalerie mit Bewertungssystem. Die Möglichkeit zu Voten ist ab dem 02.11.2024 bis zum 05.11.2024 freigegeben. Wird zu einem anderen Zeitpunkt versucht eine Stimme abzugeben, erscheint eine entsprechende Fehlermeldung. Zu Testzwecken kann das Datum auch hier über die hinterlegten Variablen in der Datei "script.js" beliebig verändert werden. Mit einer E-Mail-Adresse können insgesamt 5 Stimmen abgegeben und für jedes Bild kann nur 1x pro E-Mail-Adresse abgestimmt werden.</li>
<li><strong>Info / Bedingungen:</strong> Entsprechende Verlinkungen zu Datenschutz, Teilnahmebedingungen, Impressum, AGB, Disclaimer, und Cookie Richtlinien sowie Kontaktdaten befinden sich im Footer.</li>
<li><strong>Mehrsprachigkeit:</strong> Die Website wird standardmäßig auf Deutsch angezeigt. Mittels Buttons in der Headerbar kann zwischen Deutsch und Englisch gewechselt werden. Zu beachten ist, dass in diesem Repository der Google-API-Key zum Schutz von Daten entfernt wurde. Um die Funktionalität der Mehrsprachigkeit zu nutzen, ist es erforderlich einen entsprechenden Account anzulegen, einen API-Key zu erstellen und diesen in der scriptTranslate-Datei einzufügen.</li>
<li><strong>Barrierefreiheit:</strong> WCAG-AA-Standard erfüllt.<br> 
Google Lighthouse Accessibility Score: 100</li>
<li><strong>Performance:</strong> Bilder wurden in für Web optimierter Größe eingebungen und lazy loading wurde aktiviert sowie die Anzeige der Einreichungen in der Galerie auf 6 Bilder beschränkt, um die Ladezeit nicht zu beeinträchtigen.<br> 
Google Lighthouse Performance Score: Zwischen 95-100<br> 
Google Lighthouse Best Practices Score: 100</li>
</ul>

<h2>API-Dokumentation</h2>
<p>Die API-Dokumentation ist unter folgendem Link zu finden: <a href="https://sumsi.dev.webundsoehne.com/docs/">sumsi.dev.webundsoehne.com/docs/</a></p>

<p>Die Authentifizierung erfolgt mittels HTTP Basic Auth. Die Zugangsdaten sind der API-Dokumentation zu entnehmen.</p>

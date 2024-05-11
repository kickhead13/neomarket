# HTTPS
Pentru securizarea conexiunii dintre utilizator și site, vom folosi protocolul HTTPS.
Pentru a rula serverul cu HTTPS este nevoie de o cheie și un certificat de securitate, care vor fi distribuite în mod privat.
## Prerequisites
Este necesar node.js, și dependințele specificate în `package.json`. Pentru a le instala, navigați la `src/frontend` și rulați `npm install`.

Înainte de a porni serverul Node cu HTTPS, trebuie să avem folderul `src/frontend/TLS` cu fișierele `cert.key` și `cert.crt`. Acestea nu sunt incluse în repository din motive de securitate și vor fi adăugate local.

Trebuie să aveți permisiunea să folosiți portul 443. (Pe Linux s-ar putea să fie necesar să rulați NPM cu sudo)
## Pornire server cu HTTPS
Din `src/frontend`, rulați `npm run start:https` pentru a folosi configurația de environment pentru HTTPS. Serverul ar trebui să se deschidă ca în mod normal, dar browserul ar putea să dea o avertizare de securitate. Asta este normal în cazul nostru, doar selectați că înțelegeți riscul și continuați.

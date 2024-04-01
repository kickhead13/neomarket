# Săptămâna 6 

## Obiective
 - FrontEnd
    - interfață basic funcțională:
        - login / sign up screen
        - home page
    - ar trebui să ne interesăm despre cum luăm
    parametrii din link-uri în reactJS
    ```
    http://site.com/apicall?param1=idk&param2=idk&...
    ```
    - obs:
        - acestea nu trebuie să fie funcționale
        - sunt doar de aspect (deocamdată)
        - ar fi bine să fie "responsive" (nu este neapărat)
        - nu trebuie să arate perfect, dar
        măcar să arate că avem o idee de cum să arate
        - eu cu Doru ne-am gândit că ar merge ca site-ul
        să fie albastru și alb, și orice nuață a culorilor
        astea care "merg" împreună
    
 - BackEnd
    - vom rezolva arhitectura bazei de date
    - vom începe proiectarea bazei de date
    - vom începe lucru în developarea modulelor
    pentru API-call-uri
        - vom afla cum comunicăm cu bd de firebase
        - vom realiza subrutine de C.R.U.D. pentru
        baza de date

## Resurse
 - FrontEnd
    - React tutorial începători: https://www.w3schools.com/REACT/DEFAULT.ASP
    - Router pentru React: https://www.w3schools.com/react/react_router.aspa
    - Parametrii link: https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
    - Login page template:
        - https://clerk.com/blog/building-a-react-login-page-template
        - https://www.youtube.com/watch?v=kghwFYOJiNg

 - BackEnd
    - Firebase: 
        - https://console.firebase.google.com
        - https://firebase.google.com
    - NodeJS HTTP/API:
        - https://nodejs.org/dist/latest-v18.x/docs/api/
        - https://nodejs.org/dist/latest-v18.x/docs/api/globals.html
        - https://rapidapi.com/guides/node-js-fetch-api
    - Rust API:
        - https://hub.qovery.com/guides/tutorial/create-a-blazingly-fast-api-in-rust-part-1/
        - https://www.youtube.com/watch?v=PbCBlOKcuOo

## Observații
 - aș vrea ca proiectul să fie relativ documentat, ca atare:
    - împreună cu fiecare commit / push aș vrea să adăugați, în docs/frontend sau docs/backend (după caz), într-un document numit "DOCUMENTAȚIE.pdf" sau ".docx" (etc.) câte un capitol sau subcapitol în care să fie explicate funcționalitățiile noi implementate
    - în plus, dacă funcționalitățile noi adăugate sunt importante, să se adauge, în examples/frontend sau examples/backend, un nou subfolder, cu numele funcționalității, în care să fie exemplificată utilizarea acesteia
    - exemple:
        - am creat un login page: adaug în docs/frontend/DOCUMENTAȚIE.pdf un capitol în care explic ce faceși cum, apoi adaug în examples/frontend/loginpage o filă text care explică cum să rulez pagina de login
        - am creat un API call: adaug în docs/backend/DOCUMENTAȚIE.pdf un capitol în care explic cum să apelez API-call-ul din frontend / cum funcționează call-ul / ce face etc., apoi adaug în examples/backend/apicall1 un exemplu de cod React în care îl folosesc (codul nu trebuie să funcționeze, dar ar trebui să-mi dea o idee de cum să folosesc API-ul)
 - în plus, aș vrea ca proiectul să fie testat
    - nu vreau să existe teste pentru absolut fiecare subrutină gen suma_numere(a,b), etc.
    - aș vrea ca în tests/ să găsesc unul sau două teste pentru funcționalitățiile mai mari
 - vom implementa un sistem de puncte ca să facem cv:
    - la finalul fiecărei săptămâni voi acorda între 1 și 2 puncte fiecărui membru în funcție de câte
    lucruri au fost realizate de către membru
    - totalul punctelor vor fi găsite în subfolder-ul puncte/
    - la finalul proiectului, dacă trecem, împărțim nota în funcție de punctele astea
    - dacă la finalul săptămânii primesc mai puțin de 2 puncte pt. că n-am făcut o sarcină, dar termin sarcina mai târziu, pot primii punctele pe care le-am ratat dar nu în totalitate (să zicem că am primit 1 că n am făcut nimic săpt. 6, dar fac tot ce aveam de făcut în săpt. 6 în săpt. 9 sau 10 sau 11 whatev. atunci nuprimesc 2 primesc nush 1.8)

# Observație Document
<h2> Tot ce este scris mai sus este (mai mult sau mai puțin) negociabil, nu e bătut în cuie, dacă nu vă convine îmi scrieți.<h2>


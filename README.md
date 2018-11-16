Media Searcher
===

> Merk at produksjonsapplikasjonen er tilgjengelig på `http://it2810-20.idi.ntnu.no/`, og ikke `http://it2810-20.idi.ntnu.no/prosjekt4`. Prosjekt 2 kan fortsatt aksesseres på `http://it2810-20.idi.ntnu.no/prosjekt2`

# Komme i gang

## Installer dependencies

1. **back-end** `npm install`
2. **front-end** `cd client && npm install`

## Bygge front-end

1. `cd client` (om du ikke allerede er der)
2. `npm run build` eller `npm run build:prod` for produksjonspakkene

> Alternativt kan du også i roten av prosjektet kalle `npm run build --prefix './client'`, for å bygge front-end

## Starte serveren

Her er det viktig at du har Docker installert på systemet ditt. Bruker du windows kan dette være litt problematisk, da dette krever Hyper-V.

1. `docker-compose up`. Dette kan ta litt tid første gangen, siden den skal bygge hele prosjektet, og hente ned mongodb
2. Besøk siden på `localhost:3000`

> Docker compose vil lete etter filen `docker-compose.yml`, som inneholder en spesifikasjon på hvordan vi vil at applikasjonen skal se ut og hva den trenger. Det er også mulig å bruke egendefinerte navn, men da må du spesifisere dette til docker-compose: `docker-compose -f <ditt filnavn> up`.

### Starte serveren uten docker

Merk at det skal være mulig å bare kjøre serveren ved hjelp av `npm`, da vi hovedsakelig bruker docker-compose til å enkelt koble sammen back-end og databasen. Men dette er lite testet og krever noden manuelle steg fra din side

1. Start mongodb. Se guides for hvordan dette gjøres på ditt OS. MongoDB bør være tilgjengelig på localhost, uten noe form for autentisering.
2. Påse at du har nodejs versjon som er større eller lik versjon `v8.9.1` (vi brukes `ES6` syntaks og `async/await`). Tidligere versjoner kan fungere, men har ikke blitt testet.
3. Start serveren ved å kjøre `OMDB_API_KEY=a7b507e7 node bin/www`. Første kommandoen sette kun miljøvariabelen `OMDB_API_KEY`, som er nødvendig for å importere IMDB data.
4. Serveren skal nå vere tilgjengelig på samme adresse som over.

# Prosjektstruktur

Prosjektet skiller seg en del ut i fra de React applikasjonene vi har sett i kurset. Den største skillet er at vi ikke har brukt `create-react-app` for å bootstrappe front-end, men i stedet har vi satt opp manuelle konfigurasjoner i webpack, sammen med Babel 7, for å transpilere React kode til vanlig ECMAScript 5 syntaks.

Det er flere grunner til dette valget akkurat dette valget, men de største grunnen til dette valget er:

* Gir oss større kontroll på prosjektet, og gjør oss ikke avhengige av at create-react-app for å oppdatere tredjepartsmoduler.
* Kan gjøre applikasjonen mindre i størrelse og kompleksitet, ved å eliminere all boiler plate kode som create-react-app legger til i bakgrunnen.
* Gir oss en betydelig dypere forståelse av hvordan en React applikasjon fungerer
* Ville separere back-end og front-end, men fortsatt kunne aksessere begge applikasjoner på samme domene/host. Unngår også at vi må håndtere [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for å snakke med back-end fra front-end.

## Mappestruktur

Mappestrukturen vil nok ved første øyekast virke noe omfattende ut, men den er (forhåpentligvis) ganske logisk strukturert. 

Prosjektet består egentlig av to separate prosjekter: front-end og back-end. All logikk som hører til front-end vil man finne i mappen `client/`. All logikk som ligger på roten av prosjektet hører da til back-end delen av prosjektet.

```bash
media-searcher
| bin/www # Start scriptet for ExpressJS applikasjonen
| client
  | build
    | # Sluttpunkt for filer som er bygd. Brukes av back-end
  | config/jest
  | node_modules
    | # Dependencies for Front-end
  | public
  | src
    | components
      | # Forskjellige komponenter, som ikke er pages
    | modules
      | media
        | # Redux moduler for media
      | rootReducer.js # Kombinerer alle reducere
      | rootSaga.js # Binder alle sagas til store
    | pages
      | # Komponenter som fungerer som sider i applikasjonen
    | utils
      | Forskjellige hjelpemoduler for applikasjonen
    | App.js
    | config.js
    | index.js # Første endepunkt for applikasjonen
    | Routes.js
    | store.js # Setter opp Redux store
    | testSetup.js
| node_modules # Dependencies for back-end
| ci
  | # Scripts som brukes av Gitlab
| docker
  | # Dockerfiler og scripts som brukes av docker
| data
  | # Volumet for databasen. Brukes av docker, og er eksludert av git
| models
  | # Samling av Mongoose modeller
| routes
  | # Forskjellige back-end ruter/kontrollere. Definerer også logikken for gGraphQL
| utils
  | # Forskjellige hjelpemoduler for back-end
app.js # Starten på business logikken til applikasjonen
```

### client/

Client inneholder all logikk og moduler for front-end applikasjonen, og er egentlig fullstendig uavhengig av back-end. Det eneste punktet der front-end snaker med back-end, utenom ved API kall, er for å laste inn `index.html` og statiske filer.

I filen `app.js` vil du se følgende:

```js
// app.js, linje: 49
app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
``` 
Denne ruten fanger alle forespørsler, som ennå ikke har blitt fanget, og sender tilbake filen `index.html`. Dette gjør at du får opp front-end grensesnittet når du besøker `localhost:3000` og de fleste undersidene på dette domenet.

Men vi trenger også en rute for å kunne gi oss de nødvendige javascript og css filene. Dette gjør linjen:

```js
// app.js, linje: 24
app.use('/static', express.static(path.join(__dirname, 'client/build/static')));
```

# GraphQL

På prosjektet bestemte vi oss for å bruke GraphQL til å gjøre spørringer fra front-end til api-et. Dette lot oss enkelt definere konkrete spørringer, hva den aksepterte og hva den kunne returnere. I tillegg snakker GraphQL godt sammen med MongoDB, siden MongoDB i all enkelhet er JSON (egentlig BSON).

Interaktiv versjon av GraphQL kan man finne på `localhost:3000/graphql`, som også er endepunktet som front-end vil kalle.

Ruten og business-logikken for spørringen ligger i undermappen `routes/graphql/`.

## Eksempel på spørring

Eksempelet under viser hvordan man kan gjenomføre søk etter media (film/tv-serie), basert på en søkestreng.

```javascript
query($query: String!, $limit: Int = 50, $offset: Int = 0) {
  searchMedia(query: $query, limit: $limit, offset: $offset) {
    id
    name
    rating
    director
    actors {
      id
      name
    }
  }
}

# Variables
{
  "query": "The Dark knight",
  "limit": 80,
  "offset": 0
}
```

# Nettleserstøtte

Vi forventer at nettleserene prosjektet vil kjøres på, støtter generelt ES6 syntaks, samt funksjoner som [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) og [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

Videre er applikasjonen testet på følgende nettlesere:

* Chrome versjon `70.0.3538.77`
* Firefox versjon
* Safari 

# Testing

Prosjekt 4 fortsetter rutinene fra forrige prosjekter, ved å:

* Kjøre linter (eslint) før hver commit
* Kreve en viss kodedekning i Jest, for å kunne pushe til master.

## ESLint

ESLint er satt opp både for front-end og back-end med forskjellige konfigurasjoner, fordi det brukes noe forskjellig syntaks. Gjennom npm modulen `husky` påkrever vi at alle feil som linteren oppdager, er løst før git fullfører en commit. Dvs. om ESLint finner feil, vil `husky` blokkere commiten som fører til feilen.

Linteren kan også kjøres manuelt

```bash
# Front-end
npm run lint --prefix './client'

# Back-end
npm run lint
```

## Jest

Jest er konfigurert for både front-end og back-end, men vi har kun prioritert front-end i dette prosjektet. Særlig når vi også har Cypress for integrasjonstester.

I stedet for å kjøre før hver push til gitlab, gjennomføres derimot testene automatisk gjennom en CI-pipeline i gitlab (se avsnitt om gitlab lenger nede).

Testene kunne også selvsagt kjøres lokalt:

```
# Påse at du er i front-end
cd client/

# En gjennomgang
npm test

# I watch modus
npm run test:watch

# Med kodedekning
npm run test:coverage
```

## Cypress

Cypress ble brukt til å kjøre integrasjonstester, hovedsakelig på komponenter og sider som var vanskelig å teste gjennom Jest eller hadde veldig sammensatt logikk. Dette inkluderer da særlig `HomePage.js`.

Dokumentasjonen til cypress nevner også at det er mulig å gjennomføre enhetstester, ved å ["stubbe"](https://docs.cypress.io/guides/guides/network-requests.html) forespørsler. Dette hadde vi derimot ikke noe særlig interesse av, fordi denne fremgangsmåten ikke ville gi oss noe særlig god tilbakemelding på kodedekning. Jest er også vesentlig raskere og enklere å kjøre lokalt og på Gitlab.

Cypress kan åpnes ved å kalle `npx cypress open` eller `npm run test:integration`, fra roten av prosjektet.

## CI-pipeline

Ved hver push til gitlab og merge til master, kjøres en automatisk pipeline for å sikre at koden holder en viss "standard".

Stegene som gjennomføres er:

* Installerer dependencies for front-end og back-end
* Kjører linterene
* Kjører Jest med kodedekning
* Bygger front-end for produksjon (brukes ikke, men kjøres for å fange eventuelle kritiske feil ved bygging)

Videre konfigurasjon kan en finne i filen `.gitlab-ci.yml`.

# Deployment til produksjon (ekstra)

Applikasjonen på produksjonsserveren ser litt annerledes ut, enn hva prosjektet etterspør. I stedet for Apache bruker vi heller Nginx, fordi denne er noe enklere å sette opp `reverse proxy` på, samt definere ekstra endepunkt, som `/prosjekt2`. Denne konfigurasjonen finner du på `/etc/nginx/sites-enabled/default`.

Videre bruker vi også her Docker for å kjøre applikasjonen, slik at oppsettet på utviklingsoppsettet og produksjonoppsettet, var mest mulig "synkroniserte". I tillegg var det vesentlig enklere å starte og stoppe applikasjonen med dette oppsettet

## Installasjon

For å køyre applikasjonen trengst ein del dependencies

* `NodeJS` version `>= 8.9`. Trengs for å laste ned dependencies og bygge front-end
* `docker` med `docker-compose`. Setter opp node server og mongodb database, og kobler disse sammen.
* `nginx`. Erstatter Apache2, og fungerere som reverse proxy for prosjektene, og særlig prosjekt 4. Brukes fordi den er enklere å konfigurere som reverse-proxy.

### NodeJS

Installasjon på Ubuntu 18.04 kan gjerast ved hjelp av følgande guide: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04. Etterpå vil du forhåpentligvis ha kommandoene `node` og `npm` tilgjengelig.

### Docker og docker-compose

Installasjon av docker kan gjøres ved hjelp av denne guiden: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04.

Og docker-compose kan installeres gjennom denne guiden: https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04.

Takk til Digital Ocean for gode guider.

### Nginx

Igjen, har Digital Ocean en god guide for installasjon av Nginx https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04. Hovedpunktene fra guiden er

```bash
sudo apt update

sudo apt install nginx
```

Installeres alt riktig vil nginx kjøre på port 80 (pass på at apache ikke kjører samtidig, da begge bruker samme port).

Status for nginx kan sjekkes gjennom `systemctl`.

```
systemctl status nginx
```

#### Oppdater sites-enabled

For at reverse proxy skal fungere, samt sikre at prosjekt2 fortsatt er tilgjengelig på `/prosjekt2`, må vi gjøre noen mindre endringer på filen `/etc/nginx/sites-enabled/default` (pass på at du gjør dette som `sudo`).

Denne filen skal se ut som innholdet i `nginx/sites-enabled-default.conf` i repoet. Hovedendringene å hente ut frå denne konfigurasjonen er:

```
# Sikrer at prosjekt2 er tilgjengelig på denne adressen
location /prosjekt2 {
    try_files $uri $uri/ =404;
}

# Sender alle andre forespørsler til localhost:3000 (som er prosjekt 4)
location / {
    proxy_pass http://localhost:3000;
}
```

## Starte applikasjonen

1. Påse at Nginx kjører: `sudo service ngnix status`
2. `cd /var/www/html/prosjekt4`
3. Installer moduler:
  1. `sudo npm install`. Det er mulig denne feiler pga. Cypress, prøv da i stedet å kjøre `sudo npm install --production`.
  2. `cd client && sudo npm install`
4. Bygg front-end moduler: 
  1. `cd client`
  2. `sudo npm run build:prod`
5. Start server og database `sudo docker-compose -f docker-compose.production.yml up -d`. Pass på at du ikke er i undermappen `client/` når du kjører dette
6. Docker vil nå bygge applikasjonen og starte den i bakgrunnen.
7. Du kan verifisere at denne kjører ved å kalle `sudo docker-compose ps` og hente ut logger ved å kalle `sudo docker-compose logs`

Applikasjonen vil etter dette være tilgjengelig på endepunktet `http://it2810-20.idi.ntnu.no/`. Internt på serveren kan du også pinge applikasjonen på `localhost:3000`.


# functional-programming ⚙️
Hier moet nog een inleiding.

## Inhoud 📋
* [Onderzoeksvragen](#onderzoeksvragen-)
* [Hypothesen](#hypothesen-)
* [Benodigde data](#benodigde-data-)
* [Data ophalen](#code)
* [D3](#D3)

## Onderzoeksvragen 🤔
* Welk genre heeft gemiddeld genomen het meest aantal pagina's per boek?
* Werden er vroeger meer boeken geschreven dan nu?
* Is het aantal vertaalde boeken de afgelopen 10 jaar gestegen?
* Is het aantal andere media dan een boek toegenomen sinds 2008?
* In hoeverre is het aantal boeken gericht op de jeugd gestegen sinds 2000?

Gekozen onderzoeksvraag: *Welk genre heeft gemiddeld genomen het meest aantal pagina's per boek?*

## Hypothesen 🧐
**Nulhypothese:** Alle genres hebben hetzelfde aantal pagina's.

**Alternatieve hypothese:** Er is een genre dat gemiddeld meer pagina's heeft dan anderen.

## Benodigde data 📊
* Alle genres (`results.result[i].genres.genre[i].search-term` <= array maken van de verkregen genres)
* Aantal pagina's van een boeken (`results.result[i].librarian-info.record.marc.df215.df215[i].$t`)
  * Genre van het boek (`results.result[i].genres.genre[i].search-term`)

Het genre van een boek haal ik inmiddels noet meer uit de data maar uit de array met genres waarvan ik de data op wil halen. De genres komen uit de [readme van Daniël.](https://github.com/DanielvandeVelde/functional-programming#cheatsheet)

### Het verkrijgen van genres
Je kan met een `/search` query filteren op genres. Helaas moet je dan een query meegeven wat er voor zorgt dat je daar op zoekt, en dan de genres er uit filtert.
De oplossing zou zijn om het `/index` endpoint te gebruiken, want daar hoef je geen query aan mee te geven. Het probleem is echter dat ik geen genres of subjects op kan halen. `Subjects` geeft namelijk geen resultaten terug.
Om die rede ga ik de genres met de minder precieze `/search` query doen.

## Code
Ik heb eerst in een persoonlijk project geëxperimenteerd met promises om te zien hoe dat werkt, en zo de basis geleerd.
Daarna ben ik promises toe gaan passen op de `getData` en `getPageAmount` functions en ben ik de pagina aantallen van boeken van een genre op gaan halen.

# D3
Op aanraden van Titus ben ik maandag begonnen met kijken naar D3 voorbeelden op [observable](). Ik was namelijk nog steeds bezig met het ophalen van data.
Eerst heb ik passende datavisualisaties geschetst bij mijn data.
![schets datavis](/bin/img/sketch.jpg)
Mijn voorkeur gaat naar de rechter schets omdat die meer informatie geeft.
Vervolgens heb ik een [scatter plot van Mike Bostock](https://beta.observablehq.com/@mbostock/d3-scatterplot) geforkt en ben ik daar mee gaan spelen.
Ik heb een beetje gekeken wat wat doet en hoe het werkt en vervolgens een beetje van mijn data er in gezet.
![eerste probeersel observable & D3](/bin/img/d3-scatterplot-test.jpg)

## Todo
* Deelvragen bedenken

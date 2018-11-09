> response: { status: 500, statusText: 'Internal Server Error' }

# functional-programming ⚙️
[Data visualisation](https://jeroentvb.github.io/functional-programming/d3-datavis/index.html)

## Usage
To use the application enter the following commands in your terminal:
```
git clone https://github.com/jeroentvb/functional-programming.git
cd functional-programming/oba-request
npm install
echo PUBLIC_KEY=public key here >> .env
echo SECRET_KEY=private key here >> .env
```
change the `genres` array with the genres you want to get info for. *I don't recommend sending requests for more than 1 genre at once, because you will get a 500 error after sending too many requests*

## Inhoud 📋
* [Onderzoeksvragen](#onderzoeksvragen-)
* [Hypothesen](#hypothesen-)
* [Benodigde data](#benodigde-data-)
* [Het verkrijgen van data](#het-verkijgen-van-data-)
* [Code](#code-)
* [Observable](#observable-)
* [Meerdere pagina's ophalen uit de API](#meer-pagina's-ophalen-)
* [D3](#d3-)
* [Conclusie](#conclusie-)

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

## Het verkrijgen van data 📥
Je kan met een `/search` query filteren op genres. Helaas moet je dan een query meegeven wat er voor zorgt dat je daar op zoekt, en dan de genres er uit filtert.
De oplossing zou zijn om het `/index` endpoint te gebruiken, want daar hoef je geen query aan mee te geven. Het probleem is echter dat ik geen genres of subjects op kan halen. `Subjects` geeft namelijk geen resultaten terug.
Om die rede ga ik de genres met de minder precieze `/search` query doen.

## Code 🖥️
Ik heb eerst in een persoonlijk project geëxperimenteerd met promises om te zien hoe dat werkt, en zo de basis geleerd.
Daarna heb ik een promise toegepast op de [getData](https://github.com/jeroentvb/functional-programming/blob/0a199476e587e086446dd40763a0d9c84abf40b0/oba-request/index.js#L30-L66) function en ben ik de pagina aantallen van boeken van een genre op gaan halen. Het was vooral heel veel trail & `console.log(err)`

## Observable 🔍
Op aanraden van Titus ben ik maandag begonnen met kijken naar D3 voorbeelden op observable. Ik was namelijk nog steeds bezig met het ophalen van data. Op het moment van schrijven heb ik alleen de eerste pagina's met resultaten van 3 genres.
Eerst heb ik passende datavisualisaties geschetst bij mijn data.
![schets datavis](/bin/img/sketch.jpg)
Mijn voorkeur gaat naar de rechter schets omdat die meer informatie geeft.
Vervolgens heb ik een [scatter plot van Mike Bostock](https://beta.observablehq.com/@mbostock/d3-scatterplot) geforkt en ben ik daar mee gaan spelen.
Ik heb een beetje gekeken wat wat doet en hoe het werkt en vervolgens wat van mijn data er in gezet.
![eerste probeersel observable & D3](/bin/img/d3-scatterplot-test.JPG)

## Meerdere pagina's ophalen 📖
Ik wilde meerdere pagina's ophalen zodat ik een grotere dataset kreeg. Op het moment dat de code af was en ik probeerde meerdere pagina's met resultaten op te halen kreeg ik geen resultaten meer terug via Rijk's node pakketje. De API deed het wel via de browser..
Later bleek dat dit kwam doordat zijn code de staging API gebruikte. Door de link in zijn code te veranderen naar de live API werkte het wel weer.
Ik heb toen van 10 genres alle lengtes van de pagina's en het aantal boeken in het genre met [deze functie](https://github.com/jeroentvb/functional-programming/blob/0a199476e587e086446dd40763a0d9c84abf40b0/oba-request/index.js#L69-L90) opgehaald. De volgende array is het resultaat.

<details><summary>Array met resultaten</summary>

  ```JSON

  [
      {
          "genre": "western",
          "booksAmount": 62,
          "averagePages": 139
      },
      {
          "genre": "spionage",
          "booksAmount": 64,
          "averagePages": 309
      },
      {
          "genre": "homofiel-thema",
          "booksAmount": 86,
          "averagePages": 224
      },
      {
          "genre": "humor",
          "booksAmount": 496,
          "averagePages": 258
      },
      {
          "genre": "sport",
          "booksAmount": 830,
          "averagePages": 117
      },
      {
          "genre": "detective",
          "booksAmount": 1989,
          "averagePages": 266
      },
      {
          "genre": "science-fiction",
          "booksAmount": 4607,
          "averagePages": 302
      },
      {
          "genre": "stripverhaal",
          "booksAmount": 6858,
          "averagePages": 87
      },
      {
          "genre": "thriller",
          "booksAmount": 8857,
          "averagePages": 358
      }
  ]

  ```

</details>  

Wel werd mij later verteld dat je `format:book` als query mee kan geven waardoor je alle boeken op kan halen. Dit kon ik combineren met het facet `genre(western)` om alle boeken van het genre western op te halen. Ik moest dus opnieuw alle data ophalen. [Dit is dus mijn uiteindelijke query](https://github.com/jeroentvb/functional-programming/blob/0a199476e587e086446dd40763a0d9c84abf40b0/oba-request/index.js#L32-L38)

## D3 📈
> Error,	js-standard,	'd3' is not defined.

Vervolgens ben ik lokaal een scatterplot gaan maken met de bovenstaande data, de scatterplot op Observable en [deze tutorial](https://www.oreilly.com/learning/making-a-scatterplot-with-d3-js) van o'reilly. Ik heb kleine stukjes gekopiërd, gekeken wat het doet en bij bijna alles een [comment](https://github.com/jeroentvb/functional-programming/blob/master/d3-datavis/assets/js/script.js) geplaatst wat het doet. Daarna heb ik de code aangepast aan hoe ik mijn datavisualisatie wilde hebben.
Dit was mijn eerste probeersel.
![eerste versie datavis](/bin/img/scatterplot-1.JPG)
Na wat finetunen en uitvogelen hoe ik het `.domain()` kon vergroten kwam ik tot het volgende resultaat.
![tweede versie datavis](/bin/img/scatterplot-2.JPG)

## Conclusie 📝
Ik vind persoonlijk mijn onderzoeksvraag en hypothese niet zo sterk. Dit komt vooral omdat ik er niet zo veel tijd aan heb besteed en ik al snel data ben gaan ophalen.
Wel vind ik de data die ik heb opgehaald interessant en kan je in mijn visualisatie goed zien welke genres gemiddeld veel pagina's per boek hebben en hoeveel boeken er in een genre zitten.
[Data visualisation](https://jeroentvb.github.io/functional-programming/d3-datavis/index.html)

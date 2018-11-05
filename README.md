# functional-programming
Hier moet nog een inleiding.

## Inhoud
* [Onderzoeksvragen](#onderzoeksvragen)
* [Hypothesen](#hypothesen)
* [Benodigde data](#benodigde-data)
*

## Onderzoeksvragen
* Welk genre heeft gemiddeld genomen het meest aantal pagina's per boek?
* Werden er vroeger meer boeken geschreven dan nu?
* Is het aantal vertaalde boeken de afgelopen 10 jaar gestegen?
* Is het aantal andere media dan een boek toegenomen sinds 2008?
* In hoeverre is het aantal boeken gericht op de jeugd gestegen sinds 2000?

Gekozen onderzoeksvraag: *Welk genre heeft gemiddeld genomen het meest aantal pagina's per boek?*

## Hypothesen
**Nulhypothese:** Alle genres hebben hetzelfde aantal pagina's.

**Alternatieve hypothese:** Er is een genre dat gemiddeld meer pagina's heeft dan anderen.

## Benodigde data
* Alle genres (`results.result[i].genres.genre[i].search-term` <= array maken van de verkregen genres)
* Aantal pagina's van een boeken (`results.result[i].librarian-info.record.marc.df215.df215[i].$t`)
  * Genre van het boek (`results.result[i].genres.genre[i].search-term`)

### Het verkrijgen van genres
Je kan met een `/search` query filteren op genres. Helaas moet je dan een query meegeven wat er voor zorgt dat je daar op zoekt, en dan de genres er uit filtert.
De oplossing zou zijn om het `/index` endpoint te gebruiken, want daar hoef je geen query aan mee te geven. Het probleem is echter dat ik geen genres of subjects op kan halen. `Subjects` geeft namelijk geen resultaten terug.
Om die rede ga ik de genres met de minder precieze `/search` query doen.

## Todo
* Deelvragen bedenken

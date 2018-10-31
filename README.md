# functional-programming
Hier moet nog een inleiding.

## Inhoud
* [Onderzoeksvragen](#onderzoeksvragen)
* [Hypothesen](#hypothesen)
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
* Alle genres (`facets.facet[2].value`)
* Aantal pagina's van een boeken (`librarian-info.record.marc.df215.df215[0].$t`)
  * Genre van het boek (`results.result[0].subjects`)

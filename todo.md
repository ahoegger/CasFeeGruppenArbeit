CasFeeGruppenArbeit TODOs
=========================
## Architektur ##
* Model
    * result = article[]
    * Article + Comments sind im Model NICHT zwingend hierarchisch
    * comments = comment[]
    * Votes ist property von Article
* View Model
    * Result muss observable sein (wegen suche aktualisiert, neuer Article)
    * Article muss observable sein (wegen edit)
    * Votes (allenfalls) muss observable sein (wegen up + down voting)
    * Comments zum Article müssen observable sein
    * comment innerhalb comments muss observable sein
    * comment oder comments hat link zum article
    * Braucht article referenz zu seinen comments wirklich? (i.e. hierarchie?)
    * Haben die View Model Bestandteile CRUD events?
* View Elements (i.e. widgets)
    * result attached sich als Listener auf Result-View-Model
        * wenn result anders: ganzer node komplett neu bauen (z.B. wenn neue suche)
    * Article + Comments sind im View Model hierarchisch
    * Wissen, welcher node sie sind (wegen aktualisierung)
    * Wissen, wie sie sich zeichnen müssen (i.e. welches Template sie haben)
    * kennen ihren "node" (ode parent node)
* comments node zum article wird immer gerendert; widget weiss, was es machen muss, wenn es keine kommentare hat (oder wenn der user nicht eingeloggt ist, whatever)

* Model zu view model
    * model sind reine objekte
    * über mixins oder so werden die view models gemacht
    * dort wird dann auch CRUD (oder was auch immer) getriggert
    * über listeners wird dann das UI hoffentlich automatisch updated

* Templating
    * Idee:
        * template repository, jedes widget holt dort das passende layout
        * via regex werden die placeholder ersetzt
        * dann wird der node seinem HTML parent node hinzugefügt und im viewnmodel referenziert
        * mittels data-* attributen weitere features hinzufügen (oder event listener "halb hart" setzen im view model)

* Behaviour


## Design ##

## Implementierung ##

## Planung ##

## Tools und Frameworks ##
* jQuery

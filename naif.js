var index = 0
var etapes = []
var texte = "ANNA BANANA ET ANNA ANANAS"
var motif = "ANANAS"
const pMotif = document.getElementById("motif")
const pTexte = document.getElementById("texte")
const pComparaisons = document.getElementById("nbComparaisons")

function afficher(i) {
    if (i<0) {
        index = 0
    } else if (i >= etapes.length) {
        index = etapes.length - 1
    } else {
        const e = etapes[index]
        pMotif.innerHTML = e.motif
        pTexte.innerHTML = e.texte
        pComparaisons.textContent = e.nbComparaisons
        range.value = index
    }
}

function nouvelleEtape(decallage, nbComparaisons) {
    var identiques = 0
    var texte_etape = texte.slice(0, decallage)
    var motif_etape = "&nbsp;".repeat(decallage)
    var i = 0
    while (i<motif.length && motif[i]==texte[i+decallage]) {
        identiques += 1
        i++
    }
    if (identiques == 0) {
        texte_etape += '<mark class="orange">' + texte[decallage] + '</mark>'
        motif_etape += '<mark class="orange">' + motif[0] + '</mark>'
    } else {
        texte_etape += '<mark class="vert">' + texte[decallage] + '</mark>'
        motif_etape += '<mark class="vert">' + motif[0] + '</mark>'
    }
    if (identiques == motif.length) {
        texte_etape += '<mark class="jaune">' + texte.slice(decallage+1, decallage+identiques) + '</mark>'
        motif_etape += '<mark class="jaune">' + motif.slice(1, identiques) + '</mark>'
        texte_etape += texte.slice(decallage+identiques)
        nbComparaisons --
    }
    else if (identiques > 0) {
        texte_etape += '<mark class="jaune">' + texte.slice(decallage+1, decallage+identiques+1) + '</mark>'
        motif_etape += '<mark class="jaune">' + motif.slice(1, identiques+1) + '</mark>'
        texte_etape += texte.slice(decallage+1+identiques)
        motif_etape += motif.slice(1+identiques)
    } else {
        texte_etape += texte.slice(decallage+1)
        motif_etape += motif.slice(1)
    }
    const e = {texte:texte_etape, motif:motif_etape, decallage, nbComparaisons:nbComparaisons+identiques+1, identiques}
    etapes.push(e)
    return e
}

function setup() {
    etapes = []
    index = 0
    var e = {nbComparaisons:0, identiques:0}
    for (let i=0; i < texte.length-motif.length+1; i++) {
        if (e.identiques != motif.length) {
            e=nouvelleEtape(i, e.nbComparaisons)
        }
    }
    range.max = etapes.length-1
    afficher(0)   
}

setup()

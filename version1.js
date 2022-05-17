var index = 0
var etapes = []
var texte = "ANNA ANANAS ET ANNA BANANA"
var motif = "BANANA"
var dictMotif = {}
const pMotif = document.getElementById("motif")
const pTexte = document.getElementById("texte")
const pAlignBas = document.getElementById("alignBas")
const pAlignHaut = document.getElementById("alignHaut")
const pComparaisons = document.getElementById("nbComparaisons")
const table = document.getElementById("tableSaut")

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
        pAlignBas.textContent = e.alignBas
        pAlignHaut.textContent = e.alignHaut
    }
}
function nouvelleEtape(decallage, nbComparaisons, alignHaut, alignBas) {
    var identiques = 0
    var texte_etape = texte.slice(0, decallage)
    var motif_etape = "&nbsp;".repeat(decallage)
    var i = motif.length -1 
    while (i>=0 && motif[i]==texte[i+decallage]) {
        identiques += 1
        i--
    }
    if (identiques == 0) {
        texte_etape += texte.slice(decallage, decallage+motif.length-1)
        motif_etape += motif.slice(0, motif.length-1)
        texte_etape += '<mark class="orange">' + texte[decallage+motif.length-1] + '</mark>'
        motif_etape += '<mark class="orange">' + motif[motif.length-1] + '</mark>'
        texte_etape += texte.slice(decallage+motif.length)
    } else if (identiques == motif.length) {
        texte_etape += '<mark class="jaune">' + texte.slice(decallage, decallage+identiques-1) + '</mark>'
        motif_etape += '<mark class="jaune">' + motif.slice(0, identiques-1) + '</mark>'
        texte_etape += '<mark class="vert">' + texte[decallage+motif.length-1] + '</mark>'
        motif_etape += '<mark class="vert">' + motif[motif.length-1] + '</mark>'
        texte_etape += texte.slice(decallage+identiques)
        nbComparaisons --
    } else {
        texte_etape += texte.slice(decallage, decallage+motif.length-1-identiques)
        motif_etape += motif.slice(0, motif.length-1-identiques)
        texte_etape += '<mark class="jaune">' + texte.slice(decallage+motif.length-1-identiques, decallage+motif.length-1) + '</mark>'
        motif_etape += '<mark class="jaune">' + motif.slice(motif.length-1-identiques, motif.length-1) + '</mark>'
        texte_etape += '<mark class="vert">' + texte[decallage+motif.length-1] + '</mark>'
        motif_etape += '<mark class="vert">' + motif[motif.length-1] + '</mark>'
        texte_etape += texte.slice(decallage+motif.length)
    }
    const e = {texte:texte_etape, motif:motif_etape, decallage, nbComparaisons:nbComparaisons+identiques+1, identiques, alignBas, alignHaut }
    etapes.push(e)
    return e
}
function setup() {
    dictMotif = {}
    for (let i=0; i<motif.length-1; i++) {
        dictMotif[motif[i]] = motif.length - i - 1
    }
    table.innerHTML = "<tr><th>Lettre de texte comparée</th><th>Sauts</th></tr>"
    for (const lettre in dictMotif) {
        const tr = document.createElement("tr")
        const tdLettre = document.createElement("td")
        const tdSauts = document.createElement("td")
        tdLettre.textContent = lettre
        tdSauts.textContent = dictMotif[lettre]
        tr.appendChild(tdLettre)
        tr.appendChild(tdSauts)
        table.appendChild(tr)
    }
    const tr = document.createElement("tr")
    const tdLettre = document.createElement("td")
    const tdSauts = document.createElement("td")
    tdLettre.textContent = "autre"
    tdSauts.textContent = motif.length
    tr.appendChild(tdLettre)
    tr.appendChild(tdSauts)
    table.appendChild(tr)
    etapes = []
    index = 0
    var e = {nbComparaisons:0, identiques:0}
    var i = 0
    var alignBas = "\u00a0"
    var alignHaut = "\u00a0"
    while (i < texte.length-motif.length+1 && e.identiques != motif.length) {
        e = nouvelleEtape(i, e.nbComparaisons, alignHaut, alignBas)
        if (dictMotif[texte[i+motif.length-1]]) {
            alignBas = "\u00a0".repeat(i+motif.length-1) + "↑"
            alignHaut = "\u00a0".repeat(i+motif.length-1) + "↓"
            i += dictMotif[texte[i+motif.length-1]]
        } else {
            alignBas = "\u00a0"
            alignHaut = "\u00a0".repeat(i+motif.length-1) + "↓"
            i += motif.length
        }
    }
    range.max = etapes.length-1
    afficher(0)   
}
setup()

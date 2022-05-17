const btnPrev = document.getElementById("btn-prev")
const btnNext = document.getElementById("btn-next")
const range = document.getElementById("index")
const btnChange = document.getElementById("btnChange")
btnNext.addEventListener("click", next)
btnPrev.addEventListener("click", prev)
range.addEventListener("input", changeRange)
btnChange.addEventListener("click", changeTexte)

function changeTexte(event) {
    const newTexte = document.getElementById("changeTexte").value;
    const newMotif = document.getElementById("changeMotif").value;
    if (newTexte.length > 0 && newMotif.length) {
        texte = newTexte
        motif = newMotif    
        setup()
    }
}

function changeRange(event) {
    index = range.value
    afficher(index)
}

function next(event) {
    index++
    afficher(index)
}

function prev(event) {
    index--
    afficher(index)
}

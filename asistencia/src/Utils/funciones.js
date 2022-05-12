
function semestreActual() {
    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth() + 1;
    let anioActual = fechaActual.getFullYear();
    let semestre = "1";

    if (mesActual >= 3 || mesActual <= 7) {
        semestre = "1";

    }
    else {
        semestre = "2";
    }

    return anioActual + "-" + semestre;

}


export { semestreActual }
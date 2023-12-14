/**
 *
 * @param {*} element = texte de description de la recette
 */
function revealText(element) {
    element.style.overflow = "visible";
    element.style.height = "auto";
    element.style.color = "white";
    element.style.backgroundColor = "#838383";
    element.style.zIndex = "1";
    element.style.border = "2px solid #f74949";
  }
  
  /**
   *
   * @param {*} element = texte de description de la recette
   */
  function annulerEffet(element) {
    element.style.overflow = "hidden";
    element.style.height = "76px";
    element.style.color = "";
    element.style.backgroundColor = "";
    element.style.zIndex = "0";
    element.style.border = "";
  }
  
import {searchInDropdown} from "../utils/utils.js"

const chevronIconIngredient = document.getElementById("chevron-icon-argument");
const chevronIconAppareil = document.getElementById("chevron-icon-appareil");
const chevronIconUstensile = document.getElementById("chevron-icon-ustensile");

//ingrédient
chevronIconIngredient.addEventListener("click", () => {
  const bouttonIng = document.querySelector(".boutton-ingredient");
  const dropdownIngredient = document.getElementById("dropdown-ingredient");
  let isDropdownOpen = false;
  let chevronFermeture = false
  

  // inversion de la valeur pour fermeture du dropdown et rotation du chevron (^)
  isDropdownOpen = !isDropdownOpen;
  if (dropdownIngredient.classList.contains("hidden") && isDropdownOpen) {
    dropdownIngredient.classList.remove("hidden");
    chevronIconIngredient.setAttribute(
      "class",
      "-mr-5 ml-2 h-5 w-5 transform rotate-180"
    );
    bouttonIng.classList.remove("rounded-lg");
    bouttonIng.classList.add("rounded-t-lg");
  } else {
    chevronFermeture = true
    bouttonIng.classList.remove("rounded-t-lg");
    bouttonIng.classList.add("rounded-lg");
    chevronIconIngredient.setAttribute("class", "-mr-5 ml-2 h-5 w-5");
    dropdownIngredient.classList.add("hidden");
  }
}); //fin ecouteur ingredients

//appareil
chevronIconAppareil.addEventListener("click", () => {
  const bouttonIng = document.querySelector(".boutton-appareil");
  const dropdownIngredient = document.getElementById("dropdown-appareil");
  let isDropdownOpen = false;
  let chevronFermeture = false

  // inversion de la valeur pour fermeture du dropdown et rotation du chevron (^)
  isDropdownOpen = !isDropdownOpen;
  if (dropdownIngredient.classList.contains("hidden") && isDropdownOpen) {
    dropdownIngredient.classList.remove("hidden");
    chevronIconAppareil.setAttribute(
      "class",
      "-mr-5 ml-2 h-5 w-5 transform rotate-180"
    );
    bouttonIng.classList.remove("rounded-lg");
    bouttonIng.classList.add("rounded-t-lg");
  } else {
    chevronFermeture = true
    bouttonIng.classList.remove("rounded-t-lg");
    bouttonIng.classList.add("rounded-lg");
    chevronIconAppareil.setAttribute("class", "-mr-5 ml-2 h-5 w-5");
    dropdownIngredient.classList.add("hidden");
  }
}); //fin ecouteur Appareil

//ustensile
chevronIconUstensile.addEventListener("click", () => {
  const bouttonIng = document.querySelector(".boutton-ustensile");
  const dropdownIngredient = document.getElementById("dropdown-ustensile");
  let isDropdownOpen = false;
  let chevronFermeture = false
  
  // inversion de la valeur pour fermeture du dropdown et rotation du chevron (^)
  isDropdownOpen = !isDropdownOpen;
  if (dropdownIngredient.classList.contains("hidden") && isDropdownOpen) {
    dropdownIngredient.classList.remove("hidden");
    chevronIconUstensile.setAttribute(
      "class",
      "-mr-5 ml-2 h-5 w-5 transform rotate-180"
    );
    bouttonIng.classList.remove("rounded-lg");
    bouttonIng.classList.add("rounded-t-lg");
  } else {
    chevronFermeture = true
    bouttonIng.classList.remove("rounded-t-lg");
    bouttonIng.classList.add("rounded-lg");
    chevronIconUstensile.setAttribute("class", "-mr-5 ml-2 h-5 w-5");
    dropdownIngredient.classList.add("hidden");
  }
}); //fin ecouteur Ustensile

//--------------gestion de la recherche dans l'input des dropdown--------------
// Ajouté un écouteur d'événements pour déclencher la recherche lors de la saisie dans l'input
document.getElementById('searchIngredient').addEventListener("input", (e) => {
    searchInDropdown("searchIngredient","dropdown-ingredient")});
document.getElementById('searchAppareil').addEventListener("input", (e) => {
    searchInDropdown("searchAppareil","dropdown-appareil")});
document.getElementById('searchUstensile').addEventListener("input", (e) => {
    searchInDropdown("searchUstensile","dropdown-ustensile")});




 
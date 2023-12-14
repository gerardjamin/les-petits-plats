import {factoryObject} from '../factories/recetteProvider.js'
import {recupereElements,creationLienElement,ecouteLienDropdown} from '../utils/utils.js'
/**
  * initialisation de la page web du site, tableauRecette contient la totalité des recettes
*/
function init(){
const spaceRecette = document.querySelector(".spaceRecette");
//initialisation du tableau d'objet java script avec l'ensemble des recettes de la base de données
const tableauRecettes = factoryObject()
const compteur = document.getElementById("compteur")
let index = 0
//affichage des cartes recettes
tableauRecettes.forEach((recipe) => {
    spaceRecette.appendChild(recipe);
    index += 1
  });
  //compteur de recettes
  compteur.innerHTML = `${index} RECETTES`
//recuperation des elements (ingredients,appareils,ustensiles)
  let ingredient = recupereElements(tableauRecettes,".ingredient")
  let materiel   = recupereElements(tableauRecettes,".appliance")
  let ustensile  = recupereElements(tableauRecettes,".ustensile")
//création et remplissage des dropdown
  let tableauDeLienIngredient =  creationLienElement(ingredient,"dropdown-ingredient")
  let tableauDeLienAppareil = creationLienElement(materiel,"dropdown-appareil")
  let tableauDeLienUstensile = creationLienElement(ustensile,"dropdown-ustensile")
//pose d'écouteur sur chacun des liens des dropdowns
  ecouteLienDropdown(tableauDeLienIngredient,"tagIngredient")
  ecouteLienDropdown(tableauDeLienAppareil,"tagAppareil")
  ecouteLienDropdown(tableauDeLienUstensile,"tagUstensile")
} //fin fonction

/*chargement de la page d'accueuil*/
init()
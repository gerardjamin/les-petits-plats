import { factoryObject } from "../factories/recetteProvider.js";
import { filtreRecette, displayRecherche } from "../utils/recherche.js";

/**
 * fonction qui récupère les éléments (ingrédients,matériels,ustensiles) des recettes
 * @param {*} tableauNodeList
 * @param {*} typeElement
 * retourne un tableau d'éléments (ingrédient,appareils,ustensiles)
 */

export function recupereElements(tableauNodeList, typeElement) {
  let listeElements = [];

  tableauNodeList.forEach((element) => {
    let tableauClasses = Array.from(element.classList);
    tableauClasses.forEach((classe) => {
      let tableauElements = element.querySelectorAll(
        `.${classe} ${typeElement}`
      );
      tableauElements.forEach((element) => {
        listeElements.push(element.textContent);
      });
    });
  });
//récupère le contenu des index avec des éléments dans le tableau
  listeElements = listeElements.filter((element) => {
    return element !== " ";
  });
  listeElements = [...new Set(listeElements)];

  //la liste d'éléments ({presse citron,cuillère,..}) doit etre découpée en plusieurs tableaux
  if (typeElement === ".ustensile") {
    //Utilisez map pour diviser chaque element du tableau originel en plusieurs tableaux
    listeElements = listeElements.map((element) => element.split(","));
    //Utilisez concat pour fusionner tous ces tableaux en un seul
    listeElements = [].concat(...listeElements);
    // Utilisez Set pour éliminer les doublons
    listeElements = [...new Set(listeElements)];
  } //fin du if
  //retourne un tableau dans lesquels on trouvera les elements (soit ingredient,..appareil,..ustensile)
  return listeElements;
}

/**
 *fonction qui crée les liens associés à chaque élément
 * @param {*} listeElements
 * @param {*} identificateur
 * @returns
 * retourne une NodeList de chaque lien
 */
export function creationLienElement(listeElements, identificateur) {
  let tableauNode = [];
  listeElements.forEach((element) => {
    const nouvelElementLi = document.createElement("li");
    nouvelElementLi.classList.add("hover:bg-amber-300");
    //     // Créez un nouvel élément <a> (lien)
    const nouvelElementA = document.createElement("a");
    nouvelElementA.href = "#";
    nouvelElementA.classList.add(
      "block",
      "px-4",
      "py-2",
      "text-sm",
      "text-gray-700"
    );
    //     //affichage du nom de l'ingredient du lien <a>
    nouvelElementA.textContent = element;
    //     //rajout du lien a <li>
    nouvelElementLi.appendChild(nouvelElementA);
    //     // Ajoutez nouvelElementLi au tableau DOM(propriétés & valeurs)
    tableauNode.push(nouvelElementLi);

    let dropdownElement = document.getElementById(`${identificateur}`);

    tableauNode.forEach((element) => {
      dropdownElement.appendChild(element);
    });
  }); //fin creation liens

  return tableauNode;
} //fin fonction

/**
 *fonction qui met à jour la liste de liens du dropDown
 * @param {*} tableauNode
 * @param {*} identificateur (ingredient,appareil,ustensile)
 */
export function miseAjourDeLaListeDropdown(tableauNode, identificateur) {
  let dropdownElement = document.getElementById(`${identificateur}`);

  if (dropdownElement.childElementCount === 0) {
    tableauNode.forEach((element) => {
      dropdownElement.appendChild(element);
    });
  } else {
    viderLi(identificateur);
    tableauNode.forEach((element) => {
      dropdownElement.appendChild(element);
    });
  }
} //fin fonction


/**
 * fonction qui recherche dans la liste du dropDown
 * @param {*} inputIdentificateur 
 * @param {*} ulIdentificateur 
 */
export function searchInDropdown(inputIdentificateur, ulIdentificateur) {
  const searchInput = document.getElementById(`${inputIdentificateur}`);
  const dropdownList = document.getElementById(`${ulIdentificateur}`);
  const listItems = dropdownList.getElementsByTagName("li");
  //contient le mot à chercher dans la liste
  const searchTerm = searchInput.value.toLowerCase();

  // Parcourir la liste et masquer ou afficher les éléments en fonction de la recherche
  for (let i = 1; i < listItems.length; i++) {
    const text = listItems[i].textContent.toLowerCase();
    //renvoie la valeur binaire (true,false)
    const isVisible = text.includes(searchTerm);
    listItems[i].style.display = isVisible ? "block" : "none";
  }
}//fin fonction

/**
 *
 * @param {*} tableauDeLien
 * @param {*} tag (tagIngrédient,tagAppareil,tagUstensile)
 */
//variable globale
export let globalTableau = [];
let index = 0;

export function ecouteLienDropdown(tableauDeLien, tag) {
  //recipes contient la totalité des recettes
  let recipes = factoryObject();
  let tableauText = [];
  let valeurText = "";

  //initialisation du tableau des contextes a l'index 0 avec la totalité des recettes (50)
  globalTableau[0] = recipes;
  let recettesSauvegardéesSearchBar = document.querySelectorAll('[class^="recipe"]');
  //pose d'un écouteur sur chaque lien du dropDown
  tableauDeLien.forEach((element) => {
    const lien = element.querySelector("a");

    lien.addEventListener("click", function (event) {
      event.preventDefault();
      //recuperation du critère associé de l'element du dropdown(ingredient) (trim() > evite les espaces)
      valeurText = lien.textContent.trim();
      //tableau[] contenant tous les criteres de recherche
      tableauText.push(valeurText);

      //récupération de l'id du dropdown cliqué
      let elementClique = event.target;
      let parentCliqué = elementClique.parentNode;
      let grandParent = parentCliqué.parentNode;
      let id = grandParent.id;
      //permet de s'adresser au bon dropDown
      if (id.includes("ingredient")) {
        tag = "tagIngredient";
      }
      if (id.includes("appareil")) {
        tag = "tagAppareil";
      }
      if (id.includes("ustensile")) {
        tag = "tagUstensile";
      }

      //recettes contient toutes les recettes qui sont affichées
      let recettes = document.querySelectorAll('[class^="recipe"]');
      //recettesTrouvées contient toutes les recettes qui satisfont le critère
      let recettesTrouvées = filtreRecette(valeurText, recettes, tag);

      //partie affichage
      let recipeElement = [];
      // Trouver les cardElements à afficher et les stocker dans un tableau
      recettesTrouvées.forEach((recherche) => {
        recipeElement.push(
          recipes.find((recipeElement) => {
            return recipeElement.classList.contains(recherche);
          })
        );
      });

      //ensuite, mise à jour des dropdowns
      let ingredient = recupereElements(recipeElement, ".ingredient");
      let appareil = recupereElements(recipeElement, ".appliance");
      let ustensile = recupereElements(recipeElement, ".ustensile");

      //création des liens du dropdown pour chaque élément
      let ingredientNode = creationLienElement(ingredient,"dropdown-ingredient");
      let appareilNode = creationLienElement(appareil, "dropdown-appareil");
      let ustensileNode = creationLienElement(ustensile, "dropdown-ustensile");

      //effacement et remplissage de chacun des dropdown
      miseAjourDeLaListeDropdown(ingredientNode, "dropdown-ingredient");
      miseAjourDeLaListeDropdown(appareilNode, "dropdown-appareil");
      miseAjourDeLaListeDropdown(ustensileNode, "dropdown-ustensile");

      //pose d'écouteur sur chacun des liens des dropdowns mis à jour
      ecouteLienDropdown(ingredientNode, "tagIngredient");
      ecouteLienDropdown(appareilNode, "tagAppareil");
      ecouteLienDropdown(ustensileNode, "tagUstensile");

      //mémorisation des différentes recettes resultant des recherches tag à partie de l'index 1
      //l'index 0 étant réservé pour la totalité des recettes (50)
      globalTableau.push(recipeElement);

      //creation de la div qui encapsule le Tag de l'élément selectionné
      const tagRecherche = document.getElementById("tagRecherche");
      const tagNouvelleDiv = document.createElement("div");

      tagNouvelleDiv.innerHTML = `<div class="relative w-[203px] h-[53px] px-[18px] py-[17px] border-2 bg-amber-300 rounded-[10px] justify-start items-center gap-[60px] inline-flex">
            <div class="text-black tagIngredient text-sm font-normal font-['Manrope']">
            ${valeurText}
            </div>
            <button class="closeTag absolute hover:bg-croixTag h-10 w-[40px] left-40 bg-no-repeat bg-croixTag bg-center" id="closeTag" name=${index}></button>
          </div>`;

      // Ajoutez la nouvelle div a tagRecherche
      tagRecherche.appendChild(tagNouvelleDiv);

      //-------cette partie de code donne la possibilité de fermer le tag--------
      const closeTags = document.querySelectorAll("#closeTag");
      //vérifier la présence d'un tag de recherche
      if (closeTags.length !== 0) {
        closeTags.forEach((tag) => {
          tag.addEventListener("click", (event) => {
            
            //savoir qui a cliqué !
            const enfantClique = event.target;
            //suppression du Tag cliqué
            const parentAfermer = enfantClique.parentNode;
            const grandpereAfermer = parentAfermer.parentNode;
            grandpereAfermer.remove();

            //récupération du contexte et test si c'est le dernier tag
            let numberTag = document.querySelectorAll("#closeTag")
            let searchInput = document.querySelector(".searchInput");
            
            if(numberTag.length === 0){
              if(searchInput.value !== ""){
                //console.log("la barre de recherche n'est pas vide !")
                recipeElement = recettesSauvegardéesSearchBar
              }else{
              recipeElement = recipes
              }
            }else{
            recipeElement = globalTableau[enfantClique.name];
            }
            //affichage des recettes contenues dans le tableau d'objets java script
            displayRecherche(recipeElement);
            
            //.........mise à jour des dropdown........
            //selection des recettes affichées sur l'ecran
            let displayRecettes = document.querySelectorAll('[class^="recipe"]');
            //récuperation des éléments
            let ingredient = recupereElements(displayRecettes, ".ingredient");
            let appareil = recupereElements(displayRecettes, ".appliance");
            let ustensile = recupereElements(displayRecettes, ".ustensile");
            //création des liens du dropdown pour chaque élément
            let ingredientNode = creationLienElement(
              ingredient,
              "dropdown-ingredient"
            );
            let appareilNode = creationLienElement(
              appareil,
              "dropdown-appareil"
            );
            let ustensileNode = creationLienElement(
              ustensile,
              "dropdown-ustensile"
            );
            //vidage et remplissage de chacun des dropdown
            miseAjourDeLaListeDropdown(ingredientNode, "dropdown-ingredient");
            miseAjourDeLaListeDropdown(appareilNode, "dropdown-appareil");
            miseAjourDeLaListeDropdown(ustensileNode, "dropdown-ustensile");

            //pose d'écouteur sur chaque lien créé
            ecouteLienDropdown(ingredientNode);
            ecouteLienDropdown(appareilNode);
            ecouteLienDropdown(ustensileNode);
          });//fin écouteur closeTag
        });//fin forEach() closeTag
      }//fin du if closeTag
      //incrementation des n° de tag de recherche
      index++;
      //affichage des recettes contenues dans le tableau d'objets java script
      displayRecherche(recipeElement);
    }); //fin listener des liens
  }); //fin forEach
} //fin fonction

/**
 *
 * @param {*} dropdown :efface la liste du dropdown
 */
export function viderLi(dropdown) {
  const ulElement = document.getElementById(`${dropdown}`);
  const divElement = ulElement.querySelector(".flex");

  // Supprimer tous les enfants de l'élément ul, à partir du deuxième enfant jusqu'à la div
  while (
    ulElement.children.length > 1 &&
    ulElement.children[1] !== divElement
  ) {
    ulElement.removeChild(ulElement.children[1]);
  }
}

/**
 *
 * @param {*} argument : id
 */
export function viderDiv(argument) {
  let maDiv = document.getElementById(`${argument}`);
  maDiv.innerHTML = ""; // je supprime tous les éléments enfants de la div
}

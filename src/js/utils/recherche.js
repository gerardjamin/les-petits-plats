import { factoryObject } from "../factories/recetteProvider.js";
import {
  recupereElements,
  creationLienElement,
  miseAjourDeLaListeDropdown,
  ecouteLienDropdown,
  viderDiv,
} from "../utils/utils.js";

//initialisation des noeuds
const searchInput = document.getElementById("searchInput");
const spaceRecette = document.getElementById("spaceRecette");
const Recette = document.getElementById("recettes");
const boutton = document.getElementById("submit");
const compteur = document.getElementById("compteur");
const form = document.getElementById("form");
//initialisation des variables
let inputElement = form.elements["searchInput"];
let index = 0;
let tabObjetTag = [];
let recipeElement = [];
let characters = "";
let tableauDeNodes = [];

//-----------------------------partie recherche barre principale---------------------------------
//Ajoutez un écouteur d'événements sur la barre de recherche
searchInput.addEventListener("keyup", (e) => {
  // recette = objet du DOM qui contient toutes les recettes (recette1,recette2...) affichées à l'écran soit 50 recettes (totalité de la base de données)
  const recette = document.querySelectorAll('[class^="recipe"]');
  characters = e.target.value.trim();
  //initialisation des tableaux
  let recherches = [];
  recipeElement = [];
  // le tableau contient toutes les recettes du DOM sous format javascript (50) qui seront affichées, ces objets seront convertit lors de l'utilisation pour l'affichage à l'écran (.outerHTML)
  let recipes = factoryObject();

  //gestion de l'effacement de la barre de recherche
  effacementRecherche();

  //le nombre de caracteres du mot a rechercher dans la barre principale doit etre superieur à 3 caractères
  if (characters.length < 3) {
    index = 0;

    //remplissage de spaceRecette avec la totalité des recettes
    recipes.forEach((recipeElement) => {
      index += 1;
      //Ajoute chaque recette à la section spaceRecette pour affichage de la page d'accueuil
      spaceRecette.insertAdjacentHTML("beforeend", recipeElement.outerHTML);
    });
    //compte le nombre de recettes pour l'affichage du nombre de recettes
    compteur.innerHTML = `${index} RECETTES`;

    //selection des recettes présentent dans spaceRecette 
    let displayRecettes = document.querySelectorAll('[class^="recipe"]');
    //récuperation des différents éléments
    let ingredient = recupereElements(displayRecettes, ".ingredient");
    let appareil = recupereElements(displayRecettes, ".appliance");
    let ustensile = recupereElements(displayRecettes, ".ustensile");
    //création des liens de la liste du dropdown pour chaque élément
    let ingredientNode = creationLienElement(ingredient, "dropdown-ingredient");
    let appareilNode = creationLienElement(appareil, "dropdown-appareil");
    let ustensileNode = creationLienElement(ustensile, "dropdown-ustensile");
    //effacement et remplissage de chacune des listes du dropdown
    miseAjourDeLaListeDropdown(ingredientNode, "dropdown-ingredient");
    miseAjourDeLaListeDropdown(appareilNode, "dropdown-appareil");
    miseAjourDeLaListeDropdown(ustensileNode, "dropdown-ustensile");
    //pose d'écouteurs sur chaque lien créé
    ecouteLienDropdown(ingredientNode);
    ecouteLienDropdown(appareilNode);
    ecouteLienDropdown(ustensileNode);

  } else {
    // recherche des ingredients sur les recettes affichées soit 50 recettes et
    //retourne les recettes trouvées
    recherches = filtreRecette(characters, recette, "tagIngredient");
    // Trouver les cardElements et les stocker
    recherches.forEach((recherche) => {
      recipeElement.push(
        recipes.find((recipeElement) => {
          return recipeElement.classList.contains(recherche);
        })
      );
    });
    //initialisation du tableau tabObjetTag
    tabObjetTag = [];
    //affichage du résultat de la recherche
    displayRecherche(recipeElement);

    //selection des recettes présentent dans spaceRecette 
    let displayRecettes = document.querySelectorAll('[class^="recipe"]');
    //récuperation des différents éléments
    let ingredient = recupereElements(displayRecettes, ".ingredient");
    let appareil = recupereElements(displayRecettes, ".appliance");
    let ustensile = recupereElements(displayRecettes, ".ustensile");
    //création des liens de la liste du dropdown pour chaque élément
    let ingredientNode = creationLienElement(ingredient, "dropdown-ingredient");
    let appareilNode = creationLienElement(appareil, "dropdown-appareil");
    let ustensileNode = creationLienElement(ustensile, "dropdown-ustensile");
    //effacement et remplissage de chacune des listes du dropdown
    miseAjourDeLaListeDropdown(ingredientNode, "dropdown-ingredient");
    miseAjourDeLaListeDropdown(appareilNode, "dropdown-appareil");
    miseAjourDeLaListeDropdown(ustensileNode, "dropdown-ustensile");
    //pose d'écouteurs sur chaque lien créé
    ecouteLienDropdown(ingredientNode);
    ecouteLienDropdown(appareilNode);
    ecouteLienDropdown(ustensileNode);
  }
}); //fin eventListenerSearch

// Ajoutez un écouteur d'événements sur le boutton de la recherche (loopover)
boutton.addEventListener("click", () => {
  if (characters.length > 2) {
    displayRecherche(recipeElement);
  } else {
    //nothing
  }
});

// Ajoutez un écouteur d'événements sur l'entrée de la recherche (loopover)
inputElement.addEventListener("click", () => {
  placeHolder();
});

/**
 *gestion de l'affichage des recettes selectionnées
 */
export const displayRecherche = (argObjetRecette) => {
  //effacement des articles de spaceRecette avant de la remettre à jour avec les
  //recettes sélectionnées
  viderDiv("spaceRecette");
  index = 0;

  if (argObjetRecette.length != 0) {
    argObjetRecette.forEach((element) => {
      // spaceRecette.insertAdjacentHTML('beforeend', element.outerHTML);
      spaceRecette.appendChild(element);
      index += 1;
    });
    //calcul du nombre de recettes
    compteur.innerHTML = `${index} RECETTES`;
  } else {
    //affichage du message pour une recherche nulle
    let recherche = searchInput.value;
    let maDiv = document.getElementById("divMessage");
    if (maDiv !== null) {
      maDiv.remove();
      message(recherche);
    } else {
      message(recherche);
    }
    compteur.innerHTML = `${index} RECETTES`;
  }
};

/**
 * lance la recherche du mot clé dans la description, le titre, les ingrédients de toutes les recettes (DOM)
 * @param {*} characters mot clé entré dans la zone de recherche
 * @param {*} recette nodeList des recettes affichées à l'écran. (50 recettes dans le cas de la recherche de la barre principale)
 */
export function filtreRecette(characters, recette, tag) {
  let filterRecette = [];
  let filterRecetteElement = [];
  let searchIngredient;
  let searchAppareil;
  let searchUstensile;

  //---------recherche de recettes à l'aide du mot clé entré dans la barre principale------

  //le mot clef entré dans la barre principale dois etre strictement superieur à 2 caracteres
  if (characters.length > 2) {
    //pour chacune des recettes présente dans spaceRecette (cad affichées à l'écran (DOM))
    let debut = performance.now()
    for (let i = 0; i < recette.length; i++) {
      // recupere le nom de chacune des classes (recette01,recette02....)
      let nameClass = recette[i].classList[0];
      //Convertion de la NodeList en un tableau pour la recherhe des ustensiles et appareils
      let tableauRecette = Array.from(recette);

      if (tag === "tagIngredient") {
        searchIngredient = document.querySelectorAll(
          `.${nameClass} .ingredient`
        );
        const searchTitre = document.querySelectorAll(
          `.${nameClass} #titreRecette`
        );
        const searchDescription = document.querySelectorAll(
          `.${nameClass} #description`
        );

        //--------recherche des ingredients dans ingrédient,titre,description sur chacune des recettes---------
        for (let j = 0; j < searchIngredient.length; j++) {
          if (searchIngredient[j].innerHTML.includes(characters)) {
            tabObjetTag.push(recette[i]);
            filterRecette.push(nameClass);
          }
        }
        for (let k = 0; k < searchTitre.length; k++) {
          if (searchTitre[k].textContent.toLowerCase().includes(characters)) {
            filterRecette.push(nameClass);
          }
        }
        for (let l = 0; l < searchDescription.length; l++) {
          if (
            searchDescription[l].textContent.toLowerCase().includes(characters)
          ) {
            filterRecette.push(nameClass);
          }
        }
        //recoit le tableau des recettes sélectionnées et élimine les doublons
        filterRecetteElement = [...new Set(filterRecette)];
      } else if (tag === "tagAppareil") {
        // Vérifier que l'index i est valide
        if (i >= 0 && i < tableauRecette.length) {
          searchAppareil = tableauRecette[i].querySelectorAll(
            `.${nameClass} .appliance`
          );
        } else {
          console.error(`L'index ${i} est hors des limites du tableau.`);
        }
        //recherche des appareils sur chacune des recettes
        for (let m = 0; m < searchAppareil.length; m++) {
          if (searchAppareil[m].innerHTML.includes(characters)) {
            tabObjetTag.push(recette[i]);
            filterRecette.push(nameClass);
          }
        }

        //on élimine les doublons
        filterRecetteElement = [...new Set(filterRecette)];
      } else if (tag === "tagUstensile") {
        if (i >= 0 && i < tableauRecette.length) {
          searchUstensile = tableauRecette[i].querySelectorAll(
            `.${nameClass} .ustensile`
          );
        } else {
          console.error(`L'index ${i} est hors des limites du tableau.`);
        }
        //recherche des ustensiles sur chacune des recettes
        for (let n = 0; n < searchUstensile.length; n++) {
          if (searchUstensile[n].innerHTML.includes(characters)) {
            tabObjetTag.push(recette[i]);
            filterRecette.push(nameClass);
          }
        }
        filterRecetteElement = [...new Set(filterRecette)];
      }
    } //fin for
    let fin = performance.now()
    let tempsExecution = fin - debut
    console.log(`Le recherche a pris ${tempsExecution} millisecondes pour s'exécuter.`)
  } //fin if
  return filterRecetteElement;
} //fin fonction

/**
 * gère l'effacement de la barre de recherche lors de l'effacement avec la croix
 */
function effacementRecherche() {
  //gestion de l'effacement de la recherche
  var inputElement = document.getElementById("searchInput");
  var existingButton = document.getElementById("deletingButton");
  //verification de la presence de la croix d'effacement
  if (!existingButton) {
    // le bouton n'existe pas on le cré
    var deletingButton = document.createElement("button");
    deletingButton.className =
      "absolute h-10 w-[100px] right-4 top-3 bg-no-repeat bg-croix bg-center hover:bg-croix";
    deletingButton.id = "deletingButton";
    // le bouton est placé après l'élément input
    inputElement.insertAdjacentElement("afterend", deletingButton);
  }
}

/**
 * supprime le placeholder et place un curseur clignotant
 */
const placeHolder = () => {
  searchInput.value = "   ";
};

//-------------------------------partie message de recherche nulle------------------------------
/**
 // creation d'une nouvelle div pour afficher le message car aucune recette n'a été trouvée
 * @param {*} recherche 
 */
let message = (recherche) => {
  let newDiv = document.createElement("div");
  newDiv.classList.add("my-4", "w-full", "divMessage");
  newDiv.id = "divMessage";
  let newParagraph = document.createElement("p");
  newParagraph.classList.add("my-4", "w-full");
  newParagraph.id = "message";
  newParagraph.textContent = `Aucune recette ne contient ${recherche}. Vous pouvez chercher << tarte aux pommes >>, << poisson >>, etc...`;
  newDiv.appendChild(newParagraph);
  Recette.appendChild(newDiv);
};

//-----------------------------partie recherche par tag---------------------------------
/**
 * 
 * @param {*} characteresTag :nom du tag
 * @param {*} tag type de tag
 * @returns 
 */
export function rechergeTag(characteresTag, tag) {
  // objet du DOM qui contient toutes les recettes (recette1,recette2...) affichées a l'ecran
  let recette = document.querySelectorAll('[class^="recipe"]');

  //utilisé par les Tag avec la recherche principale
  if (tag) {
    //memorisation des recettes selectionnées a chaque recherche par Tag et retrait des doublons
    recette = [...new Set(recipeElement)];
  }
  //si aucun mot clef dans la barre principale
  if (characters === "") {
    //le tableau stocke les recettes selectionnées par une recherche Tag a N-1
    tableauDeNodes.push(recette);
  }
  // recherches[]: tableau qui contient le nom de classe des recettes qui contiennent l'ingredient recherché
  let recherches = filtreRecette(characteresTag, recette, tag);

  //tabObjetTag[]: tableau javasript qui contient les recettes avec l'ingrédient recherché
  //utilise un tableau d'objet
  displayRecherche(tabObjetTag);

  //initialisation du tableau entre chaque recherche par Tag
  tabObjetTag = [];

  return recherches;
}


      

import { recipes } from "../data/recipes.js";
import { recetteCard } from "../template/recetteCard.js";

/**
 *
 * @returns tableau java script contenant toute les recettes de la base de données
 */
export function factoryObject() {
  let recettes = []
  for (let i = 0; i < recipes.length; i++) {
    recettes.push(recetteCard(recipes[i]));
  }
  return recettes;
}



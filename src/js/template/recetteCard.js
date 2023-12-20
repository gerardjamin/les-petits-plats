export{recetteCard}

/**
 *
 * @param {*} recipe : contient toutes les informations de chaque recette
 * @returns le contenu du tag <article> a la page d'accueuil
 */

function recetteCard(recipe) {
  //création du noeud à incérer
  const article = document.createElement("article");
  article.className = "recipe" + `${recipe.id}`;
  let tabIngredient = []
  let tabQuantity = []
  let tabUnit = []
  let nombreIngredients = 0
 
  // Extraction des propriétés pour chaque recette
recipe.ingredients.forEach(({ ingredient, quantity, unit}) => {

    tabIngredient.push (`${ingredient}`)
    if(quantity){
        tabQuantity.push (`${quantity}`)}
    else{
        tabQuantity.push (" ")  
        }
    if(unit){
        tabUnit.push (`${unit}`)}
    else{
        tabUnit.push (" ")  
        }
  });

  nombreIngredients = tabIngredient.length
  
  while(nombreIngredients <6){
    tabIngredient.push (" ")
    tabQuantity.push (" ")  
    tabUnit.push (" ") 
    nombreIngredients +=1
    }

  article.innerHTML = `
<div class="w-[410px] h-[731px] relative bg-white rounded-[21px] shadow">
    <img class="rounded-t-[21px] w-[410px] h-[253px] left-0 top-0 absolute" src="/assets/images/Photos/${recipe.image}" alt="images les petits plats" />

     <div id="titreRecette" class="titreRecette left-[25px] top-[285px] absolute text-black text-lg font-normal font-anton">${recipe.name}</div>

    <div class="left-[25px] top-[341px] absolute flex-col justify-start items-start gap-8 inline-flex">
        <div class="flex-col justify-start items-start gap-2.5 flex">
            <div class="h-[107px] relative">
                <div class="left-0 top-0 absolute text-neutral-500 text-xs font-bold font-manrope uppercase   tracking-wide">RECETTE</div>

                 <div id="description" class="w-[380px] overflow-hidden h-[76px] left-0 top-[31px] absolute text-zinc-900 text-sm font-normal font-manrope" onmouseover="revealText(this)" onmouseout="annulerEffet(this)">${recipe.description}</div>
            </div>
        </div>
            <div class="h-[190px] flex-col justify-start items-start gap-2.5 flex">
             <div class="w-[350px] h-[190px] relative">
                  <div class="left-0 top-0 absolute text-neutral-500 text-xs font-bold font-manrope uppercase tracking-wide">Ingrédients</div>

                  <div class="w-full h-auto left-[1px] top-[31px] absolute">
                        <div class="ingredient w-2/5 overflow-hidden truncate left-0 top-0 absolute text-zinc-900 text-sm font-medium font-manrope">${tabIngredient[0]}</div>
                        <div class="left-0 top-[20px] absolute text-neutral-500 text-sm font-normal font-manrope">${tabQuantity[0]}${tabUnit[0]}</div>
                  </div>

                  <div class="w-full h-auto left-[179px] top-[31px] absolute">
                     <div class="ingredient w-2/5 overflow-hidden truncate left-14 top-0 absolute text-zinc-900 text-sm font-medium font-manrope">${tabIngredient[1]}</div>
                     <div class="left-14 top-[20px] absolute text-neutral-500 text-sm font-normal font-manrope">${tabQuantity[1]}${tabUnit[1]}</div>
                  </div>

                  <div class="w-full h-auto left-[1px] top-[91px] absolute">
                     <div class="ingredient w-2/5 overflow-hidden truncate left-0 top-0 absolute text-zinc-900 text-sm font-medium font-manrope">${tabIngredient[2]}</div>
                     <div class="left-0 top-[20px] absolute text-neutral-500 text-sm font-normal font-manrope">${tabQuantity[2]}${tabUnit[2]}</div>
                  </div>

                  <div class="w-full h-auto left-[179px] top-[91px] absolute">
                     <div class="ingredient w-2/5 overflow-hidden truncate left-14 top-0 absolute text-zinc-900 text-sm font-medium font-manrope" onmouseover="revealText(this)" onmouseout="annulerEffet(this)">${tabIngredient[3]}</div>
                     <div class="left-14 top-[20px] absolute text-neutral-500 text-sm font-normal font-manrope">${tabQuantity[3]}${tabUnit[3]}</div>
                  </div>

                  <div class="w-full h-auto left-[1px] top-[151px] absolute">
                     <div class="ingredient w-2/5 overflow-hidden truncate left-0 top-0 absolute text-zinc-900 text-sm font-medium font-manrope">${tabIngredient[4]}</div>
                     <div class="left-0 top-[20px] absolute text-neutral-500 text-sm font-normal font-manrope">${tabQuantity[4]}${tabUnit[4]}</div>
                  </div>

                  <div class="w-full h-auto left-[179px] top-[151px] absolute">
                    <div class=" ingredient w-2/5 overflow-hidden truncate left-14 top-0 absolute text-zinc-900 text-sm font-medium font-['Manrope']">${tabIngredient[5]}</div>
                    <div class="left-14 top-[20px] absolute text-neutral-500 text-sm font-normal font-['Manrope']">${tabQuantity[5]}${tabUnit[5]}</div>
                  </div>
                </div>
            </div>
     </div>

        <div class="px-[15px] py-[5px] left-[295px] top-[21px] absolute bg-amber-300 rounded-[14px] justify-center    items-center gap-2.5 inline-flex">
            <div class="text-center text-zinc-900 text-xs font-normal font-manrope">${recipe.time}min</div>
        </div>
</div> 
<p class="appliance hidden absolute" id="appliance">${recipe.appliance}</p>
<p class="ustensile hidden absolute" id="ustensile">${recipe.ustensils}</p>
`;
  return article;
}

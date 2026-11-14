export interface Recipes extends RecipesData {
  id: number
}

//for new data input
export interface RecipesData {
  name: string
  country: string
  category: string
  ingredients: string
  instructions: string
  imageUrl: string
  samoaReactions: number
  tongaReactions: number
  fijiReactions: number
  rarotongaReactions: number
  niueReactions: number
}

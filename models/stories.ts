export interface Stories extends StoriesData {
  id: number
  samoaReactions: number
  tongaReactions: number
  fijiReactions: number
  rarotongaReactions: number
  niueReactions: number
}

//for new data input
export interface StoriesData {
  recipeId: number
  name: string
  country: string
  story: string
  imageUrl: string
}

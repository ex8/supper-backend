export interface IPlate {
  images: string[]
  title: string
  slug: string
  description: string
  price: number
  tags?: string[]
  ingredients?: string[]
  isPublic: boolean
}

export interface Root {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: CreatedBy
  productType: ProductType
  masterData: MasterData
  key: string
  taxCategory: TaxCategory
  priceMode: string
  lastVariantId: number
}

export interface LastModifiedBy {
  isPlatformClient: boolean
  user: User
}

export interface User {
  typeId: string
  id: string
}

export interface CreatedBy {
  isPlatformClient: boolean
  user: User2
}

export interface User2 {
  typeId: string
  id: string
}

export interface ProductType {
  typeId: string
  id: string
}

export interface MasterData {
  current: Current
  staged: Staged
  published: boolean
  hasStagedChanges: boolean
}

export interface Current {
  name: Name
  description: Description
  categories: Category[]
  categoryOrderHints: CategoryOrderHints
  slug: Slug
  metaTitle: MetaTitle
  metaDescription: MetaDescription
  masterVariant: MasterVariant
  variants: Variant[]
  searchKeywords: SearchKeywords
}

export interface Name {
  "en-US": string
}

export interface Description {
  "en-US": string
}

export interface Category {
  typeId: string
  id: string
}

export interface CategoryOrderHints {}

export interface Slug {
  "en-US": string
}

export interface MetaTitle {
  "en-US": string
}

export interface MetaDescription {
  "en-US": string
}

export interface MasterVariant {
  id: number
  sku: string
  key: string
  prices: Price[]
  images: Image[]
  // attributes: any[]
  // assets: any[]
}

export interface Price {
  id: string
  value: Value
  key: string
  country: string
  channel: Channel
  validFrom: string
  validUntil: string
}

export interface Value {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Channel {
  typeId: string
  id: string
}

export interface Image {
  url: string
  dimensions: Dimensions
}

export interface Dimensions {
  w: number
  h: number
}

export interface Variant {
  id: number
  sku: string
  key: string
  prices: Price2[]
  images: Image2[]
  // attributes: any[]
  // assets: any[]
}

export interface Price2 {
  id: string
  value: Value2
  key: string
  country: string
  channel: Channel2
  validFrom: string
  validUntil: string
}

export interface Value2 {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Channel2 {
  typeId: string
  id: string
}

export interface Image2 {
  url: string
  dimensions: Dimensions2
}

export interface Dimensions2 {
  w: number
  h: number
}

export interface SearchKeywords {}

export interface Staged {
  name: Name2
  description: Description2
  categories: Category2[]
  categoryOrderHints: CategoryOrderHints2
  slug: Slug2
  metaTitle: MetaTitle2
  metaDescription: MetaDescription2
  masterVariant: MasterVariant2
  variants: Variant2[]
  searchKeywords: SearchKeywords2
}

export interface Name2 {
  "en-US": string
}

export interface Description2 {
  "en-US": string
}

export interface Category2 {
  typeId: string
  id: string
}

export interface CategoryOrderHints2 {}

export interface Slug2 {
  "en-US": string
}

export interface MetaTitle2 {
  "en-US": string
}

export interface MetaDescription2 {
  "en-US": string
}

export interface MasterVariant2 {
  id: number
  sku: string
  key: string
  prices: Price3[]
  images: Image3[]
  // attributes: any[]
  // assets: any[]
}

export interface Price3 {
  id: string
  value: Value3
  key: string
  country: string
  channel: Channel3
  validFrom: string
  validUntil: string
}

export interface Value3 {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Channel3 {
  typeId: string
  id: string
}

export interface Image3 {
  url: string
  dimensions: Dimensions3
}

export interface Dimensions3 {
  w: number
  h: number
}

export interface Variant2 {
  id: number
  sku: string
  key: string
  prices: Price4[]
  images: Image4[]
  // attributes: any[]
  // assets: any[]
}

export interface Price4 {
  id: string
  value: Value4
  key: string
  country: string
  channel: Channel4
  validFrom: string
  validUntil: string
}

export interface Value4 {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Channel4 {
  typeId: string
  id: string
}

export interface Image4 {
  url: string
  dimensions: Dimensions4
}

export interface Dimensions4 {
  w: number
  h: number
}

export interface SearchKeywords2 {}

export interface TaxCategory {
  typeId: string
  id: string
}

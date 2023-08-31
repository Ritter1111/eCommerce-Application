export interface ProductCardProps {
  id: string
  data: Current;
}
export interface ProductsResp {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: Base
  createdBy: Base
  productType: Base
  masterData: MasterData
  key: string
  taxCategory: Base
  priceMode: string
  lastVariantId: number
}

export interface Base {
  typeId: string
  id: string
}

export interface MasterData {
  current: Current
  staged: Current
  published: boolean
  hasStagedChanges: boolean
}

export interface Current {
  name: BaseProps
  description: BaseProps
  categories: Base[]
  categoryOrderHints: Empty
  slug: BaseProps
  metaTitle: BaseProps
  metaDescription: BaseProps
  masterVariant: MasterVariant
  variants: Variant[]
  searchKeywords: Empty
}

export interface BaseProps {
  "en-US": string
}

export interface Empty {}

export interface MasterVariant {
  id: number
  sku: string
  key: string
  prices: Price[]
  images: Image[]
}

export interface Price {
  id: string
  value: Value
  key: string
  country: string
  channel: Base
  validFrom: string
  validUntil: string
  discounted? : IDiscounted
}

export interface IDiscounted {
  value: Value
  discount: {
    typeId: string
    id: string
  }
}

export interface Value {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Image {
  url: string
  dimensions: {
    w: number
    h: number
  }
}

export interface Variant {
  id: number
  sku: string
  key: string
  prices: Price[]
  images: Image[]
}

export interface ProductPriceProps {
  itemDiscount: IDiscounted | undefined;
  currencySymbol: string | undefined;
  currencyCode: string | undefined
  itemPriceInCents: Value | undefined;
  productData: ProductsResp | null;
}

export interface IProductPrice {
  itemDiscount: IDiscounted 
  currencyCode: string
  itemPriceInCents: Value 
}

export interface IProductData {
  productData: ProductsResp | null;
}

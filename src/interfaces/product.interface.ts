export interface IProductCardProps {
  id: string
  data: {
    masterData: IMasterData;
  };
}

export interface IProductCartItem {
  id: string
  currencyCode: string
  itemDiscounted?: IDiscounted
  itemPriceInCents: number;
  itemName: string
  itemDeskr: string
  imageUrl: string
};

export interface IProductsResp {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: IBase
  createdBy: IBase
  productType: IBase
  masterData: IMasterData
  key: string
  taxCategory: IBase
  priceMode: string
  lastVariantId: number
  variants?: IVariant
}

export interface IBase {
  typeId: string
  id: string
}

export interface IMasterData {
  current: ICurrent
  staged: ICurrent
  published: boolean
  hasStagedChanges: boolean
}

export interface ICurrent {
  name: IBaseProps
  description: IBaseProps
  categories: IBase[]
  categoryOrderHints: IEmpty
  slug: IBaseProps
  metaTitle: IBaseProps
  metaDescription: IBaseProps
  masterVariant: IMasterVariant
  variants: IVariant[]
  searchKeywords: IEmpty
}

export interface IBaseProps {
  "en-US": string
}

export interface IEmpty {}

export interface IMasterVariant {
  id: number
  sku: string
  key: string
  prices: IPrice[]
  images: IImage[]
}

export interface IPrice {
  id: string
  value: IValue
  key: string
  country: string
  channel: IBase
  validFrom: string
  validUntil: string
  discounted? : IDiscounted
}

export interface IDiscounted {
  value: IValue
  discount: {
    typeId: string
    id: string
  }
}

export interface IValue {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface IImage {
  url: string
  dimensions: {
    w: number
    h: number
  }
}

export interface IVariant {
  id: number
  sku: string
  key: string
  prices: IPrice[]
  images: IImage[]
}

export interface IProductPriceProps {
  itemDiscount: IDiscounted | undefined;
  currencySymbol: string | undefined;
  currencyCode: string | undefined
  itemPriceInCents: number;
  productData: IProductsResp | null;
}

export interface IProductPrice {
  itemDiscount: IDiscounted
  currencyCode: string
  itemPriceInCents: number
}

export interface IProductData {
  productData: IProductsResp | null;
}

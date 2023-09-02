import { Dispatch, SetStateAction } from "react";
import { IBase, IBaseProps, IProductsResp, IVariant } from "./product.interface"

export interface IAllCategories {
  id: string;
  parent?: {
    id: string;
  };
  name: {
    'en-US': string;
  };
  children?: IAllCategories[];
}

export interface IProductCategories {
  data: Array<ICategoryResp>;
  setCards: Dispatch<SetStateAction<IProductsResp[] | ICategoryResp[]>>
}

export interface ICategoryResp {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: IBase
  createdBy: IBase
  key: string
  name: IBaseProps
  slug: IBaseProps
  description: IBaseProps
  ancestors: IBase[]
  parent: IBase
  orderHint: string
  metaTitle: IBaseProps
  metaDescription: IBaseProps
  variants: IVariant[]
}

// export interface IVariant {
//   id: number
//   sku: string
//   key: string
//   prices: IPrice[]
//   images: IImage[]
// }

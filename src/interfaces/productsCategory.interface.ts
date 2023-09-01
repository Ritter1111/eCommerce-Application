import { Dispatch, SetStateAction } from "react";
import { IBase, IBaseProps, IProductsResp } from "./product.interface"

export interface IProductCategories {
  data: Array<ICategory>;
  carts: IProductsResp[]
  setCarts: Dispatch<SetStateAction<IProductsResp[]>>
}

export interface ICategory {
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
  assets: []
}

import { Dispatch, SetStateAction } from "react";
import { IBase, IBaseProps, IMasterVariant, IProductsResp, IVariant } from "./product.interface"
import { BreadcrumbType } from "../types/breadcrumb.type";

export interface IBreadcrumbProps {
  breadcrumb: BreadcrumbType;
  handleCaregory: (categoryId: string) => void;
}

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

export interface IAllCategoriesPlusDeskr extends IAllCategories {
  description: {
    'en-US': string;
  };
}

export interface IProductCategories {
  fetchcards: () => void;
  categoriesData: Array<ICategoryResp>;
  setCards: Dispatch<SetStateAction<IProductsResp[] | ICategoryResp[]>>
  setProductCategoryName: Dispatch<SetStateAction<string>>
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
  masterVariant: IMasterVariant
  variants: IVariant[]
}

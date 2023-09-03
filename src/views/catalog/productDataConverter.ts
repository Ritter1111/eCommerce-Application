import { IProductsResp } from "../../interfaces/product.interface";
import { ICategoryResp } from "../../interfaces/productsCategory.interface";

export function convertProductCartItemAll(currentElData: IProductsResp) {
  return {
    id: currentElData.id,
    currencyCode:
      currentElData.masterData.current.masterVariant.prices[0].value
        .currencyCode,
    itemDiscounted:
      currentElData.masterData.current.masterVariant.prices[0].discounted,
    itemPriceInCents:
      currentElData.masterData.current.masterVariant.prices[0].value.centAmount,
    itemName: currentElData.masterData.current.name['en-US'],
    itemDeskr: currentElData.masterData.current.description['en-US'],
    imageUrl: currentElData.masterData.current.masterVariant.images[0].url,
  };
}

export function convertProductCartItemCategory(currentElData: ICategoryResp) {
  return {
    id: currentElData.id,
    currencyCode: currentElData.variants[0].prices[0].value.currencyCode,
    itemDiscounted: currentElData.variants[0].prices[0].discounted,
    itemPriceInCents: currentElData.variants[0].prices[0].value.centAmount,
    itemName: currentElData.name['en-US'],
    itemDeskr: currentElData.description['en-US'],
    imageUrl: currentElData.variants[0].images[0].url,
  };
}
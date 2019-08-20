// import { Item } from '../resources/models/item.model';
// import { fromItemActions } from './item.actions';
//
// export const ITEM_FEATURE_KEY = 'item';
//
// export interface ItemPartialState {
//   readonly [ITEM_FEATURE_KEY]: ItemState;
// }
//
// export interface ItemState {
//   items: Item[];
//   itemsLoading: boolean;
//   itemsLoadError: boolean;
// }
//
// export const initialState: ItemState = {
//   items: [],
//   itemsLoading: false,
//   itemsLoadError: false
// };
//
// export function itemReducer(
//   state: ItemState = initialState,
//   action: fromItemActions.CollectiveType
// ) {
//   switch (action.type) {
//     case fromItemActions.Types.GetItems:
//       state = { ...state, itemsLoading: true, itemsLoadError: false, items: [] };
//       break;
//
//     case fromItemActions.Types.GetItemsSuccess:
//       state = { ...state, items: action.payload, itemsLoading: false };
//       break;
//
//     case fromItemActions.Types.GetItemsFail:
//       state = { ...state, itemsLoading: false, itemsLoadError: true };
//   }
//
//   return state;
// }

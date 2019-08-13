// import { Injectable } from '@angular/core';
// import { select, Store } from '@ngrx/store';
// import { itemQuery } from './user.selectors';
// import { ItemPartialState } from './user.reducer';
// import { fromItemActions } from './item.actions';
//
// @Injectable()
// export class ItemFacade {
//   items$ = this.store.pipe(select(itemQuery.getItems));
//   itemsLoading$ = this.store.pipe(select(itemQuery.getItemsLoading));
//   itemsLoadError$ = this.store.pipe(select(itemQuery.getItemsLoadError));
//
//   constructor(private store: Store<ItemPartialState>) {}
//
//   getItems(): void {
//     this.store.dispatch(new fromItemActions.GetItems());
//   }
// }

/**
 * Created by galen on 2016/12/28.
 */

import * as types from './mutation-types';

export const addToCart = ({commit}, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    });
  }
};

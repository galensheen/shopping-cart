/**
 * Created by galen on 2016/12/28.
 */

import shop from '../../api/shop';
import * as types from '../mutation-types';

// initial state
// shape: {[id, quantity}]
const state = {
  added: [],
  checkoutStatus: null
};

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
};

const mutations = {
  [types.ADD_TO_CART](state, {id}) {
    state.lastCheckout = null;
    const record = state.added.find(p => p.id === id);
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      });
    } else {
      record.quantity++;
    }
  },
  
  // 清空购物车
  [types.CHECKOUT_REQUEST](state) {
    state.added = [];
    state.checkoutStatus = null;
  },
  
  [types.CHECKOUT_SUCCESS](state) {
    state.checkoutStatus = 'successful';
  },
  
  // 回滚购物车
  [types.CHECKOUT_FAILURE](state, {savedCartItems}) {
    state.added = savedCartItems;
    state.checkoutStatus = 'failed';
  }
};

const actions = {
  checkout({commit, state}, products) {
    const savedCartItems = [...state.added];
    commit(types.CHECKOUT_REQUEST);
    shop.buyProducts(products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, {savedCartItems}));
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}

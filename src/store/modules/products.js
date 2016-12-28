/**
 * Created by galen on 2016/12/28.
 */

import shop from '../../api/shop';
import * as types from '../mutation-types';

// initial state
const state = {
  all: []
};

const getters = {
  allProducts: state => state.all
};

const mutations = {
  [types.RECEIVE_PRODUCTS](state, {products}) {
    state.all = products;
  },
  
  [types.ADD_TO_CART](state, {id}) {
    state.all.find(p => p.id === id).inventory--
  }
};

const actions = {
  getAllProducts({commit}) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, {products});
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}

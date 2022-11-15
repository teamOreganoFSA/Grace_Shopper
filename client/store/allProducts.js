import axios from "axios";
/**
 * ACTION TYPES
 */
const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
/**
 * ACTION CREATORS
 */
const _fetchAllProducts = (products) => ({
  type: FETCH_ALL_PRODUCTS,
  products,
});

const _addNewProduct = (product) => ({
  type: ADD_NEW_PRODUCT,
  product,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});
/**
 * THUNK CREATORS
 */
//all products WITH FILTER MEN OR WOMEN CONDITIONAL

export const fetchAllProducts = (category) => {
  return async (dispatch) => {
    try {
      const url = category ? `/api/products/${category}` : `/api/products`;
      const { data } = await axios.get(url);

      dispatch(_fetchAllProducts(data));
    } catch (error) {
      console.log("Unable to fetch products");
      console.error(error);
    }
  };
};

export const addNewProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(_addNewProduct(data));
    } catch (error) {
      console.log("Unable to add product");
      console.error(error);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.delete(`/api/admin/${id}`, {
          headers: { authorization: token },
        });
        dispatch(_deleteProduct(data));
      } catch (error) {
        console.log("Unable to delete product");
        console.error(error);
      }
    }
  };
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.products;
    case ADD_NEW_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return action.products;
    default:
      return state;
  }
}

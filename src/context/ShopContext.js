import { createContext, useContext, useReducer } from 'react';

const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_PRICE: 'UPDATE_PRICE',
};

const initialState = {
  total: 0,
  products: [],
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.ADD_TO_CART:
      console.log(actions.ADD_TO_CART, payload);
      return {
        ...state,
        products: payload.products,
      };

    case actions.REMOVE_FROM_CART:
      console.log(actions.REMOVE_FROM_CART, payload);
      return {
        ...state,
        products: payload.products,
      };

    case actions.UPDATE_PRICE:
      console.log(actions.UPDATE_PRICE, payload);
      return {
        ...state,
        total: payload.total,
      };

    default:
      throw new Error(`No case for type ${type} found in shop reducer`);
  }
};

const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product) => {
    console.log('product to add...', product);
    const updatedCart = state.products.concat(product);
    console.log('cart updated on event add...', updatedCart);

    updatePrice(updatedCart);

    dispatch({
      type: actions.ADD_TO_CART,
      payload: {
        products: updatedCart,
      },
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter((p) => p.name != product.name);
    updatePrice(updatedCart);

    dispatch({
      type: actions.REMOVE_FROM_CART,
      payload: {
        products: updatedCart,
      },
    });
  };

  const updatePrice = (products) => {
    console.log('updatePrice', products);

    const total = products.reduce(
      (total, currentProduct) => currentProduct.price + total,
      0
    );

    console.log('total price cart: ', total);

    dispatch({
      type: actions.UPDATE_PRICE,
      payload: {
        total,
      },
    });
  };

  const { total, products } = state;

  const value = {
    total,
    products,
    addToCart,
    removeFromCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error('useShop must be used within ShopContext');
  }

  return context;
};

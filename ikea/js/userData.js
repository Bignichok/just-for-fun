import { getLocalStorage, setLocalStorage } from "./localStorageApi.js";

const userData = {
  _wishListData: getLocalStorage("wishList"),

  get wishList() {
    return this._wishListData;
  },
  set wishList(id) {
    if (this._wishListData.includes(id)) {
      const index = this._wishListData.indexOf(id);
      this._wishListData.splice(index, 1);
    } else {
      this._wishListData.push(id);
    }
    setLocalStorage("wishList", this.wishList);
  },

  _cartListData: getLocalStorage("cartList"),

  get cartList() {
    return this._cartListData;
  },
  set cartList(id) {
    let obj = this._cartListData.find((item) => item.id === id);
    if (obj) {
      obj.count++;
    } else {
      obj = {
        id,
        count: 1,
      };
      this._cartListData.push(obj);
    }
    setLocalStorage("cartList", this.cartList);
  },

  set changeCountCartList(cartItem) {
    let obj = this._cartListData.find((item) => item.id === cartItem.id);
    obj.count = cartItem.count;
    setLocalStorage("cartList", this.cartList);
  },

  set deleteCartItem(idd) {
    let index = -1;
    this.cartList.forEach((item, i) => {
      if (item.id === idd) {
        index = i;
      }
    });
    this.cartList.splice(index, 1);
    setLocalStorage("cartList", this.cartList);
  },
};

export default userData;

const mouseUtilActionTypes = {
    SCROLL_POS: "SCROLL_POS",
    OPEN_MENU: "OPEN_MENU"

}

export const getScrollPos = () => ({
    type: mouseUtilActionTypes.SCROLL_POS,
    payload: window.pageYOffset || document.documentElement.scrollTop,
   });

 export const openMenu = boolean => ({
    type: mouseUtilActionTypes.OPEN_MENU,
    payload: boolean,
  });  
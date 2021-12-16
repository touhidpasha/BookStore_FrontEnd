export const setBooks = (books,searchString,index) => {
    return (dispatch) => {
        dispatch({
            type: "setBooks",
            payload: books,
            searchString:searchString,
        });
    }
}
export const setCarts = (carts) => {
    return (dispatch) => {
        dispatch({
            type: "setCarts",
            payload: carts,
        });
    }
}





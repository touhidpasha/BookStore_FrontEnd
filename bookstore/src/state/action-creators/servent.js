
// class actionCreators {
export const setBooks = (books,searchString,index) => {
    return (dispatch) => {
        dispatch({
            type: "setBooks",
            payload: books,
            searchString:searchString,
            // index:index
        });
    }
}




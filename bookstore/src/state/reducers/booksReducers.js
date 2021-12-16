import { combineReducers } from "redux";

const initialState = { "data": [] };

const booksReducers = (state = initialState, action) => {
    switch (action.type) {
        case "setBooks":
            var searchString = action.searchString
            console.log("index value in reducer"+action.index);
            if (searchString == "")
                return { ...state, "data": [...action.payload]}//.slice(action.index*12, (action.index*12) +12)}
            else {
                return { ...state, "data": [...action.payload].filter(book => { return book.title.includes(searchString)}) }
            }
        case "getBooks":
            return state;
        default:
            return state
    }
}
const cartsReducers = (state = initialState, action) => {
    switch (action.type) {
        case "setCarts":
                return { ...state, "data": [...action.payload]}//.slice(action.index*12, (action.index*12) +12)}
       default:
           return state
    }
}

// export default reducer;
const reducers = combineReducers({
    book: booksReducers,
    cart: cartsReducers
})
export default reducers
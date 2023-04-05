const initialState = {
    basket: {}
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "UPDATE_BASKET":
            return {
                basket: action.basket
            }
        case "CLEAR_BASKET":
            return {
                basket: {}
            }
        default:
            return state;
    }
}
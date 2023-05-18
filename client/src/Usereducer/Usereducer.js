export const initialState = null

export const reducer = (state, action) => {
    if (action.type === "user") {
     
        return action.payload;
    }
    else if (action.type === "CLEAR") {

        return null;
    }
    else {
        return state
    }

}
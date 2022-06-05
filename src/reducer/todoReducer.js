const initialValues = {
    show: false,
    title: "Add title",
    arr : []
}

export default (state = initialValues, action) => {
    switch (action.type){
        case 'SET_SHOW':
            return{
                ...state,
                show: action.payload
            };
        case 'SET_TITLE':
            return{
                ...state,
                title: action.payload
            };
        case 'SET_ARR':
            return{
                ...state,
                arr: [...state.arr, action.payload]
            };
        case 'SET_CLEAR':
            return {
                ...state,
                arr: action.payload
            }
        default:
            return state;
    }
}
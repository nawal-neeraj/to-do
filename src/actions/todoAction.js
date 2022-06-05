export const setShow = show => {
    return {
        type: 'SET_SHOW',
        payload: show
    }
}

export const setTitle = title => {
    return {
        type: 'SET_TITLE',
        payload: title
    }
}

export const setArr = arr => {
    return {
        type: 'SET_ARR',
        payload: arr
    }
}

export const setClearArr = arr => {
    return {
        type: 'SET_CLEAR',
        payload: arr
    }
}
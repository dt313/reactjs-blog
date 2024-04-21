const initialState = {
    noticationCount: 0,
    noticationList: [],
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.noticationCount + 1 };
        case 'DECREMENT':
            return { ...state, counter: state.noticationCount - 1 };
        default:
            return state;
    }
};

export default notificationReducer;

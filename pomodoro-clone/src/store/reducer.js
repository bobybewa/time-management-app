const initialState = {
    todos : []
}

export default function reducer(state = initialState, action){
    const {payload, type} = action
    switch (type) {
        case 'addNewTask':
            return {...state, todos: state.todos.concat(payload)}
        case 'deleteTask':
            return {...state, todos: payload}
        case 'updatedTasks':
            return {...state, todos: payload}
        case 'clearTask':
            return {...state, todos:payload}
        default:
            return state;
    }
}
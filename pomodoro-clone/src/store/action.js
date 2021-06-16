import {
    ADDTASK,
    DELETETASK,
    UPDATEDTASKS,
    CLEARTASKS
} from './actionType.js'

export function addNewTask(payload){
    return {type: ADDTASK, payload}
}

export function deleteTask(payload){
    console.log(payload);
    return {type: DELETETASK, payload}
}

export function tasksComplete(payload){
    return {type: UPDATEDTASKS, payload}
}

export function tasksCleared(payload){
    return {type: CLEARTASKS, payload}
}
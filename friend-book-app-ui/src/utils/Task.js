export  function getTextByStatusTask(statusTask){
    switch (statusTask) {
        case 0: return  'в процессе'
        case 1: return  'завершена'
        case 2: return  'прекращена'
        default: return  'ошибка'
    }
}

export function TaskViewDTOMapToTask(taskDTO){
    return {
        groupId:taskDTO.groupId ?? '',
        name:taskDTO.name ?? '',
        description: taskDTO.description ?? '',
        statusTask: taskDTO.status ?? 0,
        taskEnd: taskDTO.dateEndWork.substring(0,10) ?? '',
        taskStart: taskDTO.dateStartWork.substring(0,10) ?? '',
        usersNames : taskDTO.users ?? []
    }
}

export  function SplitUsers(...users){
    if ((users.length === 1 && Array.isArray(users[0]) && users[0].length === 0) || users.length === 0) {
        return 'Никого';
    }
    return users.join(", ");
}

export function DeleteSubscribedUserToTask(tasks, task, login){
    return tasks.map((t) => {
        if (t.name === task.name && t.groupId === task.groupId) {
            const updatedUsers = t.usersNames.filter((name) => name !== login);
            return { ...t, usersNames: updatedUsers };
        }
        return t;
    });
}

export function AddSubscribedUserToTask(tasks, task, login){
    return tasks.map((t) => {
        if (t.name === task.name && t.groupId === task.groupId) {
            const updatedUsers = [...t.usersNames, login];
            return { ...t, usersNames: updatedUsers };
        }
        return t;
    });
}

export  function  DeleteTaskInTasks(tasks,nameDeletedTask) {
    return  tasks.filter((t) => !(t.name === nameDeletedTask))
}
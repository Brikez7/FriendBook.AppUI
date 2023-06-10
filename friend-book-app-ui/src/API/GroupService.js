import {$authGroupHost, $authHost} from "../http";

const controllerAccountStatusGroup = 'AccountStatusGroup/'
const controllerGroup = 'Group/'
const controllerGroupTask = 'GroupTask/'

export const getODataGetMyGroups = async () => {
    try {
        const response = (await $authGroupHost.get(`${controllerGroup}OData/GetMyGroups`)).data
        return response;
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const GetMyGroupsWithMyStatus = async () => {
    try {
        const response = (await $authGroupHost.get(`${controllerGroup}OData/GetMyGroupsWithMyStatus`)).data
        return response;
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const addGroup = async (name) => {
    try {
        const response = (await $authGroupHost.post(`${controllerGroup}Create/${name}`)).data;
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const addStatusGroup = async (statusGroupDTO) => {
    try {
        const requestData = {
            IdGroup:statusGroupDTO.groupId ?? '',
            AccountId: statusGroupDTO.activeProfileId ?? '',
            RoleAccount: statusGroupDTO.roleUser ?? 0
        };
        const response = (await $authGroupHost.post(`${controllerAccountStatusGroup}Create`,requestData)).data;
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const changeGroup = async (name,id) => {
    try {
        const requestData = {
            GroupId: id,
            CreatedDate: null,
            Name: name
        };
        const response = (await $authGroupHost.put(`${controllerGroup}Update`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const changeStatusGroup = async (statusGroupDTO) => {
    try {
        const requestData = {
            GroupId:statusGroupDTO.GroupId ?? '',
            AccountId: statusGroupDTO.AccountId ?? '',
            RoleAccount: statusGroupDTO.RoleAccount ?? 1
        };
        console.log(requestData)
        const response = (await $authGroupHost.put(`${controllerAccountStatusGroup}Update`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const SubscribeTask = async (DataSubscribeTask) => {
    try {
        const requestData = {
            GroupId:DataSubscribeTask.idGroup ?? '',
            Name: DataSubscribeTask.nameTask ?? ''
        };
        console.log(requestData)
        const response = (await $authGroupHost.put(`${controllerGroupTask}SubscribeTask`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const UnsubscribeTask = async (DataUnsubscribeTask) => {
    try {
        const requestData = {
            GroupId:DataUnsubscribeTask.idGroup ?? '',
            Name: DataUnsubscribeTask.nameTask ?? ''
        };
        const response = (await $authGroupHost.put(`${controllerGroupTask}UnsubscribeTask`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const DeleteTask = async (deletedTask) => {
    try {
        const requestData = {
            groupId:deletedTask.idGroup ?? '',
            name: deletedTask.nameTask ?? ''
        };
        console.log(requestData)
        const response = (await $authGroupHost.delete(`${controllerGroupTask}Delete`,{
            data:requestData
        })).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const AddTaskGroup = async (task) => {
    try {
        const requestData = {
            GroupId: task.idActiveGroup,
            Name: task.nameTask ,
            Description: task.description,
            DateEndWork:  task.dateEndWork,
        };
        console.log(requestData)
        const response = (await $authGroupHost.post(`${controllerGroupTask}Create`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}

export const ChangeTaskGroup = async (task) => {
    try {
        const requestData = {
            GroupId: task.idActiveGroup,
            NewName: task.newNameTask ,
            OldName: task.oldNameTask,
            Description:task.description,
            DateEndWork: task.dateEndWork,
            Status: task.status
        };
        console.log(requestData)
        const response = (await $authGroupHost.put(`${controllerGroupTask}Update`,requestData)).data
        return response
    }
    catch (e){
        console.log(e.message)
        return {message:e.message};
    }
}


export const deleteGroup = async (idGroupGuid) => {
    try {
        const response = (await $authGroupHost.delete(`${controllerGroup}Delete/${idGroupGuid}`)).data;
        return response;
    } catch (e) {
        console.log(e.message);
        return {message:e.message};
    }
};

export const deleteStatusGroup = async (idGroup,idUser) => {
    try {
        const response = (await $authGroupHost.delete(`${controllerAccountStatusGroup}Delete`, {
            params: {
                idGroup: idGroup,
                idUser: idUser
            }})).data
        return response;
    }
    catch (e) {
        console.log(e.message)
        return {message:e.message};
    }
}

export const GetProfilesByIdGroup = async (login,idGroup) => {
    try {
        const response = (await $authGroupHost.get(`${controllerAccountStatusGroup}GetProfilesByIdGroup`, {
            params: {
                idGroup: idGroup,
                login: login
            }})).data;
        return response;
    } catch (e) {
        console.log(e.message);
        return {message:e.message};
    }
}

export const GetTasksByIdGroup = async ({nameTask,idActiveGroup}) => {
    try {
        const response = (await $authGroupHost.get(`${controllerGroupTask}OData/GetTasks`, {
            params: {
                idGroup: idActiveGroup,
                nameTask: nameTask ?? ''
            }})).data;
        return response;
    } catch (e) {
        console.log(e.message);
        return {message:e.message};
    }
}
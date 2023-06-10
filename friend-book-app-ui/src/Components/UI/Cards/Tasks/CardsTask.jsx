import React, {useContext} from 'react';
import {DeleteTask, SubscribeTask, UnsubscribeTask} from "../../../../API/GroupService";
import {AuthContext} from "../../../../Context/AuthContext";
import TaskCard from "./TaskCard";
import {AddSubscribedUserToTask, DeleteSubscribedUserToTask, DeleteTaskInTasks} from "../../../../utils/Task";
const CardsTask = ({tasks,isAdmin,setIsVisibleFormChange,setTasks,LoadTaskInFormChange}) => {
    const {user} = useContext(AuthContext)
    const existsUserInTask = (task) => task.usersNames && task.usersNames.includes(user.user.Login)
    const handleSubscribeTask = async (e,task) => {
        e.preventDefault()

        const response = await SubscribeTask({nameTask:task.name, idGroup:task.groupId})
        if(response.message !== null){
            alert(response.message)
            return;
        }

        const updatedTasks = AddSubscribedUserToTask(tasks,task,user.user.Login)
        setTasks(updatedTasks)
    }

    const handleUnsubscribeTask = async (e,task) => {
        e.preventDefault()

        const response = await UnsubscribeTask({nameTask:task.name, idGroup:task.groupId})

        if(response.message !== null){
            alert(response.message)
            return;
        }

        const updatedTasks = DeleteSubscribedUserToTask(tasks,task,user.user.Login)
        setTasks(updatedTasks)
    }

    const handleDeleteTask = async (e,task) => {
        e.preventDefault()

        const response = await DeleteTask({nameTask:task.name, idGroup:task.groupId})
        if(response.message !== null){
            alert(response.message)
            return;
        }
        if(!response.data){
            alert('Удаление не было завершено')
            return;
        }

        const updatedTasks = DeleteTaskInTasks(tasks,task.name)
        setTasks(updatedTasks)
    }

    console.log(tasks)
    return (
        <div>
            <div className={"album py-5 px-5 mt-5"}>
                <div className={"container"}>
                    <div className={"m-0 row g-5"  }>
                        { tasks.map((task) =>
                            <TaskCard
                                key={task.name + task.groupId}
                                task={task}
                                isAdmin={isAdmin}
                                existsUserInTask={existsUserInTask}
                                handleSubscribeTask={handleSubscribeTask}
                                handleUnsubscribeTask={handleUnsubscribeTask}
                                handleDeleteTask={handleDeleteTask}
                                setIsVisibleFormChange={setIsVisibleFormChange}
                                LoadTaskInFormChange={LoadTaskInFormChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsTask;
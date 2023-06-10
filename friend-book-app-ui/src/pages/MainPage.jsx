import React, {useEffect, useState} from 'react';
import CardsTask from "../Components/UI/Cards/Tasks/CardsTask";
import FilterByQueryAndType from "../Components/UI/Filters/FilterByQueryAndType";
import {
    AddTaskGroup, ChangeTaskGroup,
    GetMyGroupsWithMyStatus,
    GetTasksByIdGroup
} from "../API/GroupService";
import {getTextByStatusTask, TaskViewDTOMapToTask} from "../utils/Task";
import GroupWithStatusSelect from "../Components/UI/Inputs/Selects/GroupWithStatusSelect/GroupWithStatusSelect";
import FormTaskGroup from "../Components/UI/Inputs/Forms/FormAddTaskGroup/FormAddTaskGroup";
import InputText from "../Components/UI/Inputs/Inputs/InputText";
import {Form} from "react-bootstrap";
import {maxDate, minDate} from "../utils/Date";
import 'bootstrap/dist/css/bootstrap.min.css'
import BaseSelect from "../Components/UI/Inputs/Selects/BaseSelect/BaseSelect";
const MainPage = message => {
    const [idActiveGroup,setIdGroupActive] = useState('')
    const [optionGroup,setOptions] = useState([])
    const [tasks,setTasks] = useState([
    ])
    const [isAdmin,setIsAdmin] = useState(false)
    const [isVisibleFormAdd,setIsVisibleFormAdd] = useState(false)
    const [isVisibleFormChange,setIsVisibleFormChange] = useState(false)
    const [optionsStatusTask,setOptionsStatusTask] = useState([
        {value: 0, name: getTextByStatusTask(0)},
        {value: 1, name: getTextByStatusTask(1)},
        {value: 2, name: getTextByStatusTask(2)}
    ])

    useEffect(() => {
        GetMyGroupsWithMyStatus().then((response)=>{
            if(!response) {
                alert('Server not response')
                return;
            }
            if(response.message){
                alert(response.message)
                return;
            }
            const options = response.data.map((groupDTO)=>{return {value:groupDTO.groupId,name:groupDTO.name,isAdmin : groupDTO.isAdmin}})
            console.log(options)
            setOptions(options)
        }).finally()
    },[])

    const searchTask = async (nameTask) => {
        if(!idActiveGroup || idActiveGroup ===''){
            alert('Группа не выбрана')
            return;
        }
        const response = await GetTasksByIdGroup({nameTask: nameTask,idActiveGroup});
        if(response.message !== null || response.data === null){
            alert(response.message)
            return;
        }
        console.log(response.data)
        setTasks(response.data.tasksDTO.map((task) => {
            return TaskViewDTOMapToTask(task)
        }))
        setIsAdmin(response.data.isAdmin)
    };

    const changeGroup = (idGroup,isAdmin)=>{
        setIdGroupActive(idGroup)
        setIsAdmin(isAdmin)
        setTasks([])
    }

    const AddTask = async (e)=> {
        e.preventDefault()
        if (!idActiveGroup) {
            alert('вы не вы,рали группу')
            return
        }
        if(!newTask.nameTask || !newTask.dateEndWork)
        {
            alert('вы не назвали задачу или не выбрали дату')
            return
        }
        const response = await AddTaskGroup({
            idActiveGroup: idActiveGroup,
            nameTask: newTask.nameTask,
            description: newTask.description,
            dateEndWork: newTask.dateEndWork,
        })
        if(response.message !== null){
            alert(response.message)
            return;
        }
        setTasks([...tasks,TaskViewDTOMapToTask(response.data)])
        setIsVisibleFormAdd(false)
        clearNewTask();
    }

    const ChangeTask = async (e) => {
        e.preventDefault()
        if (!idActiveGroup) {
            alert('вы не выбрали группу')
            return;
        }
        if(!changeTask.newNameTask || !changeTask.dateEndWork)
        {
            alert('вы не назвали задачу или не выбрали дату')
            return;
        }
        console.log(changeTask)
        const response = await ChangeTaskGroup({
            idActiveGroup: idActiveGroup,
            newNameTask: changeTask.newNameTask,
            oldNameTask: changeTask.oldNameTask,
            description: changeTask.description,
            dateEndWork: changeTask.dateEndWork,
            status: changeTask.statusTask,
        })
        if(response.message !== null){
            alert(response.message)
            return;
        }
        const updatedTask = TaskViewDTOMapToTask(response.data)
        const updatedTasks = tasks.map((t) => {
            if (t.name === changeTask.oldNameTask && t.groupId === idActiveGroup) {
                // Заменить нужные поля на значения из taskView
                return {
                    ...t,
                    name: updatedTask.name,
                    description: updatedTask.description,
                    dateEndWork: updatedTask.taskEnd,
                    statusTask: updatedTask.statusTask
                };
            }
            return t;
        });
        console.log(updatedTasks)
        setTasks(updatedTasks);
        setIsVisibleFormChange(false)
        clearChangeTask()
    }

    const LoadTaskInFormChange = (nameTask,description,dateEndWork,statusTask)=> {
        setChangeTask({oldNameTask: nameTask,newNameTask:  nameTask,description: description,dateEndWork: dateEndWork,statusTask: statusTask})
    }

    const [newTask,setNewTask] = new useState({
        nameTask:'',
        description:'',
        dateEndWork:''
    })
    const clearNewTask = () => {
        setNewTask({nameTask:'',description:'',dateEndWork:''})
    }
    const [changeTask,setChangeTask] = useState({
        oldNameTask:'',
        newNameTask:'',
        description:'',
        dateEndWork:'',
        statusTask: 0
    })
    const clearChangeTask = () => {
        setChangeTask({newNameTask:'',description:'',dateEndWork:'',statusTask: 0,oldNameTask: ''})
    }
    return (
        <div>
            <div className={'w-100 py-5 mt-5 container border-bottom border-dark'}>
                <FilterByQueryAndType handleSearch={searchTask} labelTitle={'Введите название задачи'} classButton={'btn ms-5 btn-outline-primary w-25'} classInput={'w-25 ms-2 text-center'} placeholderInput={'Название задачи'}>
                    <GroupWithStatusSelect className={'w-25 ms-5'} variantMenu='primary' variantToggle='primary' options={optionGroup} value={idActiveGroup} onChangeValue={changeGroup} defaultValue={'выберите группу'} />
                </FilterByQueryAndType>
                { isAdmin &&
                <div className={'row mt-4'}>
                    <div className={'m-0 p-0'}>
                        <button className={'btn btn-outline-success w-25 mt-4'} onClick={() => setIsVisibleFormAdd(true)}>Добавить</button>
                    </div>
                </div>
                }
            </div>

            <CardsTask setIsVisibleFormChange={setIsVisibleFormChange}  LoadTaskInFormChange={LoadTaskInFormChange} setTasks={setTasks} isAdmin={isAdmin} idGroup={idActiveGroup} tasks={tasks}/>

            <FormTaskGroup setFormVisibleFalse={clearNewTask} isFormVisible={isVisibleFormAdd} setIsFormVisible={setIsVisibleFormAdd}>
                <Form className={'text-center'} onSubmit={AddTask}>
                    <label className={'mb-2'}>Дата сдачи задачи</label>
                    <Form.Control
                        value={newTask.dateEndWork}
                        onChange={e => setNewTask({...newTask,dateEndWork: e.target.value})}
                        placeholder="Поле для выбора даты"
                        type="date"
                        min={minDate}
                        max={maxDate}
                    />
                    <InputText className={'mt-3'} placeholder={'Название задачи'} value={newTask.nameTask} onChange={(e) => setNewTask({...newTask,nameTask: e.target.value})}/>
                    <InputText as="textarea" rows={4} className={'mt-3'} placeholder={'Описание задачи'} value={newTask.description} onChange={(e) => setNewTask({...newTask,description: e.target.value})}/>
                    {isAdmin &&
                        <button  className={'btn btn-outline-success mt-4 w-100'}>Добавить задачу</button>
                    }
                </Form>
            </FormTaskGroup>

            <FormTaskGroup setFormVisibleFalse={clearChangeTask} isFormVisible={isVisibleFormChange} setIsFormVisible={setIsVisibleFormChange}>
                <Form className={'text-center'} onSubmit={ChangeTask}>
                    <label className={'mb-2'}>Дата сдачи задачи</label>
                    <Form.Control
                        value={changeTask.dateEndWork}
                        onChange={(e) => {setChangeTask({...changeTask,dateEndWork: e.target.value});console.log(e.target.value,changeTask.dateEndWork)}}
                        placeholder="Поле для выбора даты"
                        type="date"
                        min={minDate}
                        max={maxDate}
                    />
                    <InputText className={'mt-3'} placeholder={'Название задачи'} value={changeTask.newNameTask} onChange={(e) => setChangeTask({...changeTask,newNameTask: e.target.value})}/>
                    <InputText as="textarea" rows={4} className={'mt-3'} placeholder={'Описание задачи'} value={changeTask.description} onChange={(e) => setChangeTask({...changeTask,description: e.target.value})}/>
                    <BaseSelect className={'mt-3'} variantMenu='primary' variantToggle='primary' defaultValue={getTextByStatusTask(changeTask.statusTask)} selectedValue={changeTask.statusTask} options={optionsStatusTask} onChangeValue={(status) => setChangeTask({...changeTask,statusTask: status})}/>
                    <button  className={'btn btn-outline-primary mt-4 w-100'}>Изменить</button>
                </Form>
            </FormTaskGroup>
        </div>
    );
};

export default MainPage;
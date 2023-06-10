import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import {addGroup, changeGroup, deleteGroup, getODataGetMyGroups} from "../API/GroupService";
import InputText from "../Components/UI/Inputs/Inputs/InputText";
import ModalWindow from "../Components/UI/ModalWindow/ModalWindow";
import FormChangeGroup from "../Components/UI/Inputs/Forms/FormChangeGroup/FormChangeGroup";
import {UpdateGroup} from "../utils/Group";
import 'bootstrap/dist/css/bootstrap.min.css'
const MyGroups = () => {
    const [groups,setGroups] = useState([
    ])
    const [newGroup,setGroup] = useState({ name: '' })
    const [changeGroupId,setChangeGroupId] = useState({ Id: '' })
    const [isLoading,setIsLoading] = useState(true)
    const [visibleForm,setVisibleForm] = useState(false)
    const [groupNameChange,setGroupNameChange] = useState('')

    useEffect(() => {
        getODataGetMyGroups().then((response)=>{
            if (response.data) {
                setGroups(response.data)
            }
        }).finally(() => {setIsLoading(false)})
    },[])

    if(isLoading)
        return <Spinner animation={"grow"}></Spinner>

    const handleAddGroup = async (event) => {
        event.preventDefault();
        if (newGroup.name) {
            const response = await addGroup(newGroup.name);
            console.log(response.data)
            setGroup({name:''});
            if(response.message !== null){
                alert(response.message)
                return;
            }
            setGroups((prevGroups) => [...prevGroups, response.data]);
        }
        else {
            alert('Введите название группы')
        }
    };

    const handleChangeGroup = async (event,name) => {
        event.preventDefault();
        console.log(name)
        if (name) {
            const response = await changeGroup(name,changeGroupId.Id);
            if(response.message !== null){
                alert(response.message)
                return;
            }
            UpdateGroup(setGroups,changeGroupId.Id,name)
            setVisibleForm(false)
        }
        setGroupNameChange('')
    };

    const clickDeleteGroup = async (groupId) => {
        const response = await deleteGroup(groupId);
        if (response.message === null) {
            setGroups((prevGroups) => prevGroups.filter((group) => group.groupId !== groupId));
        } else {
            alert(response.message);
        }
    };

    const clearChangeGroup = (closeForm) => {
        setGroupNameChange('')
        setVisibleForm(closeForm)
    }

    return (
        <div className={'container p-0'}>
            <ModalWindow
                visible={visibleForm}
                setVisible={clearChangeGroup}
            >
                <FormChangeGroup groupName={groupNameChange} setGroupName={setGroupNameChange} changeGroup={handleChangeGroup}></FormChangeGroup>
            </ModalWindow>
            <div className="container mt-5">
                <form>
                    <div className="form-group">
                        <label className={'mb-3 ms-1 w-auto'}>Название группы</label>
                        <div className={'row m-0'}>
                            <InputText
                                className="form-control w-50"
                                value={newGroup.name}
                                onChange={(event) => setGroup({ ...newGroup, name: event.target.value })}
                                placeholder="Введите название группы"/>
                            <button onClick={handleAddGroup} className="btn btn-outline-success ms-5 w-25">Добавить</button>
                        </div>
                    </div>

                </form>

                <table className="table mt-5">
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col"></th>
                        <td scope="col"></td>
                    </tr>
                    {groups.map((group)=>
                    <tr key={group.groupId}>
                        <td scope="col">{group.name}</td>
                        <td scope="col">
                            <button className="btn btn-outline-primary col-10" onClick={() => {setVisibleForm(true); setChangeGroupId({Id:group.groupId})}}>Изменить</button>
                        </td>
                        <td scope="col">
                            <button onClick={() => clickDeleteGroup(group.groupId)} type="submit" className="btn btn-outline-danger col-10">Удалить</button>
                        </td>
                    </tr>
                    )}
                    </thead>
                    <tbody id="groupTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyGroups;
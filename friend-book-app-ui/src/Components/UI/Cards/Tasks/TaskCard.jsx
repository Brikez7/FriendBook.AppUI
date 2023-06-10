import {Card, ListGroup} from "react-bootstrap";
import {getTextByStatusTask, SplitUsers} from "../../../../utils/Task";
import TaskButtons from "./TaskButtons";
import TaskDeleteButton from "./TaskDeleteButton";

const TaskCard = ({ task, isAdmin, existsUserInTask, handleSubscribeTask, handleUnsubscribeTask, handleDeleteTask, setIsVisibleFormChange, LoadTaskInFormChange }) => {
    return (
        <div className="col-xxl-3 col-lg-4 col-md-6">
            <Card className={'mb-5 shadow'}>
                <Card.Body>
                    <Card.Title className={'text-center'}>{task.name}</Card.Title>
                    <Card.Text className={'mt-5'}>
                        Описание: {task.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Статус: {getTextByStatusTask(task.statusTask)}</ListGroup.Item>
                    <ListGroup.Item>
                        Дата начала: {task.taskStart}<br/>
                        Дата конца: {task.taskEnd}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Участники: {SplitUsers(task.usersNames)}
                    </ListGroup.Item>
                </ListGroup>
                <Card.Body className={'text-center'}>
                    <TaskButtons
                        isAdmin={isAdmin}
                        existsUserInTask={existsUserInTask}
                        setIsVisibleFormChange={setIsVisibleFormChange}
                        LoadTaskInFormChange={LoadTaskInFormChange}
                        handleSubscribeTask={handleSubscribeTask}
                        handleUnsubscribeTask={handleUnsubscribeTask}
                        task={task}
                    />
                </Card.Body>
                {isAdmin && task.statusTask > 0 &&
                    <Card.Footer className={'text-center'}>
                        <TaskDeleteButton handleDeleteTask={handleDeleteTask} task={task} />
                    </Card.Footer>}
            </Card>
        </div>
    );
}

export default TaskCard;
import React from 'react';

const TaskButtons = ({ isAdmin, existsUserInTask, setIsVisibleFormChange, LoadTaskInFormChange, handleSubscribeTask, handleUnsubscribeTask, task }) => {
    return (
        <>
            {isAdmin && (
                <>
                    <button
                        className={`btn btn-outline-primary mt-2 ${!existsUserInTask(task) && 'me-2'}`}
                        onClick={() => {
                            setIsVisibleFormChange(true);
                            LoadTaskInFormChange(task.name, task.description, task.taskEnd, task.statusTask);
                        }}
                    >
                        Изменить
                    </button>
                </>
            )}
            {!existsUserInTask(task) ? (
                <button
                    className={'btn btn-outline-success mt-2 ms-2'}
                    onClick={async (e) => {
                        await handleSubscribeTask(e, task);
                    }}
                >
                    Подписаться
                </button>
            ) : (
                <button
                    className={'btn btn-outline-secondary mt-2 ms-2'}
                    onClick={async (e) => {
                        await handleUnsubscribeTask(e, task);
                    }}
                >
                    Отписаться
                </button>
            )}
        </>
    );
};

export default TaskButtons;
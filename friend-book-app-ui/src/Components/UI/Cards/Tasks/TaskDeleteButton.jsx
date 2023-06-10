import React from 'react';
const DeleteButton = ({ handleDeleteTask, task }) => {
    return (

        <button
            onClick={async (e) => {
                await handleDeleteTask(e, task);
            }}
            className={'btn btn-outline-danger w-75'}
        >
            Удалить
        </button>
    );
};

export default DeleteButton;

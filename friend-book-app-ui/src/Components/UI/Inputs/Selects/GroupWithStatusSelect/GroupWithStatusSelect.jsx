import React from 'react';
import {Dropdown} from "react-bootstrap";

const GroupWithStatusSelect = ({options,
                                defaultValue,
                                value,
                                onChangeValue,
                                styleButton,
                                variantMenu = "dark",
                                variantToggle="secondary",
                                ...props}) => {
    return (
        <Dropdown {...props}>
            <Dropdown.Toggle className={'container'} variant={variantToggle}>
                {value ? options.find(option => option.value === value)?.name : defaultValue}
            </Dropdown.Toggle>

            <Dropdown.Menu variant={variantMenu}>
                {
                    options.map(option =>
                        <Dropdown.Item
                            value={option.value}
                            key={option.value}
                            onClick={() => {onChangeValue(option.value,option.isAdmin)}}>
                            {option.name}
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default GroupWithStatusSelect;
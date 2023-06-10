import React from 'react';
import {Dropdown} from "react-bootstrap";

const BaseSelect = ({options,
                     defaultValue,
                     selectedValue,
                     onChangeValue,
                     styleButton,
                     dropdownToggleClass ='container',
                     variantMenu = "dark",
                     variantToggle="secondary",
                     ...props}) => {
    return (
        <Dropdown {...props}>
            <Dropdown.Toggle className={dropdownToggleClass} variant={variantToggle}>
                {selectedValue ? options.find(option => option.value === selectedValue)?.name : defaultValue}
            </Dropdown.Toggle>

            <Dropdown.Menu variant={variantMenu}>
                {
                    options.map(option =>
                        <Dropdown.Item
                            value={option.value}
                            key={option.value}
                            onClick={() => {onChangeValue(option.value)}}>
                            {option.name}
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default BaseSelect;
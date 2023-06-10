import React, {useState} from 'react';
import InputText from "../Inputs/Inputs/InputText";

const FilterByQueryAndType = ({handleSearch,
                               classButton,
                               classInput,
                               labelTitle = 'Введите логин',
                               placeholderInput = 'Введите логин',
                               labelClass='mb-3 ms-0 w-auto',
                               ...props}) => {

    const [searchedQuery,setSearchedQuery] = useState('')

    const handleClick = () => {
        handleSearch(searchedQuery);
    };

    return (
        <div {...props}>
            <label className={labelClass}>{labelTitle}</label>
            <div className={'row'}>
                <InputText
                    className={classInput}
                    placeholder={placeholderInput}
                    value={searchedQuery}
                    onChange={event => setSearchedQuery(event.target.value)}/>
                {props.children }
                <button className={classButton} onClick={handleClick}>Поиск</button>
            </div>
        </div>
    );
};

export default FilterByQueryAndType;
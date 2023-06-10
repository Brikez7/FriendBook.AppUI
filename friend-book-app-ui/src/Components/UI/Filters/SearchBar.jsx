import React, {useState} from 'react';
import BaseSelect from "../Inputs/Selects/BaseSelect/BaseSelect";
import InputText from "../Inputs/Inputs/InputText";

const SearchBar = ({options,defaultValue,onChangeSearchedQuery}) => {
    const [searchedQuery,setSearchedQuery] = useState({
        type:'',
        text:''
    })
    const handleSortChangeValue = (sortText) => {
        setSearchedQuery({...searchedQuery,text: sortText})
        onChangeSearchedQuery(searchedQuery.type,sortText);
    };
    const handleSortChangeType = (sortType) => {
        setSearchedQuery({...searchedQuery,type: sortType})
        onChangeSearchedQuery(sortType,'');
    };
    return (
        <div>
            <InputText
                value={searchedQuery.text}
                type="text"
                plaseholder="enter to name"
                onChange= {event => handleSortChangeValue(event.target.value)}
            />
            <BaseSelect
                value={searchedQuery.value}
                options={options}
                defaultValue={defaultValue}
                onChangeValue={ handleSortChangeType}>
            </BaseSelect>
        </div>
    );
};

export default SearchBar;
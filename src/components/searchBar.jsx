import React from 'react'
import Input from './input';

const SearchBar = ({ value, onChange }) => {
    return (
        <Input
        type='text'
        name='search'
        className='form-control my-3'
        placeholder = 'Search for a company'
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        />
    );
};
 
export default SearchBar;
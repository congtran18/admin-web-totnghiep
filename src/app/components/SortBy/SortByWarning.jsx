/* eslint-disable object-curly-newline */
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const items = [
    {realname: "Cũ nhất", _id: "old"}
]

const SortByWarning = ({ label, onChange, sort }) => {
    const location = useLocation();
    const params = queryString.parse(location.search) || '';
    const selectValue = params[sort] || '';

    const handleChange = (event) => {
        if (!onChange) return;

        const newValue = event.target.value;

        onChange(newValue);
    };

    return (
        <FormControl size="small" sx={{ minWidth: '10rem', mr: '2rem' }}>
            <InputLabel>{label}</InputLabel>
            <Select value={selectValue} onChange={handleChange}>
                <MenuItem value="">Mới nhất</MenuItem>

                {items.map((x) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <MenuItem key={x._id} value={x._id}>
                        {x.realname}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

SortByWarning.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    sort: PropTypes.string,
};

export default SortByWarning;

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
import { styled } from '@mui/system'

const CustomFormControl = styled(FormControl)(() => ({
  minWidth: '10rem',
  marginRight: '2rem',
}))

const FilterByType = ({ items, label, onChange, type }) => {
  const location = useLocation();
  const params = queryString.parse(location.search) || '';
  const selectValue = params[type] || '';

  const handleChange = (event) => {
    if (!onChange) return;

    const newValue = event.target.value;

    onChange(newValue);
  };

  return (
    <CustomFormControl size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={selectValue} onChange={handleChange}>
        <MenuItem value="">All</MenuItem>

        {items.map((x) => (
          // eslint-disable-next-line no-underscore-dangle
          <MenuItem key={x._id} value={x._id}>
            {x.realname}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
}

FilterByType.propTypes = {
  items: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default FilterByType;

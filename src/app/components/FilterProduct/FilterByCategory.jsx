/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
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
  marginRight: '2rem'
}))

const FilterByCategory = ({ mainItems, label, onChange, category }) => {
  const location = useLocation();

  const params = queryString.parse(location.search) || '';
  const { type } = params;

  const typeIndex = mainItems.findIndex((x) => x._id === type);

  const subCategory = typeIndex > -1 ? mainItems[typeIndex].categoryProduct : [];
  const handleChange = (event) => {
    if (!onChange) return;

    onChange(event.target.value);
  };

  return (
    <CustomFormControl  size="small" disabled={!type}>
      <InputLabel>{label}</InputLabel>
      <Select value={params[category] || ''} onChange={handleChange}>
        <MenuItem value="">All</MenuItem>

        {subCategory.length > 0 &&
          subCategory.map((x) => (
            <MenuItem key={x.realname} value={x._id}>
              {x.realname}
            </MenuItem>
          ))}
      </Select>
    </CustomFormControl>
  );
}

FilterByCategory.propTypes = {
  mainItems: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  category: PropTypes.string,
};

export default FilterByCategory;

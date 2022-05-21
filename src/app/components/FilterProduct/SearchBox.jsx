import { Icon, TextField } from '@mui/material';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


export default function SearchBox({ onChange, label }) {
    const location = useLocation();
    const timestampRef = useRef(null);

    const params = queryString.parse(location.search);
    const { name } = params;

    const handleChange = (event) => {
        const value = event.target.value.trim();
        const currentTimestamp = timestampRef.current;

        if (!onChange) return;

        if (currentTimestamp) {
            clearTimeout(currentTimestamp);
        }

        timestampRef.current = setTimeout(() => {
            const { length } = value;
            if (length > 2) {
                onChange(value);
            }

            if (length === 0) {
                onChange('');
            }
        }, 300);
    };

    return (
        <>
            <TextField
                defaultValue={name}
                variant="outlined"
                size="small"
                style={{ width: '20rem' }}
                placeholder={`Tìm kiếm ${label}...`}
                onChange={handleChange}

                InputProps={{
                    startAdornment: (
                        <Icon sx={{ mr: 3, fontSize: "small" }}>
                            search
                        </Icon>
                    ),
                }}
            />

        </>
    );
}

SearchBox.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string
};

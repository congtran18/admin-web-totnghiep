/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterByCategory from './FilterByCategory';
import FilterByType from './FilterByType';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, resetAllType } from "app/features/types/typeSlice";
import { toast } from "react-toastify";

const FilterBy = ({ handleTypeSort, handleCategorySort }) => {
  const location = useLocation();
  // const [types, setTypes] = useState([]);

  const dispatch = useDispatch();

  const { types, isLoading, isError, message } = useSelector(
    (state) => state.type
  );

  useEffect(() => {
    (async () => {
      try {
        dispatch(getTypes())

        // return () => {
        //   dispatch(resetAllType());
        //   console.log("resetAllType")
        // };
      } catch (error) {
        toast.error("Kiểm tra lại danh sách types");
      }
    })();
  }, [location.search, isError, message, dispatch]);

  return (
    <>
      <FilterByType
        items={types}
        label="Loại"
        onChange={handleTypeSort}
        type="type"
      />
      <FilterByCategory
        mainItems={types}
        label="Danh mục"
        onChange={handleCategorySort}
        category="category"
      />
    </>
  );
}

FilterBy.propTypes = {
  handleTypeSort: PropTypes.func,
  handleCategorySort: PropTypes.func,
};

export default FilterBy;

import React from 'react';
import { useState } from 'react';

const useList = ({ initialState = [] } = {}) => {
  const [list, setList] = useState(() => initialState);

  const add = (newList) => {
    return setList([...list, newList]);
  };

  const remove = (index) => {
    const newList = list.filter((_, i) => index !== i);
    setList(newList);
  };

  return {
    list,
    add,
    remove,
  };
};
export default useList;

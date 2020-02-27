import React, { useEffect, useState } from 'react';
import handleFetch from 'utils/handleFetch';
import StaticDropdownFilter from './StaticDropdownFilter';

const DynamicDropdownFilter = ({
  url,
  name,
  onChange,
  initialValue,
  isSearchable
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    handleFetch(url).then(response => setItems(response.items));
  }, [url]);

  return (
    <StaticDropdownFilter
      items={items}
      name={name}
      initialValue={initialValue}
      onChange={onChange}
      isSearchable={isSearchable}
    />
  );
};

export default DynamicDropdownFilter;

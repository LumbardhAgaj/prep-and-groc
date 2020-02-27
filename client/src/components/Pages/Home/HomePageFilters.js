import React from 'react';
import ObjectID from 'bson-objectid';
import { Row, Col } from 'react-bootstrap';
import StaticDropdownFilter from 'components/DropdownFilters/StaticDropdownFilter';
import DynamicDropdownFilter from 'components/DropdownFilters/DynamicDropdownFilter';
import { updateUrlQueryParameter } from 'actions/page';
import { INGREDIENTS_ROUTE } from 'constants/applicationRoutes';
import SORT_ITEMS from 'data/sortOptionValues.json';
import COUNTRIES from 'data/recipeCountryOptionValues.json';
import CATEGORIES from 'data/recipeCategoryOptionValues.json';
import { getUrlParameters } from 'utils/browserHistory';

const staticFilters = [
  { name: 'Sort', items: SORT_ITEMS, key: ObjectID().toHexString() },
  { name: 'Category', items: CATEGORIES, key: ObjectID().toHexString() },
  { name: 'Country', items: COUNTRIES, key: ObjectID().toHexString() }
];

const SELECT_USER_ACTION = 'select-option';

const getInitialValue = filterName => {
  const initialValues = getUrlParameters();
  const initialValue = initialValues[filterName.toLowerCase()];
  return {
    value: initialValue,
    label: initialValue,
    id: `${initialValue}-label`
  };
};

const HomePageFilters = () => {
  const onFilterChange = (option, event, name) => {
    if (event.action === SELECT_USER_ACTION) {
      updateUrlQueryParameter(name.toLowerCase(), option.value);
    } else {
      updateUrlQueryParameter(name.toLowerCase());
    }
  };

  return (
    <Row style={{ marginRight: '0', marginLeft: '0' }}>
      {staticFilters.map(staticFilter => (
        <Col md={3} sm={6} xs={12} key={staticFilter.key}>
          <StaticDropdownFilter
            name={staticFilter.name}
            onChange={(option, value) =>
              onFilterChange(option, value, staticFilter.name)
            }
            items={staticFilter.items}
            initialValue={getInitialValue(staticFilter.name)}
          />
        </Col>
      ))}
      <Col md={3} sm={6} xs={12}>
        <DynamicDropdownFilter
          name="Ingredient"
          onChange={(option, value) =>
            onFilterChange(option, value, 'Ingredient')
          }
          url={INGREDIENTS_ROUTE}
          isSearchable
          initialValue={getInitialValue('Ingredient')}
        />
      </Col>
    </Row>
  );
};

export default HomePageFilters;

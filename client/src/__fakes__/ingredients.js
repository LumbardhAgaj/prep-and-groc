const ingredients = [
  { label: 'Cucumber', value: 'Cucumber', id: 'cucumber' },
  { label: 'Garlic', value: 'Garlic', id: 'garlic' }
];

const ingredientsFetchResponseData = {
  totalItems: 2,
  itemsPerPage: 16,
  page: 1,
  items: ingredients,
  totalPages: 1
};

const ingredientsFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve(ingredientsFetchResponseData),
    status: 200
  });

export { ingredients, ingredientsFetchResponse };

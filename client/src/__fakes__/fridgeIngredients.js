const fridgeIngredient = {
  name: 'Salmon',
  amount: '0.5',
  unit: 'kg',
  meta: 'smoked'
};

const fridgeIngredients = [
  {
    unit: 'gr',
    amount: 453.592,
    name: 'Chicken',
    _id: '5cf93be5172b774548ae2d76',
    originalUnit: 'lb',
    originalAmount: 1,
    remainingAmount: 453.592
  },
  {
    unit: 'gr',
    amount: 1000,
    name: 'Tomatoes',
    _id: '5cf93bf6172b774548ae2d78',
    originalUnit: 'kg',
    originalAmount: 1,
    remainingAmount: 1000
  },
  {
    unit: 'gr',
    amount: 453.592,
    name: 'Beef Fillet',
    _id: '5cf93c04172b774548ae2d7a',
    originalUnit: 'lb',
    originalAmount: 1,
    remainingAmount: 453.592
  }
];

const fridgeIngredientsFetchResponseData = {
  totalItems: 3,
  itemsPerPage: 16,
  page: 1,
  items: fridgeIngredients,
  totalPages: 1
};

const fridgeIngredientsFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve(fridgeIngredientsFetchResponseData),
    status: 200
  });

const saveFridgeIngredientFetchResponse = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ ...fridgeIngredient, _id: '5cf93be5172b774548ae2d90' }),
    status: 200
  });

export {
  fridgeIngredient,
  fridgeIngredients,
  fridgeIngredientsFetchResponse,
  saveFridgeIngredientFetchResponse
};

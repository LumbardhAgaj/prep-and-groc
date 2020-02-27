const groceryItems = [
  {
    isCompleted: true,
    _id: '5d1cdd30371494228c199f6e',
    name: 'Goose Fat',
    amount: 15,
    unit: 'ml'
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f6f',
    name: 'Beef Shin',
    amount: 600,
    unit: 'gr'
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f70',
    name: 'Bacon',
    amount: 100,
    unit: 'gr'
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f71',
    name: 'Challots',
    amount: 350,
    unit: 'gr'
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f72',
    name: 'Chestnut Mushroom',
    amount: 250,
    unit: 'gr'
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f73',
    name: 'Garlic Clove',
    amount: 2
  },
  {
    isCompleted: false,
    _id: '5d1cdd30371494228c199f74',
    name: 'Bouquet Garni',
    amount: 1
  }
];

const groceryItemsFetchResponseData = {
  totalItems: 7,
  itemsPerPage: 16,
  page: 1,
  items: groceryItems,
  totalPages: 1
};

const groceryItemsFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve(groceryItemsFetchResponseData),
    status: 200
  });

export { groceryItems, groceryItemsFetchResponse };

const Yup = require('yup');

const SaveGroceryItemsSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string()
      .matches(
        /^([A-Za-z]*(\s)?[A-Za-z])*$/,
        'ingredient name must contain letters only'
      )
      .required('name is required'),
    amount: Yup.number()
      .typeError('amount must be a number')
      .positive('amount must be positive')
      .required('amount is required'),
    unit: Yup.string().required('unit is required')
  })
);

module.exports = SaveGroceryItemsSchema;

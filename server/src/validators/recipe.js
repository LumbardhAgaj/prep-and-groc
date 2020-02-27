const Yup = require('yup');
const SaveFridgeIngredientSchema = require('./fridge');

const SaveRecipeShape = {
  title: Yup.string()
    .required('title is required')
    .max(30),
  category: Yup.string().required('category is required'),
  area: Yup.string().required('origin is required'),
  instructions: Yup.string().required('instructions are required'),
  imageUrl: Yup.string()
    .required('image URL is required')
    .matches(
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
      'recipe image must be a valid URL format'
    )
};

const SaveRecipeSchema = Yup.object().shape({
  ...SaveRecipeShape
});

const SaveRecipeSchemaWithIngredients = Yup.object().shape({
  ...SaveRecipeShape,
  ingredients: Yup.array().of(SaveFridgeIngredientSchema)
});

module.exports = { SaveRecipeSchema, SaveRecipeSchemaWithIngredients };

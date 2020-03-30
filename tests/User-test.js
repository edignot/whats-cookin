const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry');

describe('User', () => {

  let user, recipe1, recipe2, recipe3, pantry;
  beforeEach('user instance', () => {
    user = new User();
    recipe1 = new Recipe(799732,
      "google",
      [{
          "id": 10011250,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 11143,
          "quantity": {
            "amount": 2,
            "unit": "rib"
          }
        }
      ],
      [{
        "instruction": "Serve over lettuce.",
        "number": 1
      }],
      "Curried Strawberry Chicken Salad",
      [
        "salad"
      ]);
    recipe2 = new Recipe(621213,
      "google",
      [{
          "id": 10011250,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 11143,
          "quantity": {
            "amount": 2,
            "unit": "rib"
          }
        }
      ],
      [{
        "instruction": "Serve over lettuce.",
        "number": 1
      }],
      "Chicken Salad",
      [
        "salad"
      ]);
    recipe3 = new Recipe(611858,
      "google",
      [{
          "id": 16098,
          "quantity": {
            "amount": 4,
            "unit": ""
          }
        },
        {
          "id": 18069,
          "quantity": {
            "amount": 2,
            "unit": "slice"
          }
        }
      ],
      [{
        "instruction": "Put ingredients together.",
        "number": 1
      }],
      "Peanut Butter Sandwich",
      [
        "side dish"
      ]);
    pantry = new Pantry();
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to modify favoriteRecipes', () => {
    user.modifyRecipes(recipe1, 'favoriteRecipes');
    user.modifyRecipes(recipe2, 'favoriteRecipes');
    user.modifyRecipes(recipe3, 'favoriteRecipes');
    expect(user.favoriteRecipes).to.deep.equal([recipe1, recipe2, recipe3])
  });

  it('check if recipe is in favoriteRecipes array', () => {
    user.modifyRecipes(recipe1, 'favoriteRecipes');
    user.modifyRecipes(recipe1, 'favoriteRecipes')
    expect(user.favoriteRecipes.length).to.equal(0);
  });

  it('should be able to modify recipesToCook', () => {
    user.modifyRecipes(recipe1, 'recipesToCook');
    expect(user.recipesToCook.length).to.equal(1);
  });

  it('check if recipe is in recipesToCook array', () => {
    user.modifyRecipes(recipe1, 'recipesToCook');
    user.modifyRecipes(recipe1, 'recipesToCook')
    expect(user.recipesToCook.length).to.equal(0);
  });

  it('should display recipes from the selected saved list that match a selected category tag', () => {
    user.modifyRecipes(recipe1, 'favoriteRecipes');
    user.modifyRecipes(recipe2, 'favoriteRecipes');
    user.modifyRecipes(recipe3, 'favoriteRecipes');
    expect(user.filterRecipes('favoriteRecipes', 'salad')).to.deep.equal([recipe1, recipe2]);
    expect(user.filterRecipes('recipesToCook', 'salad')).to.deep.equal([]);
  });

  it('should display any recipe from the user/`s saved lists that match a recipe name input into the search bar', () => {
    user.modifyRecipes(recipe1, 'favoriteRecipes');
    user.modifyRecipes(recipe2, 'recipesToCook');
    user.modifyRecipes(recipe3, 'favoriteRecipes');
    expect(user.searchRecipes('SaLaD')).to.deep.equal([recipe1, recipe2]);
  });

  it('should display any recipe from the user/`s saved lists that match an ingredient input into the search bar', () => {
    user.modifyRecipes(recipe1, 'favoriteRecipes');
    user.modifyRecipes(recipe2, 'recipesToCook');
    user.modifyRecipes(recipe3, 'favoriteRecipes');
    expect(user.searchRecipes('LeTTuce')).to.deep.equal([recipe1, recipe2]);
  });
})
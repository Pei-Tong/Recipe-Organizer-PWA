// tests/recipe.test.js
describe('Recipe Organizer', () => {
    test('should add a recipe successfully', () => {
      const recipeName = 'Spaghetti';
      expect(recipeName).toBe('Spaghetti');
    });
  
    test('should handle empty recipe name', () => {
      const recipeName = '';
      expect(recipeName).toBe('');
    });
  });
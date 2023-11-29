// Importerer User modellen og authenticateUser funktionen
const User = require('../models/user'); // Importerer User-modellen fra din 'models/user' fil.
const authenticateUser = require('../auth/authenticateUser'); // Importerer authenticateUser funktionen fra den angivne sti.

// Mock User modellen
jest.mock('../models/user', () => {
  return {
    findOne: jest.fn(),
  };
});

// Test for vellykket brugergodkendelse
test('Dette bør godkende en bruger', async () => {
  // Opsætter en mock respons for User.findOne
  User.findOne.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashedPassword' });

  // Kalder authenticateUser og forventer, at den returnerer en ikke-null bruger
  const user = await authenticateUser('testuser', 'password');

  expect(user).not.toBeNull(); // Forventer at den returnerede bruger ikke er null, hvilket indikerer en vellykket godkendelse.
});

// Test for fejl ved brugergodkendelse
test('Dette bør håndtere fejl ved brugergodkendelse', async () => {
  // Opsætter en mock fejl for User.findOne
  User.findOne.mockRejectedValue(new Error('Godkendelsesfejl'));

  // Forventer at authenticateUser kaster en fejl
  await expect(authenticateUser('testuser', 'password')).rejects.toThrow('Godkendelsesfejl');
  // Tester om authenticateUser korrekt kaster en fejl, som defineret i mock-fejlen.
});

// Importerer de nødvendige moduler
const searchPlate = require('../services/searchPlate'); // Importerer din egen 'searchPlate' funktion.
const axios = require('axios'); // Importerer 'axios' biblioteket, som bruges til HTTP-anmodninger.

// Mock axios modulet for at undgå faktiske HTTP-anmodninger
jest.mock('axios'); // Instruerer Jest til at erstatte 'axios' med en mock-version for at undgå rigtige netværksanmodninger under test.

// Test for vellykket respons
test('Det bør returnere data for en given nummerplade', async () => {
  // Opsætter en mock respons
  const mockResponse = { data: { horsepower: 150, mileage: 20000, fuel: 'Petrol', weight: 1200 } };
  // Definerer en mock respons, der skal returneres, når 'axios.get' kaldes.

  axios.get.mockResolvedValue(mockResponse); // Fortæller Jest at simulere en vellykket respons fra 'axios.get' med 'mockResponse'.

  // Kalder searchPlate funktionen og forventer, at den returnerer mock data
  const data = await searchPlate('ABC123'); // Kalder 'searchPlate' med en test nummerplade og gemmer resultatet i 'data'.

  expect(data).toEqual(mockResponse.data); // Forventer at 'data' er lig med dataen i 'mockResponse'.
});

// Test for fejlhåndtering
test('Det bør håndtere fejl ved anmodning', async () => {
  // Opsætter en mock fejl
  axios.get.mockRejectedValue(new Error('Anmodningsfejl')); // Fortæller Jest at simulere en fejl, når 'axios.get' kaldes.

  // Forventer at searchPlate kaster en fejl
  await expect(searchPlate('ABC123')).rejects.toThrow('Anmodningsfejl'); // Tester om 'searchPlate' korrekt kaster en fejl, når 'axios.get' fejler.
});

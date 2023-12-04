const searchBrand = require('../services/searchBrand'); // Opdateret til korrekt filnavn

// Mock database objekt
const mockDatabase = {
    findCarsByBrand: jest.fn()
};

// Test for vellykket søgning
test('Det bør returnere data for et givet bilmærke', async () => {
    const mockCars = [{ brand: 'Toyota', model: 'Corolla' }, { brand: 'Toyota', model: 'Camry' }];
    mockDatabase.findCarsByBrand.mockResolvedValue(mockCars);

    const cars = await searchBrand('Toyota', mockDatabase); // Opdateret til korrekt funktionsnavn
    expect(cars).toEqual(mockCars);
    expect(mockDatabase.findCarsByBrand).toHaveBeenCalledWith('Toyota');
});

// Test for fejlhåndtering
test('Det bør håndtere fejl ved søgning', async () => {
    mockDatabase.findCarsByBrand.mockRejectedValue(new Error('Ingen biler fundet'));

    await expect(searchBrand('Toyota', mockDatabase)).rejects.toThrow('Ingen biler fundet'); // Opdateret til korrekt funktionsnavn
});

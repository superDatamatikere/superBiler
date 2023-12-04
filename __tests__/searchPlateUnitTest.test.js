const searchPlate = require('../services/searchPlate');

// Mock database objekt
const mockDatabase = {
    findCarByLicensePlate: jest.fn()
};

// Test for vellykket søgning
test('Det bør returnere data for en given nummerplade', async () => {
    const mockCar = { licensePlate: 'ABC123', brand: 'Toyota', model: 'Corolla', fuel: 'Petrol', horsepower: 150, mileage: 20000, weight: 1200 };
    mockDatabase.findCarByLicensePlate.mockResolvedValue(mockCar);

    const data = await searchPlate('ABC123', mockDatabase);
    expect(data).toEqual(mockCar);
    expect(mockDatabase.findCarByLicensePlate).toHaveBeenCalledWith('ABC123');
});

// Test for fejlhåndtering
test('Det bør håndtere fejl ved anmodning', async () => {
    mockDatabase.findCarByLicensePlate.mockRejectedValue(new Error('Ingen bil fundet'));

    await expect(searchPlate('ABC123', mockDatabase)).rejects.toThrow('Ingen bil fundet');
});

async function searchPlate(licensePlate, database) {
    const car = await database.findCarByLicensePlate(licensePlate);
    return car;
}

module.exports = searchPlate;

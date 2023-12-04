async function searchBrand(brand, database) {
    const cars = await database.findCarsByBrand(brand);
    return cars;
}

module.exports = searchBrand;

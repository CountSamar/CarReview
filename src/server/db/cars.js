const db = require('./client');  
const createCar = async({ model, brand, year, imagePath }) => {
    try {
        const { rows: [car] } = await db.query(`
            INSERT INTO cars(model, brand, year, image_path)
            VALUES($1, $2, $3, $4)
            RETURNING *`, [model, brand, year, imagePath]);

        return car;
    } catch (err) {
        throw err;
    }
}


const getAllCars = async() => {
    try {
        const { rows } = await db.query(`
            SELECT * 
            FROM cars`);

        return rows;
    } catch (err) {
        throw err;
    }
}

const getCarById = async(id) => {
    try {
        const { rows: [ car ] } = await db.query(`
            SELECT * 
            FROM cars
            WHERE id=$1;`, [ id ]);

        if(!car) {
            return;
        }
        return car;
    } catch (err) {
        throw err;
    }
}

const updateCar = async(id, { model, brand, year }) => {
    try {
        const { rows: [car] } = await db.query(`
            UPDATE cars
            SET model = $2, brand = $3, year = $4
            WHERE id = $1
            RETURNING *`, [id, model, brand, year]);

        return car;
    } catch (err) {
        throw err;
    }
}

const deleteCar = async(id) => {
    try {
        await db.query(`
            DELETE FROM cars
            WHERE id=$1;`, [ id ]);
    } catch (err) {
        throw err;
    }
}
module.exports = {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
};


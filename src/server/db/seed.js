const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
    username: "emilyjohn",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
    username: "liwei",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
    username: "isabellagar",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
    username: "floatlikeabee",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
    username: "jsmith",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "janepassword",
    username: "jdoe",
  },
  {
    name: "Robert Brown",
    email: "robert@example.com",
    password: "robertpass",
    username: "rbrown",
  },
  {
    name: "Linda White",
    email: "linda@example.com",
    password: "lindapassword",
    username: "lwhite",
  },
  {
    name: "Michael Green",
    email: "michael@example.com",
    password: "michaelpass",
    username: "mgreen",
  },
  {
    name: "Jennifer Blue",
    email: "jennifer@example.com",
    password: "jenniferpass",
    username: "jblue",
  },
  {
    name: "Carlos Mendoza",
    email: "carlos@example.com",
    password: "carlospass",
    username: "carlosmend",
  },
  {
    name: "Sophia Turner",
    email: "sophia@example.com",
    password: "sophiasecret",
    username: "sophturn",
  },
  {
    name: "Raj Kapoor",
    email: "raj@example.com",
    password: "rajpassword",
    username: "rajkap",
  },
  {
    name: "Emma Watson",
    email: "emma@example.com",
    password: "emmasecure",
    username: "emmawat",
  },
  {
    name: "Lucas Perez",
    email: "lucas@example.com",
    password: "lucaspw",
    username: "lucasp",
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    password: "oliviapw",
    username: "oliviam",
  },
  {
    name: "Benjamin Clark",
    email: "benjamin@example.com",
    password: "benjaminpass",
    username: "benclark",
  },
  {
    name: "Ella Fitzgerald",
    email: "ella@example.com",
    password: "ellapassword",
    username: "ellafitz",
  },
  {
    name: "Mason Turner",
    email: "mason@example.com",
    password: "masonpass",
    username: "masont",
  },
  {
    name: "Ava Gardner",
    email: "ava@example.com",
    password: "avasecret",
    username: "avag",
  },
  {
    name: "Jacob White",
    email: "jacob@example.com",
    password: "jacobpw",
    username: "jacobw",
  },
  {
    name: "Mia Wallace",
    email: "mia@example.com",
    password: "miasecret",
    username: "miaw",
  },
  {
    name: "Alexander Hamilton",
    email: "alex@example.com",
    password: "alexpass",
    username: "alexham",
  },
  {
    name: "Amelia Pond",
    email: "amelia@example.com",
    password: "ameliapass",
    username: "ameliap",
  },
  {
    name: "Daniel Smith",
    email: "daniel@example.com",
    password: "danielpw",
    username: "daniels",
  },
  {
    name: "Grace Hart",
    email: "grace@example.com",
    password: "gracesecure",
    username: "graceh",
  },
  {
    name: "Samuel Adams",
    email: "samuel@example.com",
    password: "samuelpass",
    username: "samadams",
  },
  {
    name: "Chloe Stevens",
    email: "chloe@example.com",
    password: "chloesecret",
    username: "chloes",
  },
  {
    name: "Alex Johnson",
    email: "alexj@example.com",
    password: "ajsecret",
    username: "ajohn",
  },
];


const cars = [
  { model: "Model 3", brand: "Tesla", year: 2023, image_path:"uploads/1696817981885-tesla model 3.jpeg" },
  { model: "Mustang", brand: "Ford", year: 2023, image_path:"uploads/1696820948754-fordmustang.jpeg" },
  { model: "A4", brand: "Audi", year: 2023, image_path:"/uploads/audi.jpeg"},
  { model: "Camry", brand: "Toyota", year: 2023, image_path:"uploads/camry.jpeg"},
  { model: "E-Class", brand: "Mercedes-Benz", year: 2023,image_path:"uploads/benz.jpeg" },
  { model: "WRX", brand: "Subaru", year: 2023, image_path:"uploads/subaru.jpeg" },
  { model: "Taycan", brand: "Porsche", year: 2023, image_path:"uploads/porsche.jpeg" },
  { model: "Bolt EV", brand: "Chevrolet", year: 2023, image_path:"uploads/bolt.jpeg" },
];
const reviews = [
  {
    carModel: "Model 3",
    reviewer: "John Smith",
    rating: 4.5,
    comment:
      "The Tesla Model 3 is incredibly efficient and drives smoothly. Autopilot is game-changing!",
  },
  {
    carModel: "Mustang",
    reviewer: "Jane Doe",
    rating: 4.0,
    comment:
      "The new Mustang has a powerful engine roar and sleek design. Pure American muscle.",
  },
  {
    carModel: "Civic",
    reviewer: "Alex Johnson",
    rating: 4.7,
    comment:
      "Reliable as always. The 2023 Civic offers great fuel efficiency and ample space.",
  },
  {
    carModel: "3 Series",
    reviewer: "Linda White",
    rating: 4.8,
    comment:
      "BMW's 3 Series remains at the top of the luxury sedan market. Elegant and sporty.",
  },
  {
    carModel: "A4",
    reviewer: "Michael Green",
    rating: 4.6,
    comment:
      "Audi A4 offers a premium feel and strong performance. The Quattro system is impressive.",
  },
  {
    carModel: "Camry",
    reviewer: "Sophia Turner",
    rating: 4.4,
    comment:
      "Camry remains a solid choice for a family car. Spacious, efficient, and safe.",
  },
  {
    carModel: "E-Class",
    reviewer: "Emma Watson",
    rating: 5.0,
    comment:
      "Mercedes has outdone themselves with the E-Class. Pure luxury with advanced tech.",
  },
  {
    carModel: "WRX",
    reviewer: "Lucas Perez",
    rating: 4.2,
    comment:
      "Subaru WRX is a thrill to drive with its turbocharged engine. AWD makes it great for all terrains.",
  },
  {
    carModel: "Taycan",
    reviewer: "Olivia Martinez",
    rating: 4.9,
    comment:
      "Porsche's Taycan is the epitome of electric luxury. Fast, efficient, and a head-turner.",
  },
  {
    carModel: "Bolt EV",
    reviewer: "Benjamin Clark",
    rating: 4.3,
    comment:
      "Chevrolet's Bolt EV is an affordable electric option. Good range and comfy interior.",
  },
];

const tableExists = async (tableName) => {
  try {
    const result = await db.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1);`, [tableName]);
    return result.rows[0].exists;
  } catch (err) {
    throw err;
  }
};

const dataExistsInTable = async (tableName) => {
  try {
    const result = await db.query(`SELECT COUNT(*) FROM ${tableName}`);
    return parseInt(result.rows[0].count, 10) > 0;
  } catch (err) {
    return false;
  }
};

const createTablesIfNotExist = async () => {
  if (!await tableExists("users")) {
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100),
        username VARCHAR(100)
      );
    `);
  }

  if (!await tableExists("cars")) {
    await db.query(`
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        model VARCHAR(100) UNIQUE NOT NULL,
        brand VARCHAR(100),
        year INTEGER,
        image_path TEXT
      );
    `);
  }

  if (!await tableExists("reviews")) {
    await db.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        car_id INTEGER REFERENCES cars(id),
        rating DECIMAL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT
      );
    `);
  }
};

const insertUsers = async () => {
  const promises = users.map(user => {
    const { name, email, password, username } = user;
    return db.query("INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4)", [name, email, password, username]);
  });

  await Promise.all(promises);
};

const insertCars = async () => {
  const promises = cars.map(car => {
    const { model, brand, year, image_path } = car;
    return db.query("INSERT INTO cars (model, brand, year, image_path) VALUES ($1, $2, $3, $4)", [model, brand, year, image_path]);
  });

  await Promise.all(promises);
};

const insertReviews = async () => {
  const promises = reviews.map(async (review) => {
    const { carModel, reviewer, rating, comment } = review;
    const userResult = await db.query("SELECT id FROM users WHERE name = $1", [reviewer]);
    const carResult = await db.query("SELECT id FROM cars WHERE model = $1", [carModel]);

    if (userResult.rows.length === 0 || carResult.rows.length === 0) {
      console.error(`No match found for reviewer: ${reviewer} or carModel: ${carModel}`);
      return;
    }

    const userId = userResult.rows[0].id;
    const carId = carResult.rows[0].id;

    return db.query("INSERT INTO reviews (user_id, car_id, rating, comment) VALUES ($1, $2, $3, $4)", [userId, carId, rating, comment]);
  });

  await Promise.all(promises);
};

const seedDatabase = async () => {
  try {
    await db.connect();

    // Using a transaction to ensure data integrity.
    await db.query("BEGIN");

    await createTablesIfNotExist();
    if (!await dataExistsInTable("users")) await insertUsers();
    if (!await dataExistsInTable("cars")) await insertCars();
    if (!await dataExistsInTable("reviews")) await insertReviews();

    // Committing the transaction.
    await db.query("COMMIT");
    
    console.log("Finished seeding process.");
  } catch (err) {
    // In case of errors, rollback the transaction.
    await db.query("ROLLBACK");
    console.error("Error during seeding:", err);
  } finally {
    db.end();
  }
};

seedDatabase();
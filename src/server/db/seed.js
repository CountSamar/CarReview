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
  { model: "Model 3", brand: "Tesla", year: 2023 },
  { model: "Mustang", brand: "Ford", year: 2023 },
  { model: "Civic", brand: "Honda", year: 2023 },
  { model: "3 Series", brand: "BMW", year: 2023 },
  { model: "A4", brand: "Audi", year: 2023 },
  { model: "Camry", brand: "Toyota", year: 2023 },
  { model: "E-Class", brand: "Mercedes-Benz", year: 2023 },
  { model: "WRX", brand: "Subaru", year: 2023 },
  { model: "Taycan", brand: "Porsche", year: 2023 },
  { model: "Bolt EV", brand: "Chevrolet", year: 2023 },
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

const insertCar = async (car) => {
  try {
    const result = await db.query(
      "INSERT INTO cars(model, brand, year) VALUES($1, $2, $3) RETURNING id",
      [car.model, car.brand, car.year]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error("Error inserting car:", error);
    return null;
  }
};
const createReview = async (review) => {
  try {
    await db.query(
      "INSERT INTO reviews(car_id, user_id, rating, comment) VALUES($1, $2, $3, $4)",
      [review.car_id, review.user_id, review.rating, review.comment]
    );
  } catch (error) {
    console.error("Error inserting review:", error);
  }
};
const insertReviews = async () => {
  try {
    for (const review of reviews) {
      // Fetch carId
      const carResult = await db.query("SELECT id FROM cars WHERE model=$1", [review.carModel]);
      
      // Fetch userId
      const userResult = await db.query("SELECT id FROM users WHERE name=$1", [review.reviewer]);

      // Check if any of the queries didn't return a result
      if (!carResult.rows.length || !userResult.rows.length) {
        console.error(`No car found for model ${review.carModel} or no user found for name ${review.reviewer}`);
        continue; // Skip this loop iteration
      }

      // Get carId and userId
      const carId = carResult.rows[0].id;
      const userId = userResult.rows[0].id;

      await createReview({
        car_id: carId,
        user_id: userId,
        rating: review.rating,
        comment: review.comment,
      });
    }
  } catch (error) {
    console.error("Error inserting reviews:", error);
  }
};

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS reviews;`);
    await db.query(`DROP TABLE IF EXISTS cars;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`);
  } catch (err) {
    throw err;
  }
};
const createCarsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE cars(
        id SERIAL PRIMARY KEY,
        model VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        year INT NOT NULL
      )`);
  } catch (err) {
    throw err;
  }
};

const createReviewsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        car_id INTEGER REFERENCES cars(id),
        user_id INTEGER REFERENCES users(id),
        rating DECIMAL(3,2) NOT NULL,

        comment TEXT
      )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      const insertedUser = await createUser({
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
      });

      // Check the return value to log the outcome
      if (insertedUser) {
        console.log(
          `User ${insertedUser.name} added with ID ${insertedUser.id}`
        );
      } else {
        console.log(
          `User with email ${user.email} was not added (possibly due to a conflict).`
        );
      }
    }
    console.log("Finished inserting seed data.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};
const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await createCarsTable();
    await createReviewsTable();
    await insertUsers();

    // Insert cars using insertCar function
    for (const car of cars) {
      await insertCar(car);
    }

    await insertReviews(); // This will insert cars and their associated reviews
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};
seedDatabase().catch((err) => {
  console.error("Failed to seed database:", err);
});

const request = require('supertest');
const app = require('../app'); // Replace '../app' with the path to your Express app

describe('POST /', () => {
  it('should login successfully with valid credentials', async () => {
    const validUser = {
      email: 'testUser@gmail.com',
      psw: '0000' 
    };

    const response = await request(app)
      .post('/signIn') 
      .send(validUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Logged in successfully');
  });
});

/*
router.post('/', async function (req, res) {
  try {
      const { email, psw } = req.body; // endpoint

      const User = await user.findOne({ where: { email } });
      //const user = dummyUser.find(u => u.email === email);

      if (!User) {
          return res.status(401).send('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(psw, User.password);
      if (!isMatch) {
          return res.status(401).send('Invalid credentials');
      }

      // Create session or token here
      req.session.userId = User.id; // For session-based
      //req.session.userId = User.email; // For session-based
      res.status(200).send('Logged in successfully');
      //res.redirect('/signIn/success'); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});
*/

/*
// Importerer User modellen
const User = require('../models/user'); // Importerer User-modellen fra din 'models/user' fil.

// Mock User modellen
jest.mock('../models/user', () => {
  return {
    create: jest.fn(),
  };
});

// Test for vellykket brugeroprettelse
test('Dette bør oprette en ny bruger', async () => {
  // Opsætter en mock respons for User.create
  User.create.mockResolvedValue({ id: 1, username: 'testuser' });

  // Kalder User.create og forventer, at den returnerer en bruger med id 1
  const user = await User.create({ username: 'testuser', password: 'password' });

  expect(user.id).toBe(1); // Forventer at den returnerede brugers id er 1, som defineret i mock-responsen.
});

// Test for fejl ved brugeroprettelse
test('Dette bør håndtere fejl ved brugeroprettelse', async () => {
  // Opsætter en mock fejl for User.create
  User.create.mockRejectedValue(new Error('Oprettelsesfejl'));

  // Forventer at User.create kaster en fejl
  await expect(User.create({ username: 'testuser', password: 'password' })).rejects.toThrow('Oprettelsesfejl');
  // Tester om User.create korrekt kaster en fejl, som defineret i mock-fejlen.
});

*/
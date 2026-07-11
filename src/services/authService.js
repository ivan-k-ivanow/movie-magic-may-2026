import userRepository from '../repositories/userRepository.js'
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt';

export async function register(userData) {
    const hashPassword = await bcrpyt.hash(userData.password, 10);

    const result = await userRepository.create({
        ...userData,
        password: hashPassword,
    });

    return result;
};

export async function login(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error('No user found!');
    };

    // Validate password
    const isPasswordValid = await bcrpyt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password!');
    };

    // Issue token
    const payload = { userId: user.id, email: user.email };

    // TODO fix this secret
    const token = jwt.sign(payload, 'SECRETGOESHERE', { expiresIn: '1h'});

    return token;
};



const authService = {
    register,
    login,
};

export default authService;
import userRepository from '../repositories/userRepository.js'
import bcrpyt from 'bcrypt';
import { generateAuthToken } from '../utils/tokenUtils.js';

export async function register(userData) {
    const createdUser = await userRepository.create(userData);

    const token = generateAuthToken(createdUser);

    return token;
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

    const token = generateAuthToken(user);

    return token;

};

const authService = {
    register,
    login,
};

export default authService;
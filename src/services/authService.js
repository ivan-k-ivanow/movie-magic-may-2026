import userRepository from '../repositories/userRepository.js'
import bcrpyt from 'bcrypt';

export async function register(userData) {
    const hashPassword = await bcrpyt.hash(userData.password, 10);
    
    const result = await userRepository.create({
        ...userData,    
        password: hashPassword,
    });

    return result;
}

const authService = {
    register,
};

export default authService;
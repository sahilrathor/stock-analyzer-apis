import bcrypt from "bcrypt";

/**
 * Generates a hashed password from a given password and salt rounds.
 *
 * @param {string} password - The password to hash.
 * @param {number} [saltRounds=10] - The number of salt rounds to use.
 * @returns {string} A hashed password.
 */
export const generateHash = async (password: string, saltRounds: number = 10): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a given password with a given hash.
 *
 * @param {string} password - The password to compare.
 * @param {string} hash - The hash to compare the password with.
 * @returns {boolean} True if the password matches the hash, false otherwise.
 */
export const compareHash = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}
import bcrypt from "bcrypt";

/**
 * Generates a hashed password from a given password and salt rounds.
 *
 * @param {string} text - The text to hash.
 * @param {number} [saltRounds=10] - The number of salt rounds to use.
 * @returns {string} A hashed text.
 */
export const generateHash = async (text: string, saltRounds: number = 10): Promise<string> => {
    return await bcrypt.hash(text, saltRounds);
}

/**
 * Compares a given text with a given hash.
 *
 * @param {string} text - The text to compare.
 * @param {string} hashedText - The hash to compare the text with.
 * @returns {boolean} True if the text matches the hash, false otherwise.
 */
export const compareHash = async (text: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
}
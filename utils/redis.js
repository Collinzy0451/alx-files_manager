import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = createClient();

    // Promisify the get method for async usage
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  /**
   * Checks if connection to Redis is alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.isOpen;
  }

  /**
   * Gets value corresponding to key in Redis
   * @param {string} key Key to search for in Redis
   * @return {string} Value of the key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * Creates a new key in Redis with a specific TTL
   * @param {string} key Key to be saved in Redis
   * @param {string} value Value to be assigned to key
   * @param {number} duration TTL of key
   * @return {undefined} No return
   */
  async set(key, value, duration) {
    this.client.setEx(key, duration, value);
  }

  /**
   * Deletes a key in the Redis service
   * @param {string} key Key to be deleted
   * @return {undefined} No return
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;

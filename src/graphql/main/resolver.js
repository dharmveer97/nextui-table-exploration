import { v4 as uuidv4 } from 'uuid';
import { allUsers } from '../../utils/data';

export default {
  Query: {
    hello: async () => {
      try {
        console.log('Migration completed successfully.');
        return { success: true, message: 'Hello, welcome!' };
      } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, message: 'Migration failed.' };
      }
    },
    getDummyData: () =>
      allUsers.map((user) => ({
        ...user,
        id: uuidv4(), // Ensure each user gets a unique ID
      })),
  },
  Mutation: {
    updateDummyData: async (root, args) => {
      const { input } = args;

      if (!input) {
        throw new Error('Input is required');
      }

      const { id } = input;

      const index = allUsers.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error('User not found');
      }

      allUsers[index] = {
        ...allUsers[index],
        ...input,
      };

      return allUsers[index];
    },
  },
};

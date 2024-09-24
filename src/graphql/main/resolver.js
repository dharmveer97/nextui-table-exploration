import { v4 as uuidv4 } from 'uuid';
import { allUsers } from '../../utils/data';

export default {
  Query: {
    hello: async () => {
      try {
        console.log('Example completed successfully.');
        return { success: true, message: 'Hello, welcome!' };
      } catch (error) {
        console.error('Example failed:', error);
        return { success: false, message: 'Example failed.' };
      }
    },

    // for fetch all data
    getDummyData: () => {
      const data = Array.from({ length: 1000 }, (_, index) => ({
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        email: `user${index}@example.com`,
        fullName: `User ${index}`,
        status: 'active',
      }));

      return data;
    },
  },
  Mutation: {
    // for add new entry
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

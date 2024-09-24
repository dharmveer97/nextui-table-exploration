'use client';

import { gql, useQuery } from '@apollo/client';
import UserTable from '../components/UserTable';

const columns = [
  { name: `Created At  Date`, uid: 'createdAt' },
  { name: 'Email', uid: 'email' },
  { name: 'Full Name', uid: 'fullName' },
  { name: 'Status', uid: 'status' },
];

export const getUsersQuery = gql`
  query getUsersQuery {
    getDummyData {
      id
      email
      fullName
      id
      status
      createdAt
    }
  }
`;

export default function Home() {
  const { data, loading, refetch } = useQuery(getUsersQuery, {
    fetchPolicy: 'network-only',
  });

  const userData = data && data.getDummyData ? data.getDummyData : [];

  return (
    <div className="container mx-auto mt-6">
      <UserTable
        allUsers={userData}
        columns={columns}
        refetch={refetch}
        loading={loading}
      />
    </div>
  );
}

'use client';

import { gql, useQuery } from '@apollo/client';
import { Spinner } from '@nextui-org/react';
import UserTable from '../components/UserTable';
import EmptyState from '../components/EmptyState';

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

  console.log(loading, 'loading');
  return (
    <div className="container mx-auto mt-6">
      {loading && <Spinner />}
      {!loading && !data && (
        <EmptyState title="No data available at the moment. Please wait or try again later." />
      )}
      {!loading && data && (
        <UserTable
          allUsers={userData}
          columns={columns}
          refetch={refetch}
          loading={loading}
        />
      )}
    </div>
  );
}

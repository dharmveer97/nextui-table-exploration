'use client';

import React, { useState } from 'react';
import {
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import TableCellRenderer from './TableCellRenderer';
import Table from './Table';
import ModalBox from './ModalBox';

const TopContent = ({ onOpen, isOpen, onOpenChange, refetch }) => (
  <div className="flex flex-col gap-4">
    <div className="flex justify-between gap-3 items-end">
      <div className="flex gap-3">
        <Button onPress={onOpen} color="primary">
          Add New Item
        </Button>
        <ModalBox
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          refetch={refetch}
        />
      </div>
    </div>
  </div>
);

function UserTable({
  allUsers,
  loading,
  refetch,
  columns,
  handleRemoveUser,
  selectedKeys,
  handleSelectRowChange,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending',
  });

  return (
    <Table
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      hideHeader={loading}
      color="primary"
      selectionMode="multiple"
      aria-label="inventory table and data"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectRowChange}
      topContent={
        <TopContent
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          refetch={refetch}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        loadingContent={<Spinner />}
        isLoading={!!loading}
        emptyContent={!loading && allUsers?.length < 1 && 'No users found'}
        items={allUsers}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <TableCellRenderer
                  handleRemoveUser={handleRemoveUser}
                  data={item}
                  columnKey={columnKey}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default UserTable;

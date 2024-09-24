'use client';

import { Table } from '@nextui-org/react';

const TableGroup = ({
  children,
  bottomContent,
  topContent,
  sortDescriptor,
  onSortChange,
  onRowAction,
  ...props
}) => (
  <Table
    {...props}
    aria-label="table with custom cells, pagination and sorting"
    isHeaderSticky
    bottomContentPlacement="outside"
    classNames={{
      wrapper: 'max-h-[382px] md:max-h-[67vh]',
    }}
    onRowAction={onRowAction}
    topContentPlacement="outside"
    bottomContent={bottomContent}
    sortDescriptor={sortDescriptor}
    topContent={topContent}
    onSortChange={onSortChange}
  >
    {children}
  </Table>
);

export default TableGroup;

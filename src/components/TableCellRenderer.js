'use client';

import { useCallback } from 'react';
import { useDisclosure } from '@nextui-org/react';

const TableCell = ({ data, columnKey, statusColorMap }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderCell = useCallback(() => {
    const cellValue = data[columnKey];
    switch (columnKey) {
      default:
        return cellValue;
    }
  }, [data, columnKey, statusColorMap, isOpen, onOpen, onClose]);
  return renderCell();
};

export default TableCell;

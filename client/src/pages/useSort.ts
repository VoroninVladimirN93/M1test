import { useMemo, useState } from 'react';
import { itemsType } from './useData';

function useSort(items: itemsType[]): [itemsType[], string, () => void] {
  const [sortBy, setSortBy] = useState('ASC');

  const sortedItems = useMemo(() => {
    //* Создаем копию массива, чтобы не мутировать оригинал
    const itemsCopy = [...items];

    if (sortBy === 'ASC') {
      return itemsCopy.sort((a, b) => a.id - b.id);
    }
    if (sortBy === 'DESC') {
      return itemsCopy.sort((a, b) => b.id - a.id);
    }
    return itemsCopy;
  }, [items, sortBy]);

  const handleSortClick = () => {
    if (sortBy === 'ASC') {
      setSortBy('DESC');
    } else if (sortBy === 'DESC') {
      setSortBy('ASC');
    } else {
      setSortBy('');
    }
  };

  return [sortedItems, sortBy, handleSortClick];
}

export default useSort;

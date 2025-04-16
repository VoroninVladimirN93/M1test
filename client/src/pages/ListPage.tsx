import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 20;

const SubTitle: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>,
  (prevProps, nextProps) => {
    //* Компонент будет ререндериться только если children изменился
    return prevProps.children === nextProps.children;
  },
);

function ListPage() {
  const items = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [prevQuery, setPrevQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const activeItemText = useMemo(() => (activeItemId ? activeItemId : 'Empty'), [activeItemId]);

  //* Поиск максимального ID среди загруженных элементов
  const maxId = useMemo(() => {
    if (!items.length) return 0;
    return Math.max(...items.map((item) => item.id));
  }, [items]);

  const handleItemClick = useCallback((id: number) => {
    setActiveItemId(id);
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === '') {
      setInputError(null);
      setQuery('');
      return;
    }

    if (!/^\d+$/.test(value)) {
      setInputError('В поле можно ввести только цифры');
      return;
    }

    const numValue = parseInt(value);

    if (numValue < 1) {
      setInputError('ID не может быть меньше 1');
      return;
    }

    if (maxId && numValue > maxId) {
      setInputError(`Максимальное значение ID: ${maxId}`);
      return;
    }

    setInputError(null);
    setQuery(value);
  };

  //* Избавился от стейта filteredItems и useEffect
  const filteredItems = useMemo(() => {
    if (!query) return sortedItems;
    return sortedItems.filter((item) =>
      `${item.id}`.includes(
        query
          .toLowerCase()
          .trimStart()
          .trimEnd()
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      ),
    );
  }, [query, sortedItems]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  }, [filteredItems]);

  //* Получаем элементы для текущей страницы
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    //* Сброс на 1 только если query изменился (новый поиск)
    if (query !== prevQuery) {
      setSearchParams({ page: '1' });
      setPrevQuery(query);
    }
    //* Не реагируем на sortedItems !== items, чтобы сохранять страницу
  }, [query]); //* Убрал sortedItems из зависимостей

  return (
    <div className={'list-wrapper'}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setSearchParams({ page: String(page) })}
      />
      <div className="list-header">
        <h1 className={'list-title'}>Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})</button>
        <input
          type="text"
          //* Установка максимального значения на основе максимального в массиве данных
          placeholder={maxId ? `Filter by ID (1-${maxId})` : `Filter by ID`}
          value={query}
          onChange={handleQueryChange}
          //* Добавил 2 поля для мобильных устройств
          pattern="[0-9]*"
          inputMode="numeric"
        />
        {inputError && (
          <span style={{ color: 'red', fontSize: '1.2rem', paddingLeft: '4px' }}>{inputError}</span>
        )}
      </div>
      <div className="list-container">
        <div className="list">
          {paginatedItems.length === 0 && <span>Loading...</span>}
          {paginatedItems.map((item, index) => (
            <ListItem
              key={item.id}
              isActive={activeItemId === item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListPage;

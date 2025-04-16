import { useEffect, useState } from 'react';

export type itemsType = {
  description: string;
  id: number;
  name: string;
};
function useData() {
  const [items, setItems] = useState<itemsType[]>([]);

  function fetchItems() {
    fetch(`${process.env.API_URL}/items`)
      .then((res) => res.json())
      .then((newData) => {
        //* Сравниваем новые данные с текущими
        //* Если данные сложные, можно использовать стороннюю библиотеку для сравнения. Например Lodash
        if (JSON.stringify(newData) !== JSON.stringify(items)) {
          setItems(newData);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch items', err);
      });
  }

  useEffect(() => {
    fetchItems();
    const intervalId = setInterval(fetchItems, 10000);
    //* добавлена функция очистки, которая будет срабатывать при размонтировании компонента
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return items;
}

export default useData;

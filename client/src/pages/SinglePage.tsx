import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //? TODO переписать на trycatch .
    //? В целом структура с try-catch визуально лучше читается, чем цепочка из .then
    fetch(`${process.env.API_URL}/items/${id}`)
      .then((res) => {
        if (res.status === 403) {
          setError(`У вас нет доступа к данной записи`);
        }
        if (res.status === 404) {
          setError(`Запись не найдена`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .then((data) => setItem(data))
      .catch((err) => {
        console.error('Failed to fetch item', err);
      });
    return setError(null);
  }, [id]);
  //* Компонент, который будет возвращен, если вернулась ошибка доступа
  if (error) {
    return (
      <div className="error">
        <Link to="/">Go Back</Link>
        <h2>Ошибка</h2>
        <p>{error}</p>
      </div>
    );
  }
  //* Компонент, который будет возвращен, пока не наполнен state `item`
  if (!item) {
    return <div>Загрузка</div>;
  }
  return (
    <div className="detail">
      <Link to={'/'}>Go Back</Link>
      <h2>Item Details</h2>
      <p>ID: {item!.id}</p>
      <p>Name: {item!.name}</p>
      <p>Description: {item!.description}</p>
    </div>
  );
}

export default SinglePage;

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

//* Типизация пропсов переданных в ListItem
type ListItemProps = {
  id: number;
  name: string;
  description: string;
  onClick: (id: number) => void;
  isActive: boolean;
};

const ListItem: React.FC<ListItemProps> = memo(({ id, name, description, onClick, isActive }) => {
  return (
    <li className={isActive ? 'list-item active' : 'list-item'}>
      <div className={'list-item-actions'}>
        <div>
          ID: <b>{id}</b>
        </div>
        <Button onClick={onClick} id={id} disabled={isActive}>
          {isActive ? 'Active' : 'Set Active'}
        </Button>
      </div>
      {/* Перенес линк, т.к. кнопка была "ниже" уровнем. 
          Пытался убрать *всплытие*, через stopPropagation но не сработало */}
      <Link to={`/${id}`}>
        <div>{name}</div>
        <div className={'list-item__description'}>{description}</div>
      </Link>
    </li>
  );
});

export default ListItem;

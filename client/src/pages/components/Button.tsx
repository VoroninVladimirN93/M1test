import React, { memo, useCallback } from 'react';

//* типизация для компонента Кнопки
type Props = {
  onClick: (id: number) => void;
  id: number;
  disabled: boolean;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ onClick, id, disabled, children }) => {
  const handleClick = useCallback(() => {
    onClick(id);
  }, []);

  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default memo(Button);

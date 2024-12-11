import React from 'react';

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`
        box-border 
        flex 
        justify-center 
        items-center 
        p-2 w-9 h-9 
        bg-white border 
        border-gray-300 
        shadow-sm 
        rounded-md 
        ${disabled ? 'shadow-none text-[#18181B] cursor-not-allowed gray' : 'hover:bg-[#F4F4F5]'}`}
    >
      <img
        src={'/plus.png'}
        alt="+"
        className={`
        w-3.5 
        h-3.5
        ${disabled ? 'grayscale opacity-50' : ''}
        `}
      />
    </button>
  );
};

export default Button;

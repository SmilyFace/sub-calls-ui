import React from 'react';

type IconButtonProps = {
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({ disabled }) => {
  return (
    <button
      className={`
        flex 
        items-center 
        w-[109px] 
        h-[32px] 
        bg-white 
        border 
        border-gray-300 
        shadow-sm 
        rounded-md 
        mb-16
        ${disabled ? 'shadow-none text-[#18181B] cursor-not-allowed' : 'hover:bg-[#F4F4F5]'}
      `}
      disabled={disabled}
    >
      <img
        src="/link.png"
        alt="Icon"
        className={`w-4 h-4 ml-3 mr-2 ${
          disabled ? 'grayscale opacity-50' : ''
        }`}
      />
      <span
        className={`
          text-xs 
          font-medium 
          text-gray-900
          ${disabled ? 'gray' : ''}
        `}
      >
        Guidelines
      </span>
    </button>
  );
};

export default IconButton;

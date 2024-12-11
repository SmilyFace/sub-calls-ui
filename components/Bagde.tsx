import React from 'react';

type BadgeProps = {
  status: string;
};

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const isOpen = status === 'open';

  return (
    <div
      className={`
        flex 
        justify-center 
        items-center 
        gap-[10px] 
        
        ${isOpen ? 'w-[57px]' : 'w-[61px]'} 
        h-[20px] 
        ${isOpen ? ' bg-[#15803D]' : ' bg-[#F4F4F5]'} 
        rounded-[6px]
      `}
    >
      <span
        className={`
          text-xs 
          font-medium 
          ${isOpen ? 'text-white' : 'text-black'}
        `}
      >
        {isOpen ? 'Open' : 'Closed'}
      </span>
    </div>
  );
};

export default Badge;

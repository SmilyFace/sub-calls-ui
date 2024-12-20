import React from 'react';
import Badge from './Bagde';
import Button from './Button';
import ImageWithSkeleton from './Image';
import {
  getDisplayTitle,
  getActiveGenres,
  getReadingPeriod,
  getFee,
  getPay,
  isDisabled,
} from '../utils/callHelper';
import { Call } from '../models/Calls';

interface RowProps {
  call: Call;
  onRowClick: (_call: Call) => void;
}

const Row: React.FC<RowProps> = ({ call, onRowClick }) => {
  return (
    <tr
      className="hover:bg-gray-100 h-[72px] cursor-pointer border-b border-gray-300"
      onClick={() => onRowClick(call)}
    >
      <td className="w-[52px] flex justify-center items-center h-[72px]">
        <ImageWithSkeleton
          src={call.magazineCover || '/image.webp'}
          alt={call.title}
        />
      </td>
      <td className="pl-2 w-1/2 tablet:w-auto">
        <span className="capitalize">
          {getDisplayTitle(call.title, call.subGenre)}
        </span>
      </td>
      <td className="hidden tablet:table-cell min-w-[85px]">
        <Badge status={call.status} />
      </td>
      <td className="w-1/2 tablet:w-auto">
        <div>{getActiveGenres(call)}</div>
        <div
          className={`block tablet:hidden text-sm text-gray-500 capitalize 
            ${!isDisabled(call.status) ? 'text-[#15803d]' : ''}
        `}
        >
          {call.status}
        </div>
      </td>
      <td className="hidden desktop:table-cell">{getReadingPeriod(call)}</td>
      <td className="hidden tablet:table-cell min-w-[85px]">
        {getFee(call.fee)}
      </td>
      <td className="hidden tablet:table-cell min-w-[85px]">
        {getPay(call.payment)}
      </td>
      <td className="w-[52px] h-[72px]">
        <Button
          disabled={isDisabled(call.status)}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Button clicked');
          }}
        />
      </td>
    </tr>
  );
};

export default Row;

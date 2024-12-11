import React from 'react';
import { Call } from '../models/Calls';
import IconButton from '../components/IconButton';
import Badge from './Bagde';
import {
  getDisplayTitle,
  getActiveGenres,
  getReadingPeriod,
  getFee,
  getPay,
  isDisabled,
} from '../utils/callHelper';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Call | null;
  magazineName: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
  magazineName,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>

      <div className="absolute bg-white w-full h-[85%] mobile:h-[85%] tablet:h-full tablet:w-[552px] tablet:right-0 tablet:top-0 bottom-0 overflow-y-auto shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-gray-800"
        >
          <img src="/close.png" alt="Close" className="w-4 h-4" />
        </button>

        <div className="p-6">
          <h2 className="text-4xl text-black mb-3 text-left capitalize">
            {getDisplayTitle(data.title, data.subGenre)}
          </h2>

          <div className="mb-3">
            <span className="gray">Call by</span>
            <img
              src={data.magazineCover || '/image.webp'}
              className="h-6 w-6 inline-block mx-1.5 rounded-full object-cover"
              alt="Magazine Cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/image.webp';
              }}
            />
            <span>{magazineName}</span>
          </div>

          <IconButton disabled={isDisabled(data.status)} />

          <div className="grid grid-cols-[120px_auto] gap-y-4 mt-4 border-b-[1px] border-[#e4e4e7] pb-3 mb-2">
            <div className="text-sm gray w-30">Status:</div>
            <div className="text-sm ml-2">
              <span>
                <Badge status={data.status} />
              </span>
            </div>

            <div className="text-sm gray w-30">Reading Period:</div>
            <div className="text-sm ml-2">{getReadingPeriod(data)}</div>
          </div>

          <div className="grid grid-cols-[120px_auto] gap-y-4 mt-4 border-b-[1px] border-[#e4e4e7] pb-3 mb-2">
            <div className="text-sm gray w-30">Genre:</div>
            <div className="text-sm ml-2">{getActiveGenres(data)}</div>
            <div className="text-sm gray w-30">Style:</div>
            <div className="text-sm ml-2 capitalize">{data.genreStyle}</div>
            <div className="text-sm gray w-30">Subgenres:</div>
            <div className="text-sm ml-2 capitalize">
              {data.subGenre.length ? data.subGenre.join(', ') : 'no subgenres'}
            </div>
            <div className="text-sm gray w-30">Min. words:</div>
            <div className="text-sm ml-2 capitalize">
              {data.length.minimumWordCount || 'no limits'}
            </div>
            <div className="text-sm gray w-30">Max. words:</div>
            <div className="text-sm ml-2 capitalize">
              {data.length.maximumWordCount || 'no limits'}
            </div>
            <div className="text-sm gray w-30">Theme:</div>
            <div className="text-sm ml-2 capitalize">
              {data.theme.title !== '' ? data.theme.title : 'No theme '}
              {data.theme.description !== ''
                ? ' ' + data.theme.description
                : ''}
            </div>
          </div>

          <div className="grid grid-cols-[120px_auto] gap-y-4 mt-4 border-b-[1px] border-[#e4e4e7] pb-3 mb-2">
            <div className="text-sm gray w-30">Fee:</div>
            <div className="text-sm ml-2 capitalize">{getFee(data.fee)}</div>

            <div className="text-sm gray w-30">Pay:</div>
            <div className="text-sm ml-2 capitalize">
              {getPay(data.payment)}
            </div>
          </div>

          <div className="grid grid-cols-[120px_auto]  gap-y-4 mt-4">
            <div className="text-sm gray w-30">About:</div>
            <div className="text-sm ml-2 capitalize">
              {data.description || 'No description available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

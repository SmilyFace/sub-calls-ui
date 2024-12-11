import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Magazine } from '../models/Magazine';
import ImageWithSkeleton from '../components/Image';

const MagazinesList: React.FC = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await fetch('/api/magazines');
        if (!response.ok) {
          throw new Error('Failed to fetch magazines');
        }
        const data: Magazine[] = await response.json();
        setMagazines(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-[20px] max-w-[1480px] min-w-[375px] mx-auto">
      <h1 className="text-4xl mb-[32px] text-left">Magazines</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4E4E7] h-10">
              <th className="w-[52px]"></th>
              <th className="text-left pl-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {magazines.map((magazine) => (
              <tr
                key={magazine.magazineId}
                className="hover:bg-[#F4F4F5] cursor-pointer border-b border-[#E4E4E7] h-[72px]"
                onClick={() =>
                  router.push({
                    pathname: `/magazine/${magazine.magazineId}`,
                    query: { magazineName: magazine.name },
                  })
                }
              >
                <td className="w-[52px] flex justify-center items-center h-[72px]">
                  <ImageWithSkeleton
                    src={magazine.cover || '/image.webp'}
                    alt={magazine.name}
                  />
                </td>

                <td className="pl-2">
                  <span className="text-sm font-medium text-gray-800">
                    {magazine.name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MagazinesList;

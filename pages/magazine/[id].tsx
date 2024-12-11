import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';
import Link from 'next/link';
import { Call } from '../../models/Calls';
import Modal from '../../components/Modal';
import Row from '../../components/Row';

interface QueryParams extends ParsedUrlQuery {
  magazineName: string;
}

const MagazineCalls: React.FC = () => {
  const router = useRouter();
  const { id, magazineName } = router.query as QueryParams;
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const [visibleCalls, setVisibleCalls] = useState<Call[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCalls = async () => {
      try {
        const response = await fetch(`/api/subcalls?magazineId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch calls');
        }
        const data: Call[] = await response.json();
        setCalls(data);
        setVisibleCalls(data.slice(0, 20)); // Show initial 20 items
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, calls, visibleCalls]);

  const loadMore = () => {
    if (visibleCalls.length >= calls.length) {
      setHasMore(false);
      return;
    }
    const nextCalls = calls.slice(
      visibleCalls.length,
      visibleCalls.length + 20,
    );
    setVisibleCalls((prev) => [...prev, ...nextCalls]);
  };

  const openModal = (call: Call) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCall(null);
    setIsModalOpen(false);
  };

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sub Calls</title>
      </Head>
      <div className="p-[20px] max-w-[1480px] min-w-[375px] mx-auto">
        <h1 className="text-4xl mb-[32px] text-left">
          <Link href="/" className="">
            Sub Calls
          </Link>
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7] h-10">
                <th className="w-[52px]"></th>
                <th className="text-left pl-2 ">Name</th>
                <th className="text-left hidden tablet:table-cell">Status</th>
                <th className="text-left ">Genre</th>
                <th className="text-left hidden desktop:table-cell">
                  Reading Period
                </th>
                <th className="text-left hidden tablet:table-cell min-w-[85px]">
                  Fee
                </th>
                <th className="text-left hidden tablet:table-cell min-w-[85px]">
                  Pay
                </th>
                <th className="w-[52px] p-4"></th>
              </tr>
            </thead>
            <tbody>
              {visibleCalls.map((call) => (
                <Row
                  key={call.magazineId.$oid}
                  call={call}
                  onRowClick={openModal}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={selectedCall}
          magazineName={magazineName}
        />
      </div>
    </>
  );
};

export default MagazineCalls;

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HiMiniPlusCircle } from 'react-icons/hi2';
import { Card } from './Card';
import { Pagination } from '@/components/Pagination/Pagination';
import { useAuthContext } from '..';
import { H1 } from '@/components/ui/Headings';

const apiUrl = import.meta.env.VITE_API_URL;
const gamesPerPage = 10;

export function BoardgameList() {
  const [boardgames, setBoardgames] = useState(null);
  const [numberOfGames, setNumberOfGames] = useState(0);

  const [search] = useSearchParams();
  const page = search.get('page') ?? 1;
  const { user } = useAuthContext();

  useEffect(() => {
    async function getBoardgames() {
      const data = await fetch(
        `${apiUrl}/boardgames?_page=${page}&_limit=${gamesPerPage}`
      ).then((res) => {
        const totalNoGames = res.headers.get('x-total-count');
        setNumberOfGames(totalNoGames);
        return res.json();
      });
      setBoardgames(data);
    }

    getBoardgames();
  }, [page]);

  if (!boardgames) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <H1>Boardgames</H1>
      {user && (
        <Link
          to="add"
          className="inline-flex items-center border border-stone-900 rounded px-4 py-2 bg-cyan-200"
        >
          <HiMiniPlusCircle className="mr-2 text-2xl" />
          Add a Game
        </Link>
      )}
      <div className="grid grid-cols-responsive gap-4">
        {boardgames.map((bg) => (
          <Card key={bg.id} game={bg} />
        ))}
      </div>
      <Pagination numberOfItems={numberOfGames} itemsPerPage={gamesPerPage} />
    </>
  );
}

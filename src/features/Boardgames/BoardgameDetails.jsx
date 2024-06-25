import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useAuthContext } from '..';
import { Button, DestructiveButton } from '@/components/forms/Buttons';
import { toast } from 'react-toastify';
import { H1 } from '@/components/ui/Headings';

const apiUrl = import.meta.env.VITE_API_URL;

export function BoardgameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const navigate = useNavigate();

  const { user, accessToken } = useAuthContext();

  useEffect(() => {
    fetch(`${apiUrl}/boardgames/${id}`)
      .then((res) => res.json())
      .then(setGame);
  }, [id]);

  async function handleDeleteGame() {
    const res = await fetch(`${apiUrl}/boardgames/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then((res) =>  res.json());

    if (typeof res === 'string') {
      toast.error(res);
    } else {
      navigate(-1);
      toast.success(`"${game.name}" was deleted successfully.`);
    }
  }

  if (!game) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <H1>{game.name}</H1>
      <img src={game.image} alt={game.name} className="w-full max-w-md mx-auto"/>
      <p><strong>Description:</strong> {game.description}</p>
      <p><strong>Alternate Names:</strong> {game.alternateNames.join(', ')}</p>
      <p><strong>Number of Players:</strong> {game.numberOfPlayers.min} - {game.numberOfPlayers.max} (Recommended: {game.numberOfPlayers.recommended}, Best: {game.numberOfPlayers.best})</p>
      <p><strong>Playtime:</strong> {game.playtime.min} - {game.playtime.max} minutes (Average: {game.playtime.avg} minutes)</p>
      <p><strong>Minimum Age:</strong> {game.minAge}</p>
      <p><strong>Year Published:</strong> {game.yearpublished}</p>
      <p><strong>Rank:</strong> {game.rank}</p>
      <p><strong>Average Rating:</strong> {game.average}</p>
      <p><strong>Bayes Average Rating:</strong> {game.bayesaverage}</p>
      <p><strong>Users Rated:</strong> {game.usersrated}</p>
      {game.otherRanks && (
        <p><strong>Other Ranks:</strong> {Object.entries(game.otherRanks).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
      )}

      {user && (
        <>
          <Link to="edit" className="border border-stone-900 rounded px-4 py-2 justify-self-start bg-cyan-200 inline-block">Edit</Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DestructiveButton type="button" className="">Delete</DestructiveButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete "{game.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the game from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <DestructiveButton onClick={handleDeleteGame}>Delete</DestructiveButton>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <Link to={'/boardgames/' + String(Number(id) + 1)}>Next</Link>
    </>
  )
}

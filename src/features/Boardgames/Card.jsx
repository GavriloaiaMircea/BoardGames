import { Link } from "react-router-dom";

export function Card({game}) {
  return (
    <article className="flex rounded shadow-md">
      <Link to={game.id.toString()} className="flex flex-col text-center grow">
        <img src={game.thumbnail} alt={`Poster of "${game.name}"`} className="rounded-t-sm min-w-full" />
        <h2 className="mt-auto mb-4">{game.name}</h2>
      </Link>
    </article>
  );
}

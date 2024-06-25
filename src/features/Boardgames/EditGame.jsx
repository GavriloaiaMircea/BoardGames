import { DestructiveButton, PrimaryButton } from '@/components/forms/Buttons';
import { Form } from '@/components/forms/Form';
import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';
import { H1 } from '@/components/ui/Headings';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { HiMiniMinusCircle, HiMiniPlusCircle } from 'react-icons/hi2';
import { array, number, object, string } from 'yup';
import { useAuthContext } from '..';

const validationSchema = object({
  bggId: number().required().min(0),
  name: string().required(),
  thumbnail: string().url(),
  image: string().url(),
  alternateNames: array(string()),
  description: string().required(),
  numberOfPlayers: object({
    min: number(),
    max: number(),
    recommended: number(),
    best: number(),
  }),
  playtime: object({
    avg: number(),
    min: number(),
    max: number(),
  }),
  minAge: number(),
  yearpublished: number(),
  rank: number(),
  bayesaverage: number(),
  average: number(),
  usersrated: number(),
  otherRanks: object({
    strategygames: number(),
    thematic: number(),
  }),
});

const apiUrl = import.meta.env.VITE_API_URL;

export function EditGame() {
  const [boardgame, setBoardgame] = useState(null);
  const { id } = useParams();

  const { accessToken } = useAuthContext();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () =>
      await fetch(`${apiUrl}/boardgames/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBoardgame(data);
          return data;
        }),
  });

  async function handleUpdateGame(boardgame) {
    const newGame = await fetch(`${apiUrl}/boardgames/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(boardgame),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

    toast.success(`The boardgame "${newGame.name}" was updated!`);
  }

  if (!boardgame) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      <H1>Editing {boardgame.name}</H1>
      <Form onSubmit={handleSubmit(handleUpdateGame)}>
        <Input
          labelText="BGG Id"
          type="number"
          errorMessage={errors.bggId?.message}
          {...register('bggId')}
        />
        <Input
          labelText="Title"
          type="text"
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <Input
          labelText="Thumbnail"
          type="url"
          errorMessage={errors.thumbnail?.message}
          {...register('thumbnail')}
        />
        <Input
          labelText="Image"
          type="url"
          errorMessage={errors.image?.message}
          {...register('image')}
        />
        <div className="grid grid-cols-[150px,_1fr,_1fr] gap-1 col-start-2 border border-slate-200 rounded">
          {boardgame.alternateNames.map((name, i) => (
            <Fragment key={name}>
              <Input
                labelText="Alternate Name"
                type="text"
                errorMessage={errors.alternateNames?.message}
                {...register(`alternateNames.${i}`)}
              />
              <DestructiveButton
                className="text-2xl"
                type="button"
                onClick={() => {
                  unregister([`alternateNames.${i}`], {keepDefaultValue: false, keepValue: false});
                  setBoardgame({
                    ...boardgame,
                    alternateNames: boardgame.alternateNames.toSpliced(i, 1),
                  });
                }}
              >
                <HiMiniMinusCircle />
              </DestructiveButton>
            </Fragment>
          ))}
          <div className="col-start-2">
            <PrimaryButton
              className="text-2xl"
              type="button"
              onClick={() =>
                setBoardgame({...boardgame, alternateNames: [...boardgame.alternateNames, '']})
              }
            >
              <HiMiniPlusCircle />
            </PrimaryButton>
          </div>
        </div>
        <Textarea
          labelText="Description"
          {...register('description')}
          errorMessage={errors.description?.message}
        />
        <PrimaryButton className="col-start-2">Add</PrimaryButton>
      </Form>
    </>
  );
}

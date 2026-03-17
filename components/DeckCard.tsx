import Image from 'next/image';
import RoundButton from './RoundButton';
import { useRouter } from 'next/navigation';

interface DeckCard {
  id: string;
  title: string;
  numCards: number;
}

export default function DeckCard({ id, title, numCards }: DeckCard) {
  const router = useRouter();

  function handleEdit() {
    router.push(`/study/${id}`);
  }

  return (
    <div className="group relative cursor-pointer bg-surface-background-50 w-45 md:w-50 h-50 md:h-60 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 border border-border hover:border-border-focus p-6 transition-all duration-200">
      <div className="flex flex-col justify-center items-center text-center h-full">
        <h1>{title}</h1>
        <p>{numCards} cards</p>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <RoundButton
          icon={<Image src="/edit.png" alt="edit" width={20} height={20} />}
          onClick={handleEdit}
        />
        <RoundButton
          icon={<Image src="/trash.png" alt="edit" width={20} height={20} />}
          onClick={handleEdit}
        />
      </div>
    </div>
  );
}

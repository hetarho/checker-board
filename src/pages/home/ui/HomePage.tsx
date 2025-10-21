import { CheckerBoard } from '@/entities/check-list/ui/CheckerBoard';

export function HomePage() {
  return (
    <div className="flex w-screen justify-center pt-20">
      <CheckerBoard
        checkLists={Array.from({ length: 10 }, (_, index) => ({
          id: index.toString(),
          title: `Check List ${index + 1}`,
          description: `Description ${index + 1}`,
          items: Array.from(
            { length: Math.floor(Math.random() * 10) + 1 },
            (_, index) => `Item ${index + 1}`
          ),
        }))}
        col={3}
      />
    </div>
  );
}

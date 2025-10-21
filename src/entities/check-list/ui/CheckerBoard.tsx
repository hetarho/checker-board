import { cn } from '@/shared/utils/cn';
import { motion } from 'motion/react';

type CheckList = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

type CheckerBoardProps = {
  checkLists: CheckList[];
  col: number;
};

export const CheckerBoard = ({ checkLists, col }: CheckerBoardProps) => {
  return (
    <div
      className={cn('grid w-52 overflow-hidden rounded-2xl bg-gray-200', {
        'grid-cols-2': col === 2,
        'grid-cols-3': col === 3,
        'grid-cols-4': col === 4,
        'grid-cols-5': col === 5,
        'grid-cols-6': col === 6,
        'grid-cols-10': col === 10,
      })}
    >
      {checkLists.map((checkList, index) => {
        const row = Math.floor(index / col);
        const column = index % col;
        const diagonalDelay = (row + column) * 0.15;

        return (
          <motion.div
            key={checkList.id}
            initial={{ rotateX: 180, rotateY: 180 }}
            animate={{ rotateX: 0, rotateY: 0 }}
            transition={{
              duration: 1.5,
              delay: diagonalDelay,
              ease: 'easeInOut',
            }}
            className={cn('aspect-square bg-red-400', {
              'bg-blue-400': index % 2 === 0,
            })}
          >
            <h2>{checkList.title}</h2>
          </motion.div>
        );
      })}
    </div>
  );
};

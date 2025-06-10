import React from 'react';
import { Button } from '../ui/button';
import { LogoutIcon, NotificationIcon, WalletIcon } from '@/icons/icons';
import { Text } from '../Typography/Text';
import { Badge } from '../Badge/Badge';
import { BreadCrumps } from '../BreadCrumps/BreadCrumps';

export const Header = ({ currentPath }: { currentPath: string[] }) => {
  return (
    <header
      style={{ boxShadow: '0px 3px 9px 0px rgba(0, 0, 0, 0.1)' }}
      className="w-full bg-[var(--color-white)] shadow-md flex items-center justify-between h-20 pl-[40px] pr-[28px] py-5 gap-12">
      <BreadCrumps currentPath={currentPath} />

      <div className="flex gap-1 pr-[25px]  items-center ml-auto">
        <WalletIcon />
        <Text color="gray">Подписка активна</Text>
        <Badge>366 дней</Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-end">
            <Text alignment="right">Юлия</Text>
            <Text size="xs" color="gray" alignment="right">
              Собственник
            </Text>
          </div>

          <div className="w-10 h-10 rounded-full bg-amber-400"></div>
        </div>

        <Button className="w-9 h-9 min-w-fit py-1.5 px-1 aspect-square" variant="text">
          <NotificationIcon />
        </Button>
        <Button className="w-9 h-9  min-w-fit py-1.5 px-1 aspect-square" variant="text">
          <LogoutIcon />
        </Button>
      </div>
    </header>
  );
};

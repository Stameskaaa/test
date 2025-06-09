'use client';
import {
  Sidebar,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Text } from '../Typography/Text';
import {
  ArrowDown,
  BagIcon,
  CategoryIcon,
  ChatIcon,
  GraphIcon,
  MainIcon,
  PaperIcon,
  SettingIcon,
  User2Icon,
} from '@/icons/icons';
import Link from 'next/link';
import { useState } from 'react';

const items = [
  {
    title: 'Аналитика',
    icon: <GraphIcon />,
    child: [{ text: 'Уведомления' }, { text: 'Рассылка' }],
  },
  {
    title: 'Задачи',
    icon: <CategoryIcon />,
    child: [{ text: 'Уведомления' }, { text: 'Рассылка' }],
  },
  {
    title: 'Сотрудники',
    icon: <User2Icon />,
  },
  {
    title: 'Услуги',
    icon: <BagIcon />,
  },
  {
    title: 'Настройки',
    icon: <SettingIcon />,
  },
  {
    title: 'Руководство',
    icon: <PaperIcon />,
    child: [{ text: 'Уведомления' }, { text: 'Рассылка' }],
  },
  {
    title: 'Бот',
    icon: <ChatIcon />,
    child: [{ text: 'Уведомления' }, { text: 'Рассылка' }],
  },
];

export function AppSidebar() {
  return (
    <SidebarProvider className="h-full w-full max-w-[280px]">
      <Sidebar
        className="h-full w-full max-w-[280px] bg-[var(--color-white)] overflow-y-auto"
        collapsible="none">
        <SidebarHeader className="py-5 px-3 ">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-auto flex gap-3 p-0">
                <MainIcon />
                <Text alignment="left" size="sm" nowrap={false}>
                  Барбершоп Петроградкая
                </Text>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <div className="w-[232px] mx-auto h-[1px] bg-[rgba(235,238,246,1)] mb-3" />
        <SidebarMenu>
          {items.map(({ title, icon, child }, index) => {
            const [open, setOpen] = useState(false);

            return (
              <Collapsible
                defaultOpen
                open={open}
                onOpenChange={setOpen}
                className="group/collapsible"
                key={index}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link href={`/${title.toLowerCase()}`} passHref>
                      <SidebarMenuButton className="h-auto p-3 flex gap-1 rounded-[8px] cursor-pointer">
                        {icon}
                        <Text alignment="left" size="sm">
                          {title}
                        </Text>
                        {child && <ArrowDown open={open} />}
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>

                  {child && (
                    <SidebarMenuSub
                      style={{ display: open ? 'flex' : 'none' }}
                      className="ml-[18px]">
                      {child.map(({ text }, subIndex) => (
                        <CollapsibleContent key={subIndex}>
                          <SidebarMenuSubItem>
                            <Link href={`/${title.toLowerCase()}/${text.toLowerCase()}`} passHref>
                              <SidebarMenuButton className="h-auto cursor-pointer py-3.5 px-3">
                                <Text alignment="left" size="sm">
                                  {text}
                                </Text>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuSubItem>
                        </CollapsibleContent>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
}

import createContextHook from '@nkzw/create-context-hook';
import { useState } from 'react';

export const [DrawerProvider, useDrawer] = createContextHook(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return { isOpen, openDrawer, closeDrawer, toggleDrawer };
});

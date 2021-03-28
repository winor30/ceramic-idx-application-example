import { useState } from 'react';

export const useOpen = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return { isOpen, onOpen, onClose, toggle };
};

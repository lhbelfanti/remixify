import type { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  onClose(): void;
}
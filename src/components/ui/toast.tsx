// src/components/ui/toast.tsx

import React from "react";

export type ToastActionElement = React.ReactNode;

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Toast: React.FC<ToastProps> = ({ title, description, action, open }) => {
  return (
    <div className={`toast ${open ? 'open' : ''}`}>
      {title && <h4>{title}</h4>}
      {description && <p>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default Toast;
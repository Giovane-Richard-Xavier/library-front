import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type ModalProps = {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpen?: (open: boolean) => void;
};

export const Modal = ({
  title,
  description,
  trigger,
  children,
  footer,
  open,
  onOpen,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="w-full h-full">{children}</div>
        <DialogFooter>
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

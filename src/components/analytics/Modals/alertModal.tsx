import React from "react";
import { Modal } from "./modalBase";
import { Button } from "@/components/ui/button";
import { IonIcon } from "@ionic/react";
import {
  alertCircle,
  alertCircleOutline,
  warningOutline,
} from "ionicons/icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IAlertModalProps {
  titleModal: string;
  descriptionModal: string;
  textButtonCancel?: string;
  textButtonConfirm?: string;
  variantButtonCancel?: "secondary" | "outline" | "ghost";
  variantButtonConfirm?: "default" | "ghost" | "destructive";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const AlertModal = ({
  titleModal,
  descriptionModal,
  textButtonCancel = "Cancelar",
  textButtonConfirm = "Confirmar",
  variantButtonCancel = "secondary",
  variantButtonConfirm = "default",
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: IAlertModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-lg max-h-[85vh] overflow-y-auto overflow-x-none">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <DialogTitle>{titleModal}</DialogTitle>
          <IonIcon
            icon={warningOutline}
            className="text-yellow-500 w-20 h-20 mx-auto mb-2"
          />
          <DialogDescription className="text-center">
            {descriptionModal}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-10 mt-5 w-full">
          <Button
            variant={variantButtonCancel}
            className="w-full flex-1"
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                onClose();
              }
            }}
          >
            {textButtonCancel}
          </Button>
          <Button
            variant={variantButtonConfirm}
            className="w-full flex-1"
            onClick={() => onConfirm()}
          >
            {textButtonConfirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from "react";

type ModalType = "TWITTER" | "FACEBOOK";

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openModalType, setOpenModalType] = useState<ModalType>(null);
  const openModal = (modalType?: ModalType) => {
    setOpenModalType(modalType);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setOpenModalType(null);
  };

  return { isOpenModal, openModal, closeModal, openModalType };
};
export default useModal;

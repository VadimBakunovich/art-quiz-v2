import Modal from 'react-modal';

import { useStore } from 'store';

Modal.setAppElement('#root');

export default function AppModal() {
  const { isModalOpen, modalContent } = useStore();

  return (
    <Modal
      overlayClassName=' '
      className=' '
      isOpen={isModalOpen}
      closeTimeoutMS={300}
    >
      {modalContent}
    </Modal>
  );
}

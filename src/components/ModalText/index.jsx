import { useEffect } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

export default function ModalText({ isOpen, onClose, modalText, buttonClose = true, children, maxWidth, minWidth }) {

  const handleClose = () => {
    onClose(false);
  };

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);

  return (
    <div className={styles.modal}>
      {/** Adicionado a propriedade minWidth. ass: Mateus 30/08/2023 */}
      <div className={styles.modalContent} style={{ maxWidth: maxWidth, minWidth: minWidth }}>
        <div className={styles.modalHeader}>
          <p className={styles.title}>{modalText}</p>
          {buttonClose && (
            <Image
              src={require("./btnClose.svg")}
              alt="Fechar modal"
              title="Fechar modal"
              className={styles.btnClose}
              width={20}
              height={20}
              onClick={handleClose} />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

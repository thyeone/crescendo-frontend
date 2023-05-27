import tw from 'tailwind-styled-components';
import PageLayout from '@components/common/PageLayout';
import BasicModal from '@components/modal/BasicModal';

import { useState } from 'react';

const Basic = () => {
  const [defaultModalIsOpen, setDefaultModalIsOpen] = useState(false);
  const [purpleTitleModalIsOpen, setPurpleTitleModalIsOpen] = useState(false);
  const [purpleButtonModalIsOpen, setPurpleButtonModalIsOpen] = useState(false);

  const modalObj = {
    defaultModal: () => setDefaultModalIsOpen(false),
    purpleTitleModal: () => setPurpleTitleModalIsOpen(false),
    purpleButtonModal: () => setPurpleButtonModalIsOpen(false),
  };

  const handleClose = (modalName) => {
    return modalObj[modalName];
  };

  const handleClick = () => {
    alert('clicked');
  };

  return (
    <PageLayout>
      {/* Default Modal */}
      {/* isPurple : x , isButton : x */}
      <button onClick={() => setDefaultModalIsOpen(true)}>Default Modal</button>
      {defaultModalIsOpen && (
        <BasicModal
          isOpen={defaultModalIsOpen}
          handleClose={handleClose('defaultModal')}
          title="참여 신청자"
        >
          <ModalWrapper>
            <div className="my-[30px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}

      {/* PurpleTitle Modal */}
      {/* isPurple : o , isButton : x */}
      <button onClick={() => setPurpleTitleModalIsOpen(true)}>
        PurpleTitle Modal
      </button>
      {purpleTitleModalIsOpen && (
        <BasicModal
          isPurple
          isOpen={purpleTitleModalIsOpen}
          handleClose={handleClose('purpleTitleModal')}
          title="참여 신청자"
        >
          <ModalWrapper>
            <div className="my-[30px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}

      {/* PurpleButton Modal */}
      {/* isPurple : o , isButton : o */}
      <button onClick={() => setPurpleButtonModalIsOpen(true)}>
        PurpleButton Modal
      </button>
      {purpleButtonModalIsOpen && (
        <BasicModal
          isPurple
          isButton
          isOpen={purpleButtonModalIsOpen}
          handleClose={handleClose('purpleButtonModal')}
          title="참여 신청자"
          handleClick={handleClick}
        >
          <ModalWrapper>
            <div className=" mt-[20px] h-[30px] w-[50px] bg-slate-400"></div>
          </ModalWrapper>
        </BasicModal>
      )}
    </PageLayout>
  );
};

export default Basic;

const ModalWrapper = tw.div`
  mx-[58px]
  flex
  flex-col
  items-center
`;

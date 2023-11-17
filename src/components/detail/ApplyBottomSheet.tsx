import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import TextArea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { usePostApplication } from '@hooks/mutations/usePostApplication';
import useToast from '@hooks/useToast';
import { useRecoilValue } from 'recoil';
import { userState } from '@recoil/auth';
import { useGetStudyDetail } from '@hooks/queries/useGetStudy';

const ApplyBottomSheet = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const { data: study } = useGetStudyDetail(String(router.query.id));
  const { mutate: postApplication } = usePostApplication();
  const { username } = useRecoilValue(userState);

  const handleOpenApplySheet = () => {
    if (!username) {
      showToast({
        type: 'fail',
        message: '로그인 후 이용 가능해요.',
      });
      return;
    }
    if (study.leaders[0].username === username) {
      showToast({
        type: 'fail',
        message: '본인이 개설한 스터디에요.',
      });
      return;
    }
    setIsOpen(true);
  };

  const handleApplyStudy = () => {
    const uuid = String(router.query.id);
    const message = String(ref.current?.value);

    if (!message.length) {
      showToast({
        type: 'fail',
        message: '내용을 입력해주세요.',
      });
      ref.current?.focus();
      return;
    }
    postApplication({ uuid, message });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-x-0 bottom-0 z-[999] flex h-screen w-screen items-end justify-center bg-[rgba(51,51,53,0.6)]"
        >
          <section
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            className="relative bottom-0 z-[999] mx-auto my-0 flex w-full max-w-3xl animate-slideUp flex-col rounded-t-md bg-white p-6"
          >
            <div className="mx-auto my-0 w-full max-w-xl px-5">
              <TextArea
                id="apply-textarea"
                label="신청서 작성"
                ref={ref}
                placeholder="신청과 함께 본인을 소개하는 문구를 작성해주세요!"
                className="w-full"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  text="제출하기"
                  className="h-[32px] w-[74px] rounded-full"
                  onClick={handleApplyStudy}
                />
              </div>
            </div>
            <button
              className="absolute right-0 top-[-42px] z-[1000] flex h-[42px] w-[120px] items-center justify-center gap-x-1 rounded-md bg-brand hover:bg-[#a24ec8] hover:duration-500 hover:ease-in-out"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="select-none text-14 font-bold text-white">
                신청하기
              </span>
              <Image
                src="/svg/arrow_up.svg"
                width={20}
                height={20}
                alt="신청하기"
                className={`${isOpen && 'rotate-[-180deg]'}`}
              />
            </button>
          </section>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="fixed bottom-0 w-full max-w-3xl">
            <button
              className="absolute right-0 top-[-42px] z-[1000] flex h-[42px] w-[120px] items-center justify-center gap-x-1 rounded-md bg-brand hover:bg-[#a24ec8] hover:duration-500 hover:ease-in-out"
              onClick={handleOpenApplySheet}
            >
              <span className="select-none text-14 font-bold text-white">
                신청하기
              </span>
              <Image
                src="/svg/arrow_up.svg"
                width={20}
                height={20}
                alt="신청하기"
                className={`${isOpen && 'rotate-[-180deg]'}`}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyBottomSheet;

import Image from 'next/image';
import { useState } from 'react';
import LoginModal from '@components/modal/LoginModal';
import NavigateList, {
  NavigateListType,
} from '@components/common/NavigateList';
import Link from 'next/link';

const NAVIGATE_LIST: NavigateListType[] = [
  { id: 1, text: '마이페이지', path: '/mypage' },
  { id: 2, text: '스터디 관리', path: '' },
  { id: 3, text: '정보 수정', path: '' },
  { id: 4, text: '로그아웃', path: '' },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <header className="flex h-[70px] w-full items-center justify-between bg-white px-7 shadow-header">
      <Link href={'/home'}>
        <Image
          src="/svg/logo_light_mode.svg"
          width={124}
          height={24}
          alt="crescendo"
          className="h-[24px] w-[124px] cursor-pointer"
        />
      </Link>
      {isLogin ? (
        <div className="flex cursor-pointer gap-x-5 ">
          <span className="text-16 font-medium">스터디 개설</span>
          <div className="w-[2px] h-7 bg-[#D9D9D9]" />
          <span
            className="text-16 font-bold text-brand"
            onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            닉네임 님
          </span>
        </div>
      ) : (
        <span
          className="cursor-pointer text-16 font-bold text-brand"
          onClick={() => setIsModal(true)}
        >
          로그인 / 회원가입
        </span>
      )}
      {isOpen && (
        <ul
          className="absolute right-4 top-[75px] flex flex-col gap-y-[1px] bg-[#D1D1D1] shadow-xl"
          onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          {NAVIGATE_LIST.map(({ id, text, path }) => (
            <NavigateList key={id} text={text} path={path} />
          ))}
        </ul>
      )}
      {isModal && (
        <LoginModal isOpen={isModal} handleClose={() => setIsModal(false)} />
      )}
    </header>
  );
};

export default Header;

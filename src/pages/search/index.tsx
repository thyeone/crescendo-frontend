import StudyList from '@components/search/StudyList';
import PageLayout from '@components/common/PageLayout';
import SelectBox from '@components/common/SelectBox';
import {
  LEFT_SELECT_OPTION,
  RIGHT_SELECT_OPTION,
  SORT_OBJ,
  SortStateType,
} from '@constants/search';
import { Suspense, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import StudyListSkeleton from '@components/skeleton/StudyListSkeleton';
import Input from '@components/common/Input';
import Image from 'next/image';
import { categories } from '@constants/categories';
import { useRouter } from 'next/router';
import useStudyList from '@hooks/useStudyList';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleCategoryList, studySearchRouter } = useStudyList();
  const [isOpen, setIsOpen] = useState<SortStateType>(SORT_OBJ);
  const [leftValue, setLeftValue] = useState<string>('최신순');
  const [rightValue, setRightValue] = useState<string>('모집여부');

  const router = useRouter();

  const handleSearchClick = () => {
    if (!inputRef.current) return;
    const { value } = inputRef.current;

    studySearchRouter(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || !inputRef.current) return;
    const { value } = inputRef.current;

    if (e.key === 'Enter') {
      studySearchRouter(value);
      setLeftValue('최신순');
      setRightValue('모집여부');
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center">
        <div className="mt-[150px] flex items-center gap-x-2">
          <SelectBox
            options={LEFT_SELECT_OPTION}
            value={leftValue}
            setValue={setLeftValue}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <SelectBox
            options={RIGHT_SELECT_OPTION}
            value={rightValue}
            setValue={setRightValue}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Input
            id="search-bar"
            type="text"
            variant="middle"
            placeholder="제목, 스터디명 또는 태그를 검색해주세요."
            className="w-[500px] text-14"
            ref={inputRef}
            defaultValue={router.query.study_title || router.query.post_title}
            onKeyDown={onKeyDown}
          />
          <Image
            src={'/svg/search_icon.svg'}
            width={16}
            height={16}
            alt="searchIcon"
            className="relative right-10 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <div className="mb-10 flex justify-center">
        <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
          {[{ name: 'All', id: 0 }, ...categories].map(({ id, name }) => (
            <CategoryBox
              key={id}
              className={`${
                ((id === 0 && !router.query.categories) ||
                  router.query.categories?.includes(name)) &&
                'border-[#8266FF] text-[#8266FF]'
              }`}
              onClick={() => {
                id === 0
                  ? router.replace(router.pathname)
                  : handleCategoryList(name);
              }}
            >
              {name}
            </CategoryBox>
          ))}
        </ul>
      </div>
      <Suspense fallback={<StudyListSkeleton />}>
        <StudyList />
      </Suspense>
    </PageLayout>
  );
};

export default Search;

const CategoryBox = tw.li`
  flex
  h-fit
  w-fit
  cursor-pointer
  list-none
  items-center
  justify-center
  rounded-[7px]
  border-[1.5px]
  border-[#EAEAEB]
  bg-white
  px-4
  py-2
  text-[14px]
`;

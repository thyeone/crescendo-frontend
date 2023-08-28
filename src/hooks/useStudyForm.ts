import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';

type StudyFormType = {
  head_image: File | null;
  post_title: string;
  post_content: string;
  study_name: string;
  start_date: Date | null;
  end_date: Date | null;
  deadline: Date | null;
  tags: string[];
  categories: string[];
  member_limit: number;
};

const useStudyForm = () => {
  const inputRef = useRef<(HTMLInputElement | ReactQuill)[]>([]);
  const [studyForm, setStudyForm] = useState<StudyFormType>({
    head_image: null,
    post_title: '',
    post_content: '',
    study_name: '',
    start_date: null,
    end_date: null,
    deadline: null,
    tags: [],
    categories: [],
    member_limit: 1,
  });

  const getInputRef = (el: HTMLInputElement | any) => {
    const key = el?.name || 'post_content';
    return (inputRef.current[key] = el);
  };

  const handleDateChange = (key: string, value: Date | null) => {
    setStudyForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleListChange = (key: string, value: string[]) => {
    setStudyForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmitInput = () => {
    const submitData = studyForm;

    Object.keys(inputRef.current).map((key) => {
      if (key === 'head_image') submitData[key] = inputRef.current[key].files;
      else submitData[key] = inputRef.current[key].value;
    });
    setStudyForm(submitData);

    return submitData;
  };

  return {
    studyForm,
    getInputRef,
    handleDateChange,
    handleListChange,
    handleSubmitInput,
  };
};

export default useStudyForm;

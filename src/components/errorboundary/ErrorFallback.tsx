import { getErrorMessage } from '@utils/getErrorMessage';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

export type ErrorFallbackProps = {
  error: AxiosError;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const status = Number(error.response?.status);
  const isNotAuthorized = status === 403;
  const { title, content, button } = getErrorMessage(status);
  const router = useRouter();

  return (
    <div className="flex h-[70vh] w-full select-none flex-col items-center justify-center gap-y-6">
      <Image src={'/svg/retry.svg'} width={28} height={28} alt="재시도" />
      <h3 className="text-center font-bold text-text-secondary">{title}</h3>
      <p className="whitespace-pre-wrap text-center text-14 text-text-secondary">
        {content}
      </p>
      <button
        className="mt-8 h-[34px] w-fit rounded bg-[#9455D3] px-3 duration-100 ease-in-out hover:bg-[#BB86EF]"
        onClick={() => (isNotAuthorized ? router.back() : resetErrorBoundary())}
      >
        <span className="text-14 font-bold text-white">{button}</span>
      </button>
    </div>
  );
};

export default ErrorFallback;

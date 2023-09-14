import userApi from '@apis/user/userApi';
import useUser from '@hooks/useUser';
import useToast from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUser = () => {
  const { showToast } = useToast();
  const { initUserState } = useUser();

  return useMutation(() => userApi.deleteUser(), {
    onSuccess: () => {
      initUserState();
      showToast({
        type: 'success',
        message: '회원 탈퇴가 성공적으로 처리되었습니다.',
      });
    },
    onError: () => {
      showToast({
        type: 'fail',
        message: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};

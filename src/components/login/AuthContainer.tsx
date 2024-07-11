import { useSearchParams } from 'react-router-dom';
import LoginModal from '../../components/login/LoginModal';
import SignUpModal from '../../components/login/ProfileSettingModal';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/RegisterStatus';
import { useEffect } from 'react';

const AuthContainer = () => {
  const { registerStatus, resetStatus } = useRegisterStore();
  const [searchParams] = useSearchParams();
  const authState = searchParams.get('authState');

  useEffect(() => {
    if (
      authState !== 'signup' && //쿼리스트링으로 전달된 authState 값이 signup이 아니고
      registerStatus !== RegisterStatus.LOG_IN //이미 로그인 되어있는 상태가 아니면
    ) {
      resetStatus(); //로그인이 필요한 상태로 재설정
    }
  }, [authState]);

  if (registerStatus === RegisterStatus.NEED_LOG_IN) {
    return <LoginModal />;
  }

  if (authState === 'signup' && registerStatus === RegisterStatus.SIGNING_UP) {
    return <SignUpModal />;
  } else {
    return <LoginModal />;
  }
};

export default AuthContainer;

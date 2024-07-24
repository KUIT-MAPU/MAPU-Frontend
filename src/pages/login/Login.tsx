import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';

const Login = () => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState<boolean>();
  const { setLogIn, setRegisterStatus } = useRegisterStore();

  const redirectUrl = new URL(window.location.href);
  const prevUrl = decodeURIComponent(
    redirectUrl.searchParams.get('state') || '/',
  );
  const code = redirectUrl.searchParams.get('code');
  const social = redirectUrl.pathname.toLowerCase();

  useEffect(() => {
    if (code) {
      //TODO: social에 따라 login api 호출 후, 서비스 가입 여부에 따라 회원가입중/로그인으로 상태 바꾸기
      setIsMember(false);
    } else {
      console.log(`${social} 로그인에 실패하였습니다.`);
      navigate(`${prevUrl === '/' ? prevUrl : prevUrl + '?authState=login'}`);
    }
  }, []);

  useMemo(() => {
    console.log('isMember:', isMember);
    if (isMember) {
      console.log('로그인 성공');
      //회원가입 되어있는 유저
      setLogIn('profileId', 'profileImgUrl', 'true access', 'true refresh');
      navigate(prevUrl);
    } else {
      console.log('회원가입 필요');
      //회원가입이 필요한 유저
      setRegisterStatus(RegisterStatus.SIGNING_UP);
      navigate(prevUrl + '?authState=signup');
    }
  }, [isMember]);

  return <></>;
};

export default Login;

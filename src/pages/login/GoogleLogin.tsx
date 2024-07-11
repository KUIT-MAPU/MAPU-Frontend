import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<string>();

  const redirectUrl = new URL(window.location.href);
  const prevUrl = decodeURIComponent(
    redirectUrl.searchParams.get('state') || '/',
  );
  const googleCode = redirectUrl.searchParams.get('code');

  useEffect(() => {
    if (googleCode) {
      //Google login api 호출
      //TODO: 서비스 가입 여부에 따라, 회원가입중/로그인으로 상태 바꾸기
      setUserInfo(googleCode);
    } else {
      console.log('구글 로그인에 실패하였습니다.');
      navigate(prevUrl); //TODO: 로그인 쿼리파라미터로 수정
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(prevUrl);
    }
  }, [userInfo]);

  return <></>;
};

export default GoogleLogin;

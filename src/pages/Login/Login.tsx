import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../../apis/instance';
import { useLogInDataQuery } from '../../apis/auth/socialLogin';

import useRegisterStore from '../../stores/registerStore';
import { RegisterStatus } from '../../types/enum/RegisterStatus';
import { ResponseCode } from '../../types/enum/ResponseCode';

const Login = () => {
  const navigate = useNavigate();
  const { setRegisterStatus, setLogIn } = useRegisterStore();

  const redirectUrl = new URL(window.location.href);
  const prevUrl = decodeURIComponent(
    redirectUrl.searchParams.get('state') || '/',
  );
  const code = redirectUrl.searchParams.get('code');
  const social = redirectUrl.pathname.toLowerCase().split('/')[1];

  console.log(`${social} login`);
  // console.log(code);

  const { loginData, isLoginDataLoading } = useLogInDataQuery(social, code!);

  useEffect(() => {
    console.log(`isLoginDataLoading: ${isLoginDataLoading}`);
    if (!isLoginDataLoading) {
      if (code) {
        //기존 유저, 로그인
        if (loginData!.code === ResponseCode.SUCCESS) {
          console.log('기존 사용자, 로그인 성공!');

          const profileId = loginData!.result.profileId;
          const imgUrl = loginData!.result.imgUrl;
          const accessToken = loginData!.result.accessToken;
          setLogIn(profileId, imgUrl, accessToken);

          instance.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          //로그인 된 유저에 대하여 모든 api 호출에 accesstoken 포함시키는 코드
          navigate(prevUrl);
        }

        //회원가입이 필요한 유저
        if (loginData!.code === ResponseCode.SIGN_UP_NEDDED) {
          console.log('회원가입이 필요한 사용자입니다.');
          setRegisterStatus(RegisterStatus.SIGNING_UP);
          navigate(prevUrl + '?authState=signup');
        } else {
          //오류
        }
      } else {
        console.log(`인가 코드 오류, ${social} 로그인에 실패하였습니다.`);
        navigate(`${prevUrl === '/' ? prevUrl : prevUrl + '?authState=login'}`);
      }
    }
  }, [isLoginDataLoading]);

  return <></>;
};

export default Login;

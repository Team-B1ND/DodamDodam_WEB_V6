import React from "react";
import { Signup } from "@src/types/signup/signup.type";
import { AuthInput, AuthInputTitle, AuthInputWrap } from "../../style";
import * as SignupS from "../style";
import * as AuthS from "../../style";
import * as S from "./style";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { PasswordParm } from "@src/types/login/login.type";
import OpenEye from "@src/assets/icons/sign/OpenEye.svg";
import CloseEye from "@src/assets/icons/sign/CloseEye.svg"

interface Props {
  signupData: Signup;
  passwordType:PasswordParm;
  handleSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitSignupDataFirst: () => void;
  handlePasswordView:()=>void;
}

const SignupFirst = ({
  signupData,
  passwordType,
  handleSignupData,
  submitSignupDataFirst,
  handlePasswordView
}: Props) => {
  return (
    <>
      <SignupS.SignupInputForm style={{ minHeight: 340 }}>
        <AuthInputWrap>
          <AuthInputTitle>ID</AuthInputTitle>
          <AuthInput
            name="id"
            value={signupData.id }
            onChange={handleSignupData}
            placeholder="dgsw1234"
          />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>비밀번호</AuthInputTitle>
          <AuthInput
            name="pw"
            value={signupData.pw}
            onChange={handleSignupData}
            type={passwordType.type}
            placeholder="abcdefg1234"
          />
            <AuthS.AuthPasswordBtn>
              <img src={passwordType.visible ? OpenEye : CloseEye} alt="error" onClick={handlePasswordView} />
            </AuthS.AuthPasswordBtn>
        </AuthInputWrap>
        <AuthInputWrap style={{ height: "auto", minHeight: 56 }}>
          <AuthInputTitle>학번</AuthInputTitle>
          <S.SignupSchoolInputWrap>
            <S.SignupSchoolInput
              name="grade"
              value={signupData.grade== 0 ? "" : signupData.grade}
              onChange={handleSignupData}
              placeholder="학년"
              type="number"
            />
            <S.SignupSchoolInput
              name="room"
              value={signupData.room==0 ? "" : signupData.room}
              onChange={handleSignupData}
              placeholder="반"
              type="number"
            />
            <S.SignupSchoolInput
              value={signupData.number==0 ? "" : signupData.number}
              onChange={handleSignupData}
              name="number"
              placeholder="번호"
              type="number"
            />
          </S.SignupSchoolInputWrap>
        </AuthInputWrap>
      </SignupS.SignupInputForm>
      <SignupS.SignupPartButtonWrap>
        <SignupS.SignupPartButton
          direction="next"
          onClick={submitSignupDataFirst}
        >
          다음
          <SignupS.SignupPartButtonIcon>
            <FiChevronRight />
          </SignupS.SignupPartButtonIcon>
        </SignupS.SignupPartButton>
      </SignupS.SignupPartButtonWrap>
    </>
  );
};

export default React.memo(SignupFirst);

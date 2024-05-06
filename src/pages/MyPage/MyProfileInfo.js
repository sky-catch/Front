import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginState } from "../../States/LoginState";
import styled from "styled-components"

/**
 * 프로필 입력 화면
 * @author jimin 
 */
export default function MyProfileInfo () {
    const [user, setUser] = useRecoilState(LoginState);
    const [introduceLength, setIntroduceLength] = useState(0);

    /* Function : 자기 소개 개수 */
    const handleChange = (e) => {
        e.preventDefault();
        setIntroduceLength(e.target.value.length);
    };

    /* Function : 자기 정보 세팅 */
    const setUserInfo = () => {
        document.getElementsByName("displayName")[0].setAttribute("value", user.nickname);
        document.getElementsByName("introduce")[0].setAttribute("value", user.introduce);
    }

    /* Function : 닉네임 세팅 */
    useEffect(() => {
        setUserInfo();
        console.log(user);
    }, []);

    return(
        <>
            <MainContents className="main">
                <div className="my-account">
                    <div className="pt-[30px] mb-[30px]">
                        <div className="profile-pic-editor">
                            <div className="pic">
                                <div className="img"></div>
                            </div>
                            <button className="btn-edit">수정</button>
                        </div>
                    </div>
                    <div className="mb-[10px]">
                        <div className="container gutter-sm">
                            <div className="form-block mb-[24px]">
                                <div className="mb-[6px]"><label className="color-gray font-12">닉네임</label></div>
                                <input type="text" className="form-input" placeholder="닉네임을 입력해주세요." name="displayName"></input>
                            </div>
                            <div>
                                <div className="mb-[6px]"><label className="color-gray font-12">자기소개</label></div>
                                <textarea className="form-input" placeholder="자신을 알릴 수 있는 소개글을 작성해 주세요." 
                                    name="introduce" rows="3" maxLength="35" onChange={handleChange}></textarea>
                            </div>
                            <div className="color-gray text-[14px] __d-flex maxText"><span>{introduceLength}</span>/35자</div>
                            <div></div>
                        </div>
                        <hr/>
                        <div className="container gutter-sm"></div>
                    </div>
                </div>
                <div className="space-60">

                </div>
            </MainContents>
            <div className="sticky-bottom-btns">
                <button className="btn btn-lg btn-red">저장</button>
            </div>
        </>
    )
}

const MainContents = styled.main`
  padding-bottom: 48px;
  box-sizing: border-box;
  min-height: calc(100vh - 47px);
  margin-top: 47px;

  .profile-pic-editor {
    position : relative;
    margin : 0 auto;
    width : 96px;
  }
  .profile-pic-editor .pic .img {
    background :url("https://app.catchtable.co.kr/public/img/noimg/profile_default_v2.png") 50% 50% no-repeat;
    background-size : cover;
    width : 96px;
    height : 96px;
    display: block;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .profile-pic-editor .btn-edit {
    background : #fff url("https://app.catchtable.co.kr/public/img/icons/edit-b.svg") 50% 50% no-repeat;
    width : 20px;
    height : 20px;
    border-radius: 50%;
    text-indent: -999em;
    overflow: hidden;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    box-shadow: 1px 1px 4px #0000001a;
  }

  .maxText {
    justify-content : flex-end;
    margin-bottom : 9px;
  }
`
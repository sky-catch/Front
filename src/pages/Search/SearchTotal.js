import { useEffect } from "react";
import styled from "styled-components";

/**
 * 전체 검색
 * @author jimin
 */
export default function SearhTotal ({searchRes}) {
    console.log(searchRes.city);

    useEffect(() => {

    }, [searchRes])

    return(
        <ContentMain>
            <hr className="seperator" />
            <section>
                <div className="mt-[18]">
                    {/* 검색 전 : 최근검색 */}
                    { searchRes.city == undefined || searchRes.hotPlace == undefined ?
                    <div>
                        <div><h3>최근 검색어</h3></div>
                        <div></div>
                    </div>
                    : "" }
                    {/* 검색후 : 결과 O */}
                    <div>
                        {/* 1.지역 */}
                        { searchRes.city != undefined || searchRes.hotPlace != undefined ?
                            <section className="pt-[10px]">
                                <div className="container gutter-sm">
                                    <div className="form-block">
                                        <div className="form-block-header"><h2>지역</h2></div>
                                        <div className="form-block-body">
                                            { Object.entries(searchRes).map((item, idx) => {
                                                // 검색 결과 리스트업
                                                if ( (item[0] == "city" && item[1] != undefined ) || (item[0] == "hotPlace" && item[1] != undefined)) {
                                                    return (
                                                        <div className="searched-keyword-left-item">
                                                            <i className="icon"></i>
                                                            <div>{item[1]}</div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                         : "" }
                        {/* 2. 식당 */}
                        <hr />
                        <div></div>
                    </div>
                    {/* 검색후 : 결과 X */}
                    <div>
                        <div></div>
                    </div>
                </div>
            </section>
        </ContentMain>
    )
}

const ContentMain = styled.main`
    margin-top: 47px;
`;
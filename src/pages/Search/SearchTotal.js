import styled from "styled-components";

/**
 * 전체 검색
 * @author jimin
 */
export default function SearhTotal () {
    return(
        <ContentMain>
            <hr className="seperator" />
            <section>
                <div className="container gutter-sm mt-[18]">
                    {/* 검색 전 : 최근검색 */}
                    <div>
                        <div><h3>최근 검색어</h3></div>
                        <div></div>
                    </div>
                    {/* 검색후 */}
                    <div>
                        {/* 1.지역 */}
                        
                        {/* 2. 식당 */}
                    </div>
                </div>
            </section>
        </ContentMain>
    )
}

const ContentMain = styled.main`
    margin-top: 47px;
`;
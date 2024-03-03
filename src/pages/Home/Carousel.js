const slideItem = [
    {
        id : 0,
        url : "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/62a52aa955f949c589aae83ad0eb00c3"
    },
    {
        id : 1,
        url : "https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/077887ecd3fc4ba2a38c1d0e370b7d5f" 
    },
    {
        id : 2,
        url : "https://d3kzx7mqemhf0.cloudfront.net/common_img/comm_2422211081434326.webp" 
    },
]

export default function Carousel() {
    return (
        <section className="slider mb-[16px]">
            <div className="slide-container">
                <div className="slide-wrapper">
                    {slideItem.map((item) => {
                        return (
                            <div className="slide">
                                <a><img src={item.url}/></a>
                            </div>
                        )
                    })}
                </div>
                <div className="slide-pagination"></div>
            </div>
        </section>
    );
};
const restaurants = [
    {
        id : 0,
        img : "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
        name : '본디',
        meta : {
            star : 4.2,
            tags : '돼지고기구이 * 석촌'
        }
    },
    {
        id : 0,
        img : "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
        name : '본디',
        meta : {
            star : 4.2,
            tags : '돼지고기구이 * 석촌'
        }
    },
    {
        id : 0,
        img : "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
        name : '본디',
        meta : {
            star : 4.2,
            tags : '돼지고기구이 * 석촌'
        }
    },
    {
        id : 0,
        img : "https://ugc-images.catchtable.co.kr/catchtable/shopinfo/stwQPDWOYfWA52EG2k_1v2g/b435c102ae5d42ef8db5729ac781e208?small400",
        name : '본디',
        meta : {
            star : 4.2,
            tags : '돼지고기구이 * 석촌'
        }
    }
]

const Restaurants = () => {
    return (
        <div className="restaurant-list">
            {restaurants.map((item) => {
                return (
                    <div className="restaurant-list-item">
                        <a className="tb"><img src={item.img}></img></a>
                        <div className="detail">
                            <a className="btn-bookmark"></a>
                            <a>{item.name}</a>
                            <div className="meta">
                                <span>{item.meta.star}</span>
                                <span>{item.meta.tags}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Restaurants;
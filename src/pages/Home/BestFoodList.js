const foodList = [
    {
      id: 0,
      img_url:"https://toast-images.catchtable.co.kr/aaaaaqx/md/_0010_sushi_omakase.jpg?small200",
      title: "스시 오마카세",
    },
    {
      id: 1,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0009_hanwoo_omakase.jpg?small200",
      title: "한우 오마카세",
    },
    {
      id: 2,
      img_url: "https://image.toast.com/aaaaaqx/md_2022/diningbar.png?small200",
      title: "다이닝바",
    },
    {
      id: 3,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0008_beef.jpg?small200",
      title: "소고기 구이",
    },
    {
      id: 4,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0007_steak.jpg?small200",
      title: "스테이크",
    },
    {
      id: 5,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0006_korean_food.jpg?small200",
      title: "한식",
    },
    {
      id: 6,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0004_italian.jpg?small200",
      title: "이탈리안",
    },
    {
      id: 7,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0005_pasta.jpg?small200",
      title: "강남 역삼",
    },
    {
      id: 8,
      img_url: "https://image.toast.com/aaaaaqx/md/0706gangnam.jpg",
      title: "파스타",
    },
    {
      id: 9,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0003_japanese.jpg?small200",
      title: "일식",
    },
    {
      id: 10,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0002_french.jpg?small200",
      title: "프렌치",
    },
    {
      id: 11,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/_0001_brunch.jpg?small200",
      title: "브런치",
    },
    {
      id: 12,
      img_url: "https://toast-images.catchtable.co.kr/aaaaaqx/md/0706_chinese_food.jpg?small200",
      title: "중식",
    }
  ];
  
  export default function BestFoodList() {
    return (
      <div className="best-food-list">
        {foodList &&
          foodList.map((item, index) => {
            return (
              <a key={index} className="best-food-list-item">
                <span className="tb"><img src={item.img_url}></img></span>
                <span className="name">{item.title}</span>
              </a>
            );
          })}
      </div>
    );
  }
  
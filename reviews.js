// ===== LOAD DATA AN TOÀN =====
let storedReviews = JSON.parse(localStorage.getItem("reviews"));

let defaultReviews = [
    {name:"Trần Long",rating:5,comment:"Mình thật sự ấn tượng với hệ thống AI của website. Trước đây mỗi lần đặt lịch khám mình phải gọi điện rất mất thời gian, nhưng ở đây chỉ cần vài thao tác là hoàn tất. Hơn nữa, phần sàng lọc triệu chứng cũng khá chính xác, giúp mình hiểu rõ tình trạng sức khỏe trước khi đi khám. Giao diện cũng khá đẹp, dễ dùng và rất chuyên nghiệp."},
    {name:"Khánh Chi",rating:4,comment:"Mình sử dụng web để đặt lịch khám tổng quát và thấy trải nghiệm rất mượt. AI phân tích mức độ hài lòng cũng khá thú vị vì nó tổng hợp đánh giá theo thời gian thực, nếu cải thiện thêm tốc độ load ở một số trang thì sẽ hoàn hảo hơn. Nhìn chung mình rất hài lòng và sẽ tiếp tục sử dụng."},
    {name:"Hà My",rating:5,comment:"Điểm mình thích nhất là hệ thống tư vấn AI hoạt động 24/7, cực kỳ tiện lợi khi cần hỏi nhanh về triệu chứng sức khỏe, mình cảm giác như đang sử dụng một nền tảng y tế công nghệ cao vậy."},
    {name:"Huy Anh",rating:4,comment:"Thật sự bất ngờ vì đây là một hệ thống do học sinh phát triển mà lại chỉn chu đến vậy. Web giúp tiết kiệm rất nhiều thời gian và mang lại cảm giác an tâm, tôi thích nhất là phần AI nhắc lịch tái khám, nhờ vậy mà tôi dễ dàng track lịch của bản thân."},
    {name:"Khánh Diệp",rating:5,comment:"Tôi thích cầm nang kiến thức về y tế của website, nhờ đó mà tôi có thể hiểu rõ hơn về các bệnh cũng như dễ dàng phát hiện ra triệu chứng của mình liên quan đến bệnh gì."},
    {name:"Thanh Trà",rating:4,comment:"Trang web mang lại trải nghiệm khá chuyên nghiệp, mình đã thử đặt lịch cho gia đình và thấy quy trình rõ ràng, dễ hiểu. Phần giao diện hiện đại, màu sắc dễ chịu, chỉ mong sau này có thêm nhiều cơ sở y tế liên kết hơn nữa."}
];

let reviews = (storedReviews && storedReviews.length > 0)
    ? storedReviews
    : defaultReviews;

const container = document.getElementById("reviewsContainer");
const form = document.getElementById("reviewForm");
const ctx = document.getElementById("ratingChart");

function displayReviews(){
    container.innerHTML="";
    reviews.forEach(r=>{
        const div=document.createElement("div");
        div.className="review-card";
        div.innerHTML=`
            <h4>${r.name}</h4>
            <p>${"★".repeat(r.rating)}</p>
            <p>${r.comment}</p>
        `;
        container.appendChild(div);
    });
}

const chart=new Chart(ctx,{
    type:"bar",
    data:{
        labels:["1★","2★","3★","4★","5★"],
        datasets:[{
            data:[0,0,0,0,0],
            backgroundColor:"#4bbdff"
        }]
    }
});

function updateAnalytics(){
    const counts=[0,0,0,0,0];
    reviews.forEach(r=>counts[r.rating-1]++);
    chart.data.datasets[0].data=counts;
    chart.update();

    const total=reviews.length;
    const avg=reviews.reduce((a,b)=>a+b.rating,0)/total;

    document.getElementById("averageScore").innerText=
        `⭐ ${avg.toFixed(1)}/5 từ ${total} đánh giá`;

    if(avg>=4.5){
        aiInsightText.innerText="Người dùng cực kỳ hài lòng.";
    }else if(avg>=3.5){
        aiInsightText.innerText="Hệ thống hoạt động ổn định.";
    }else{
        aiInsightText.innerText="Cần cải thiện trải nghiệm.";
    }

    localStorage.setItem("reviews",JSON.stringify(reviews));
}

form.addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value;
    const rating=parseInt(document.getElementById("rating").value);
    const comment=document.getElementById("comment").value;

    reviews.push({name,rating,comment});
    form.reset();
    displayReviews();
    updateAnalytics();
});

function scrollToReviews(){
    document.getElementById("reviewsSection").scrollIntoView({behavior:"smooth"});
}

function scrollToForm(){
    document.getElementById("formSection").scrollIntoView({behavior:"smooth"});
}

displayReviews();
updateAnalytics();
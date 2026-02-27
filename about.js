const people = [
  {
    name: "Trương Tâm Đan",
    img: "images/Dan_image.jpg",
    desc: "Xin chào! Mình là Tâm Đan, học sinh đến từ K30 Anh 1 của THPT Chuyên Sơn La. Mình là người sáng lập chính của HealthCare Website, một dự án ứng dụng trí tuệ nhân tạo nhằm hỗ trợ sàng lọc triệu chứng và định hướng chăm sóc sức khoẻ thông minh."
  },
  {
    name: "Hoàng Thu Phương",
    img: "images/Phuong.jpg",
    desc: "Xin chào, mình là Hoàng Thu Phương, học sinh đến từ K30 Anh 1 của THPT Chuyên Sơn La. Mình phụ trách tìm kiếm thông tin và lên idea cho web, mục tiêu của mình là tạo ra một website thân thiện và dễ sử dụng, cũng như cung cấp đầy đủ các thông tin về y tế và dịch vụ cho mọi người."
  },
  {
    name: "Hà Việt Thành",
    img: "images/Thanh.jpg",
    desc: "Chào mọi người, mình là Hà Việt Thành, cũng là một học sinh đến từ K30 Anh 1 của THPT Chuyên Sơn La. Với dự án này, mình đảm nhiệm phần kỹ thuật cùng với Tâm Đan, mình chủ yếu làm phần tích hợp AI vào hệ thống. Mình mong muốn HealthCare Website sẽ mang lại công nghệ hỗ trợ y tế thông minh cho cộng đồng!."
  }
];

let currentIndex = 0;

function showPerson(index) {
  document.getElementById("aboutName").innerText = people[index].name;
  document.getElementById("aboutImg").src = people[index].img;
  document.getElementById("aboutDesc").innerText = people[index].desc;
}

function nextPerson() {
  currentIndex = (currentIndex + 1) % people.length;
  showPerson(currentIndex);
}

function prevPerson() {
  currentIndex = (currentIndex - 1 + people.length) % people.length;
  showPerson(currentIndex);
}
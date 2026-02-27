function toggleMyQuestions() {

  const panel = document.getElementById("myQuestionPanel");
  const overlay = document.getElementById("overlay");

  if (panel) panel.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// Khi vào trang sẽ load câu hỏi đã lưu
document.addEventListener("DOMContentLoaded", function () {
  loadQuestions();
});

// Gửi câu hỏi
function submitQuestion() {

  let questionText = document.getElementById("questionInput").value;
  let category = document.getElementById("category").value;

  if (questionText.trim() === "") {
    alert("Vui lòng nhập câu hỏi");
    return;
  }

  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  let newQuestion = {
    id: Date.now(),
    category: category,
    text: questionText,
    status: "pending",
    answer: ""
  };

  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));

  document.getElementById("questionInput").value = "";

  loadQuestions();
  simulateReply(newQuestion.id);
}


// Load câu hỏi
function loadQuestions() {

  let questionList = document.getElementById("questionList");
  let questions = JSON.parse(localStorage.getItem("questions")) || [];

  questionList.innerHTML = "";

  if (questions.length === 0) {
    questionList.innerHTML = "<p>Bạn chưa đặt câu hỏi nào.</p>";
    return;
  }


  questions.reverse().forEach(q => {

    let html = `
      <div class="question-card">
        <p><strong>Danh mục:</strong> ${q.category}</p>
        <p>${q.text}</p>
        ${q.status === "pending"
          ? "<p class='loading'>⏳ Bác sĩ đang phản hồi...</p>"
          : `
            <div class="answer-box">
              <img src="images/doctor.png" class="avatar">
              <p>${q.answer}</p>
            </div>
          `
        }
      </div>
    `;

    questionList.innerHTML += html;
  });
}


// Giả lập phản hồi sau 5 giây
function simulateReply(questionId) {

  setTimeout(() => {

    let questions = JSON.parse(localStorage.getItem("questions")) || [];

    questions = questions.map(q => {
      if (q.id === questionId) {
        q.status = "done";
        q.answer = "Bác sĩ tư vấn: Bạn nên theo dõi thêm và đi khám nếu triệu chứng kéo dài.";
      }
      return q;
    });

    localStorage.setItem("questions", JSON.stringify(questions));
    loadQuestions();

  }, 5000);
}
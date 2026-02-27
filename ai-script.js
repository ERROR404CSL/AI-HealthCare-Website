const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function addMessage(text, sender){
    const message = document.createElement("div");
    message.classList.add("message");

    if(sender === "user"){
        message.classList.add("user-message");
    } else {
        message.classList.add("bot-message");
    }

    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage(){
    const text = input.value.trim();
    if(text === "") return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {

        const lowerText = text.toLowerCase();
        let reply = "Tôi chưa nhận diện rõ triệu chứng. Bạn mô tả rõ hơn nhé.";

        // 🔴 Nguy hiểm cao
        if(
            lowerText.includes("đau ngực") ||
            lowerText.includes("khó thở") ||
            lowerText.includes("co giật") ||
            lowerText.includes("ngất")
        ){
            reply = "🔴 Nguy hiểm cao! Bạn nên đến bệnh viện ngay hoặc gọi 115.";
        }

        // 🟠 Nguy cơ cao
        else if(
            lowerText.includes("sốt cao") ||
            lowerText.includes("nôn liên tục") ||
            lowerText.includes("đau bụng dữ dội")
        ){
            reply = "🟠 Bạn nên đi khám trong hôm nay.";
        }

        // 🟡 Trung bình
        else if(
            lowerText.includes("sốt") ||
            lowerText.includes("ho") ||
            lowerText.includes("đau đầu") ||
            lowerText.includes("mệt mỏi")
        ){
            reply = "🟡 Theo dõi thêm 1-2 ngày hoặc đặt lịch khám.";
        }

        // 🟢 Nhẹ
        else if(
            lowerText.includes("mất ngủ") ||
            lowerText.includes("stress")
        ){
            reply = "🟢 Có thể do căng thẳng. Nghỉ ngơi và theo dõi thêm nhé.";
        }

        addMessage(reply, "bot");

    }, 700);
}

function quickAsk(text){
    input.value = text;
    sendMessage();
}

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

// Lời chào ban đầu
addMessage("Xin chào 👋 Tôi là AI Health Assistant. Bạn đang gặp vấn đề gì?", "bot");
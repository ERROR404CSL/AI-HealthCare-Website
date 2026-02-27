let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

function saveReminders(){
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

function addReminder(){

    const dateInput = document.getElementById("reminderDate").value;
    const resultBox = document.getElementById("resultBox");

    if(!dateInput){
        resultBox.innerHTML = "⚠️ Vui lòng chọn ngày.";
        return;
    }

    reminders.push(dateInput);
    saveReminders();
    renderReminders();

    resultBox.innerHTML = "✅ Đã lưu lịch tái khám!";
    document.getElementById("reminderDate").value = "";
}

function renderReminders(){

    const list = document.getElementById("reminderList");
    list.innerHTML = "";

    const today = new Date();
    let hasUrgent = false;

    reminders.forEach((date, index)=>{

        const selectedDate = new Date(date);
        const diff = Math.ceil((selectedDate - today) / (1000*60*60*24));

        let status = "";
        let color = "";

        if(diff < 0){
            status = "❌ Đã qua";
            color = "gray";
        }
        else if(diff === 0){
            status = "🔔 Hôm nay!";
            color = "red";
            hasUrgent = true;
        }
        else if(diff <= 3){
            status = `⚠️ Còn ${diff} ngày`;
            color = "orange";
            hasUrgent = true;
        }
        else{
            status = `📆 Còn ${diff} ngày`;
            color = "#4f46e5";
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <span style="color:${color}">
                ${selectedDate.toLocaleDateString("vi-VN")} - ${status}
            </span>
            <button class="delete-btn" onclick="deleteReminder(${index})">X</button>
        `;

        list.appendChild(li);
    });

    // 🔔 Notification khi mở web nếu có lịch ≤ 3 ngày
    if(hasUrgent){
        showNotification();
    }
}

function deleteReminder(index){
    reminders.splice(index,1);
    saveReminders();
    renderReminders();
}

function showNotification(){

    // Nếu trình duyệt hỗ trợ
    if("Notification" in window){

        if(Notification.permission === "granted"){
            new Notification("🔔 Bạn có lịch tái khám trong 3 ngày tới!");
        }
        else if(Notification.permission !== "denied"){
            Notification.requestPermission().then(permission=>{
                if(permission === "granted"){
                    new Notification("🔔 Bạn có lịch tái khám trong 3 ngày tới!");
                }
            });
        }
    }
    else{
        // fallback nếu không hỗ trợ
        alert("🔔 Bạn có lịch tái khám trong 3 ngày tới!");
    }
}

window.onload = function(){
    renderReminders();
};
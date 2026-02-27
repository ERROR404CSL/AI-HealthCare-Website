const slots = [
    "06:00 - 07:30",
    "08:00 - 09:30",
    "10:00 - 11:30",
    "13:00 - 14:30",
    "15:00 - 16:30",
    "16:30 - 17:30",
];

let selectedSlot = null;

function loadSlots(){

    const date = document.getElementById("bookingDate").value;
    const container = document.getElementById("calendarSlots");
    container.innerHTML = "";

    if(!date) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    slots.forEach(time => {

        const btn = document.createElement("button");
        btn.innerText = time;
        btn.classList.add("slot-btn");

        const isBooked = bookings.some(b => b.date === date && b.time === time);

        if(isBooked){
            btn.classList.add("disabled");
            btn.disabled = true;
        }

        btn.onclick = () => {
            document.querySelectorAll(".slot-btn")
            .forEach(b=>b.classList.remove("selected"));
        btn.classList.add("selected");
            selectedSlot = time;
            document.getElementById("bookingResult").innerHTML =
            `🕒 Bạn đã chọn khung giờ: <strong>${time}</strong>`;
        };

        container.appendChild(btn);
    });
}

document.getElementById("bookingDate").addEventListener("change", loadSlots);

function detectDepartment(symptom){

    const mapping = {
        "Tim mạch": ["tim", "đau ngực", "hồi hộp", "khó thở"],
        "Da liễu": ["da", "mụn", "ngứa", "nấm"],
        "Thần kinh": ["mất ngủ", "đau đầu", "co giật", "chóng mặt"],
        "Tiêu hóa": ["đau bụng", "tiêu chảy", "táo bón", "dạ dày"],
        "Nội tiết": ["tiểu đường", "tuyến giáp"],
        "Hô hấp": ["ho", "viêm phổi", "khò khè"],
        "Cấp cứu": ["ngất", "đột quỵ", "chảy máu nhiều"]
    };

    for(const dept in mapping){
        for(const keyword of mapping[dept]){
            if(symptom.includes(keyword)){
                return dept;
            }
        }
    }

    return "Tổng quát";
}

function confirmBooking(){

    const name = document.getElementById("patientName").value.trim();
    const symptom = document.getElementById("symptomBooking").value.trim().toLowerCase();
    const date = document.getElementById("bookingDate").value;

    if(!name || !symptom || !date || !selectedSlot){
        alert("Vui lòng điền đầy đủ thông tin và chọn giờ");
        return;
    }

    const department = detectDepartment(symptom);

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
        name,
        symptom,
        department,
        date,
        time: selectedSlot
    };

    bookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("latestBooking", JSON.stringify(newBooking));

    window.location.href = "booking-success.html";
}

function aiBookingSuggest(){

    const name = document.getElementById("patientName").value.trim();
    const symptom = document.getElementById("symptomBooking").value.trim().toLowerCase();
    const urgency = document.getElementById("urgencyBooking").value;
    const date = document.getElementById("bookingDate").value;

    if(!name || !symptom || !date){
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    const department = detectDepartment(symptom);

    let suggestedSlot;

    if(urgency === "urgent"){
        suggestedSlot = slots[0];
    } else {
        suggestedSlot = slots[Math.floor(Math.random()*slots.length)];
    }

    document.getElementById("bookingResult").innerHTML = `
        🤖 AI đề xuất:<br><br>
        🏥 Chuyên khoa: <strong>${department}</strong><br>
        🕒 Khung giờ gợi ý: <strong>${suggestedSlot}</strong>
    `;
}
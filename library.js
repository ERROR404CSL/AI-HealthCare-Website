const diseases = [
    "Áp xe",
    "Áp xe hậu môn",
    "ADN",
    "Bại liệt",
    "Bướu cổ",
    "Bạch hầu",
    "Béo phì",
    "Bướu nhân tuyến giáp",
    "Cơ xương khớp",
    "Cột sống",
    "Chạy thận nhân tạo",
    "Cúm A",
    "Cúm B",
    "Da liễu",
    "Dinh dưỡng",
    "Dịch hạch",
    "Đau ruột thừa",
    "Đau nửa đầu",
    "Gout",
    "Ghẻ",
    "Gãy xương",
    "Gam nhiễm mỡ",
    "Hô hấp",
    "Huyết học",
    "Ho gà",
    "Huyết áp thấp",
    "IVF",
    "Iod phóng xạ",
    "Kinh nguyệt không đều",
    "Lẹo mắt",
    "Lap phổi",
    "Liệt dây thần kinh số 7",
    "Men gan cao",
    "Mất ngủ",
    "Nấm da đầu",
    "Nội tiết",
    "Nâng cơ Hifu",
    "Ốm nghén",
    "Phục hồi chức năng",
    "Polyp hậu môn",
    "Parkinson",
    "Quai bị",
    "Rò luân nhĩ",
    "Rối loạn tiền đình",
    "Rối loạn đông máu",
    "Sản phụ khoa",
    "Suy dinh dưỡng",
    "Sỏi tiết niệu",
    "Thần kinh",
    "Thoái hoá cột sống cổ",
    "Tiêu hóa",
    "U tuyến nước bọt",
    "Ung thư máu",
    "Ung thư da",
    "Ung thư cổ tử cung",
    "Viêm thận lupus",
    "Virus Adeno",
    "Viêm phổi",
    "Xuất tinh ngược",
    "Xạ trị",
    "Xét nghiệm thai kỳ",
    "Y học cổ truyền",
    "Yếu sinh lý",
    "Zona thần kinh",
];

const alphabetContainer = document.getElementById("alphabet");
const container = document.getElementById("diseaseContainer");
const searchInput = document.getElementById("searchInput");

function removeVietnameseTones(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

function groupDiseases(list) {
    const grouped = {};

    list.forEach(name => {
        const letter = removeVietnameseTones(name.charAt(0)).toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(name);
    });

    return grouped;
}

function renderAlphabet() {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");
    alphabetContainer.innerHTML = "";

    letters.forEach(letter => {

        const span = document.createElement("span");
        span.innerText = letter;

        span.onclick = () => {

            document.querySelectorAll(".alphabet span")
                .forEach(s => s.classList.remove("active"));

            span.classList.add("active");

            const section = document.getElementById("section-" + letter);
            const noResult = document.getElementById("noResult");

            if (section) {
                noResult.style.display = "none";
                section.scrollIntoView({ behavior: "smooth" });
            } else {
                noResult.style.display = "block";
            }
        };

        alphabetContainer.appendChild(span); // ⚠️ DÒNG QUAN TRỌNG
    });
}

function renderDiseases(list) {
    container.innerHTML = "";
    const grouped = groupDiseases(list);

    Object.keys(grouped).sort().forEach(letter => {
        const section = document.createElement("div");
        section.className = "section";
        section.id = "section-" + letter;

        const letterBox = document.createElement("div");
        letterBox.className = "letter-box";
        letterBox.innerText = letter;

        const grid = document.createElement("div");
        grid.className = "disease-grid";

        grouped[letter].forEach(name => {
            const item = document.createElement("div");
            item.className = "disease-item";
            item.innerText = name;
            grid.appendChild(item);
        });

        section.appendChild(letterBox);
        section.appendChild(grid);
        container.appendChild(section);
    });
}

searchInput.addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = diseases.filter(d =>
        removeVietnameseTones(d.toLowerCase()).includes(removeVietnameseTones(keyword))
    );
    renderDiseases(filtered);
});

renderAlphabet();
renderDiseases(diseases);
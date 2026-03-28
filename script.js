// 1. Scholarship Data (Intha list-la neenga evvalavu venumnaalum sethukalam)
const scholarships = [
    { name: "Pragati Scholarship for Girls", gender: "female", maxIncome: 800000, state: "Tamil Nadu", type: "fresher", link: "#" },
    { name: "Post-Matric SC/ST Scholarship", gender: "all", maxIncome: 250000, state: "Tamil Nadu", type: "all", link: "#" },
    { name: "National Merit Scholarship", gender: "all", maxIncome: 600000, state: "All India", type: "continuing", link: "#" },
    { name: "Minority Pre-Matric Scholarship", gender: "all", maxIncome: 100000, state: "Kerala", type: "fresher", link: "#" }
];

// 2. Auto-Fill Feature (Oru sample profile-a fill pannum)
document.getElementById('auto-fill-btn').addEventListener('click', () => {
    document.getElementById('gender').value = "female";
    document.getElementById('course').value = "Engineering";
    document.getElementById('income').value = "200000";
    document.getElementById('community').value = "OBC";
    document.getElementById('state').value = "Tamil Nadu";
    document.getElementById('student-type').value = "fresher";
    alert("Profile Auto-filled!");
});

// 3. Main Filter Logic
document.getElementById('scholarship-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userIncome = parseInt(document.getElementById('income').value);
    const userGender = document.getElementById('gender').value;
    const userState = document.getElementById('state').value.toLowerCase();

    // Eligible Scholarships Filter
    const eligible = scholarships.filter(s => {
        const incomeMatch = userIncome <= s.maxIncome;
        const genderMatch = s.gender === "all" || s.gender === userGender;
        const stateMatch = s.state.toLowerCase() === "all india" || s.state.toLowerCase() === userState;
        return incomeMatch && genderMatch && stateMatch;
    });

    displayScholarships(eligible);
});

// 4. Results-a Screen-la kaata
function displayScholarships(results) {
    const container = document.getElementById('eligible-scholarships-container');
    container.innerHTML = ""; // Clear old results

    if (results.length === 0) {
        container.innerHTML = "<p class='text-danger'>No matching scholarships found for your profile.</p>";
        return;
    }

    results.forEach(s => {
        const card = `
            <div class="col">
                <div class="card h-100 shadow-sm border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success">${s.name}</h5>
                        <p class="card-text">Income Limit: ₹${s.maxIncome}</p>
                        <p class="card-text">State: ${s.state}</p>
                        <a href="${s.link}" class="btn btn-primary btn-sm">Apply Now</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

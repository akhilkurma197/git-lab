
// Add a student
document.getElementById("studentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        usn: document.getElementById("usn").value,
        semester: document.getElementById("semester").value,
        branch: document.getElementById("branch").value
    };

    const response = await fetch("/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    const data = await response.json();
    document.getElementById("message").textContent = data.message;
    event.target.reset();
});

// View all students
document.getElementById("viewBtn").addEventListener("click", async () => {
    const response = await fetch("/students");
    const students = await response.json();

    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.usn} - ${s.name} (${s.branch}, Sem ${s.semester})`;
        list.appendChild(li);
    });
});

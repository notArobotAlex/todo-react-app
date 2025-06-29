
document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function render() {
    root.innerHTML = `
      <div class="app">
        <h1>ToDo List</h1>
        <div class="input-group">
          <input id="taskInput" placeholder="Введите задачу..." />
          <button id="addBtn">Добавить</button>
        </div>
        <ul>
          ${tasks.map((task, index) => `
            <li>${task} <button data-index="${index}">Удалить</button></li>
          `).join("")}
        </ul>
      </div>
    `;

    document.getElementById("addBtn").onclick = () => {
      const input = document.getElementById("taskInput");
      if (input.value.trim()) {
        tasks.push(input.value.trim());
        input.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
      }
    };

    root.querySelectorAll("li button").forEach(btn => {
      btn.onclick = () => {
        const i = +btn.dataset.index;
        tasks.splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
      };
    });
  }

  render();
});

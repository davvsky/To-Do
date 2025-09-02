
  // Grab elements
  const taskList = document.querySelector(".task-list");
  const taskTemplate = document.querySelector("#task-item-template");
  const quickAddInput = document.querySelector("#quick-add-input");
  const quickAddBtn = document.querySelector('[data-action="quick-add"]');
  const emptyState = document.querySelector(".task-list__empty");
  const taskCount = document.querySelector(".task-count");

  let tasks = [];

  // Render function
  function renderTasks() {
    taskList.querySelectorAll(".task-item").forEach(el => el.remove());

    tasks.forEach(task => {
      const li = taskTemplate.content.cloneNode(true).querySelector("li");
      li.dataset.id = task.id;
      li.dataset.status = task.completed ? "done" : "active";
      li.setAttribute("aria-checked", task.completed);

      li.querySelector(".task-item__checkbox").checked = task.completed;
      li.querySelector(".task-item__title").textContent = task.title;

      // Checkbox toggle
      li.querySelector(".task-item__checkbox").addEventListener("change", e => {
        task.completed = e.target.checked;
        renderTasks();
      });

      // Delete action
      li.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks();
      });

      taskList.appendChild(li);
    });

    // Empty state
    emptyState.hidden = tasks.length > 0;

    // Counter
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} remaining`;
  }

  // Add task
  function addTask(title) {
    if (!title.trim()) return;
    tasks.push({ id: Date.now().toString(), title, completed: false });
    quickAddInput.value = "";
    renderTasks();
  }

  // Events
  quickAddBtn.addEventListener("click", () => addTask(quickAddInput.value));
  quickAddInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask(quickAddInput.value);
  });

  // Init
  renderTasks();

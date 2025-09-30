<img width="1206" height="601" alt="react drawio" src="https://github.com/user-attachments/assets/be9d08d0-788d-42c7-9669-fea8c643da71" />

### Description


- **App**
  - Renders `ToDoList`

- **ToDoList**
  - **State:** tasks[], error, isLoading
  - **Props:** none (root)
  - Passes `addTask` to `AddTaskForm`
  - Passes `task`, `onDelete`, `onChange` to each `ToDoItem`

- **AddTaskForm**
  - **Props:** addTask
  - **State:** taskTitle
  - Calls `addTask(title)` upward

- **ToDoItem**
  - **State:** isDone
  - **Props:** task, onDelete, onChange
  - Handles checkbox toggle (local state)
  - Calls `onDelete(id)` and `onChange(id, completed)` upward

- **Input**
  - **Props:** type, value, onChange, placeholder
  - No local state

- **Button**
  - **Props:** onClick, children
  - No local state

- **CheckBox**
  - **Props:** isChecked, handleCheckboxChange
  - No local state

- **Typography**
  - **Props:** variant, children
  - No local state

- **Loading**
  - No props or state

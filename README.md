<img width="2109" height="767" alt="reaact drawio" src="https://github.com/user-attachments/assets/2ce288a0-4b3d-4653-a0eb-c89b2fb2e641" />

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

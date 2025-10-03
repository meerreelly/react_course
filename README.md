<img width="2109" height="767" alt="reaact drawio" src="https://github.com/user-attachments/assets/2ce288a0-4b3d-4653-a0eb-c89b2fb2e641" />

### Description

### App
- Renders ToDoList as the root feature component without passing props directly. 

### ToDoList
- State: none locally; all UI state comes from useTodos hook (tasks, error, isLoading, searchTerm, page, size, isLoadingMore). 
- Props: accepts StyleInterface passthrough only. 
- Uses useTodos to provide data and actions: data (filtered tasks), error, isLoading, deleteTodo, addTodo, updateTodo, searchTerm, setSearchTerm, page, size, nextPage, prevPage, changeSize, isLoadingMore. 
- Passes addTask to AddTaskForm as addTodo(title). 
- Renders ToDoItem for each task with task, onDelete, onChange mapped to deleteTodo and updateTodo. 
- Renders SearchForm with searchTerm and setSearchTerm. 
- Renders Paginator with page, size, NextPage, PrevPage, ChangeSize, isLoadingMore. 
- Shows Loading when isLoading is true. 

### useTodos (hook)
- State: page (number), size (number), isLoadingMore (boolean), searchTerm (string). 
- Data fetching: useSWR to GET todos with query params page and limit; fetcher returns JSON. 
- Derived data: todos memoized by filtering server data by searchTerm (case-insensitive title includes). 
- Pagination: nextPage, prevPage (bounded at 1), changeSize resets page to 1. 
- isLoadingMore: set true when returned page length >= size. 
- Mutations:
  - addTodo(title): POST, then mutate with revalidate to refetch; optimistic list extension is not performed. 
  - updateTodo(todo): PUT by _id; optimistic map replace; no revalidate. 
  - deleteTodo(id): DELETE by _id; optimistic filter remove; revalidate and reset page to 1. 
- Notifications: toast success/error on each mutation. 

### AddTaskForm
- Props: addTask(title: string) and StyleInterface passthrough. 
- State: taskTitle (controlled input). 
- Behavior: handleSubmit trims, awaits addTask, then clears input. 
- Children: Input and Button, wrapped in Typography div. 

### ToDoItem
- Props: task (Task), onDelete?(id: string), onChange?(todo: Task), plus StyleInterface. 
- Local state: title (for inline edit), isEditing (toggle edit mode). 
- Behavior:
  - Toggle completed via CheckBox calls onChange with inverted completed. 
  - Edit flow: when editing, Input controls title; Save calls onChange with updated title and exits edit mode. 
  - Delete calls onDelete with task._id. 
- Styling: background depends on task.completed; shows line-through when completed. 

### SearchForm
- Props: searchTerm (string), setSearchTerm(term: string), plus StyleInterface. 
- State: none. 
- Behavior: controlled Input bound to searchTerm; Clear button sets empty string. 

### Paginator
- Props: page, size, NextPage, PrevPage, ChangeSize(newSize), isLoadingMore?, plus StyleInterface. 
- State: none. 
- Behavior: Previous disabled on first page; Next disabled when !isLoadingMore; size select invokes ChangeSize. 

### Loading
- Props/State: none; purely presentational spinner using Typography wrappers. 

### Button
- Props: onClick, children, disabled?, plus StyleInterface; no local state. 

### Input
- Props: type?, value?, onChange?, placeholder?, plus StyleInterface; no local state; returns native input. 

### CheckBox
- Props: isChecked, handleCheckboxChange, plus StyleInterface; no local state; renders native input[type="checkbox"]. 

### Typography
- Props: variant (React.ElementType), children, plus StyleInterface; no local state; renders Tag = variant with props.

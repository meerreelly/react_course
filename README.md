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

### Used Design Patterns

#### Core Patterns

**Custom Hook Pattern** - The `useTodos` hook serves as the central orchestrator for all data-related logic, encapsulating state management, API fetching with SWR, filtering, pagination, and mutations into a single reusable interface. This hook combines local state for `page`, `size`, `searchTerm`, and `isLoadingMore` with SWR's `data`, `error`, `isLoading`, and `mutate` to provide a unified API consumed by `ToDoList`. By isolating business logic outside components, it enhances reusability, testability, and separation of concerns, allowing presentational components to focus solely on rendering without handling data complexities.

**Container/Presentational Pattern** - The architecture divides responsibilities between stateful containers and stateless presentational components to promote modularity. `ToDoList` functions as the container, integrating the `useTodos` hook for data orchestration and passing filtered data and callbacks as props to child components. Presentational components like `ToDoItem`, `AddTaskForm`, `SearchForm`, and `Paginator` receive props for rendering and interactions without accessing state or API details, enabling easier styling, reuse, and isolated testing.

**Unidirectional Data Flow** - Data flows downward from parent to child via props, while updates propagate upward through callback functions to maintain predictability. In `ToDoList`, props like `tasks`, `searchTerm`, and handlers (`addTodo`, `deleteTodo`, `updateTodo`) cascade to `ToDoItem` and other children; interactions in `ToDoItem` (e.g., checkbox toggle or delete) invoke callbacks that trigger mutations in `useTodos`. This pattern avoids direct state mutation in children, centralizes updates in the hook, and simplifies debugging by enforcing clear ownership.

**Component Composition Pattern** - The UI is built by assembling small, focused components into cohesive structures for better maintainability. `ToDoList` composes `SearchForm` for text filtering, `AddTaskForm` for input handling, a mapped list of `ToDoItem` for rendering items, and `Paginator` for navigation; each handles a single concern like editing in `ToDoItem` or pagination controls in `Paginator`. Reusable primitives such as `Button`, `Input`, `CheckBox`, and `Typography` are composed with props for variants, ensuring consistent styling and incremental development.

#### Feature-Specific Patterns

**Optimistic UI Updates** - Mutations use SWR's `mutate` function to immediately update the local cache before server confirmation, providing responsive feedback. In `addTodo`, `updateTodo`, and `deleteTodo` within `useTodos`, the callback filters or maps the current data array optimistically, followed by API calls and revalidation; `rollbackOnError: true` restores the prior state on failure. This approach reduces perceived latency for actions like deletions or additions, with toast notifications for success/error, while maintaining consistency through revalidation.

**Conditional Rendering** - Components render dynamically based on state using ternary operators and early returns to adapt to conditions without multiple variants. `ToDoList` displays `Loading` during `isLoading`, an error message on `error`, or maps `ToDoItem` over `tasks` otherwise; `ToDoItem` toggles between an `Input` for editing and a `Typography` span for display based on `isEditing`. `Paginator` disables buttons conditionally via `disabled` props. This keeps UIs adaptive to loading, errors, and interactions like filtering or pagination changes.

**State Colocation** - State is placed at the optimal level based on scope: global data like the todos array and pagination is managed in `useTodos` via SWR and local state, while UI-specific state remains in components. `ToDoItem` colocates `title` and `isEditing` for inline editing to avoid prop drilling; `AddTaskForm` and `SearchForm` manage their input values locally with `useState`. This minimizes re-renders, as changes to local state (e.g., typing in `Input`) only affect the relevant subtree, improving performance for interactive elements.

**Derived State with useMemo** - Computed values are memoized to prevent unnecessary recalculations on re-renders. In `useTodos`, `todos` derives from `data` filtered by `searchTerm` using `useMemo` with dependencies `[data, searchTerm]`, ensuring filtering only recomputes when inputs change. This optimization is essential for handling search across paginated data without degrading performance during frequent updates like typing or page navigation.

**Effect Synchronization** - `useEffect` hooks align side effects with state dependencies for seamless behavior. In `useTodos`, a `useEffect` updates `isLoadingMore` when `data` or `size` changes, enabling dynamic `Next` button enabling in `Paginator`. Toast notifications in mutations provide user feedback post-update. These effects ensure declarative coordination, such as resetting pagination or focusing inputs, without manual imperative code in render paths.

**Compound Component Pattern (UI)** - Reusable UI elements like `Button`, `Input`, `CheckBox`, and `Typography` act as configurable primitives via props for flexibility. `Button` accepts `onClick`, `disabled`, `children`, and styling props for variants (e.g., green for add, red for delete); `Input` handles `type`, `value`, `onChange`, and `placeholder`. `Typography` uses `variant` as a polymorphic tag for semantic rendering. This centralizes styling and behavior, promoting consistency across forms, lists, and controls while allowing customization through the `StyleInterface`.

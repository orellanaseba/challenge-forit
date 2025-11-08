import { Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/taskList" replace />}></Route>
      <Route path="/taskList" element={<TaskList />}></Route>
      <Route path="/taskItem/:id" element={<TaskItem />}></Route>
      <Route path="/taskForm/edit/:id" element={<TaskForm />}></Route>
      <Route path="/taskForm/create/" element={<TaskForm />}></Route>
    </Routes>
  )
}

export default App

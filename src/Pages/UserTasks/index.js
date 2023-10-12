import "./UserTasks.css";
import Task from "../../components/Task";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Services/FirebaseConfig";

function UserTasks() {
  const url = process.env.REACT_APP_API_URL;
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");
  const [logedUserId, setLogedUserId] = useState(
    localStorage.getItem("userid")
  );
  const navegate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userid")) {
      setLogedUserId(localStorage.getItem("userid"));
      console.log(logedUserId);

      get();
    }
  }, []);

  const logout = async () => {
    await signOut(auth).then(() => {
      alert("usuario desconectado");
    });
    localStorage.removeItem("userid");
    navegate("/");
  };

  const get = async () => {
    try {
      const apiTasks = await axios.get(`${url}${logedUserId}`);
      setTasks(apiTasks.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlesubimit = () => {
    if (!content) {
      console.log("vazio");
      alert("Campo Vazio");

      return;
    }
    console.log(content);
    postTask();

    setContent("");
  };

  const postTask = async () => {
    const userid = localStorage.getItem("userid");

    await axios.post(url, {
      content: content,
      status: "pedente",
      userId: userid,
      createdAt: Date.now(),
    });
    get();
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${url}${taskId}`);
      get(); // Refresh tasks after deleting
    } catch (e) {
      console.log(e);
    }
  };

  const CompleteTask = async (taskId) => {
    const indexTask = tasks.findIndex((task) => task._id === taskId);

    if (indexTask !== -1) {
      tasks[indexTask].status = tasks[indexTask].status === "complete" ? "pendente" : "complete";

      try {
        await axios.patch(`${url}${taskId}`, {
          status: tasks[indexTask].status,
        });
        get();
        
      } catch (e) {
        console.log(e);
      }
    }
  };

  const tasksList = tasks.map((task) => (
    <Task
      key={task._id}
      obj={task}
      deletetask={deleteTask}
      completetask={CompleteTask}
    ></Task>
  ));

  return (
    <main className="main-tasks">

      <div className="top-interacts">
        <button className="btn-b" onClick={logout}> Logout</button>
      </div>

      <div className="add-task">
        <input value={content}placeholder="Tarefa"onChange={(e) => setContent(e.target.value)} ></input>
        <button type="button" className="btn-b" onClick={handlesubimit}> Adiciona</button>
      </div>

      <section className="work-content">
        <ul>{tasksList}</ul>
      </section>
    </main>
  );
}

export default UserTasks;

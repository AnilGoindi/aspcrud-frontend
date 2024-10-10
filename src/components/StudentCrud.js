import { useEffect, useState } from "react";

function StudentCrud() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await fetch("https://localhost:7023/api/Student/GetStudent"); // get student info
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7023/api/Student/AddStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stname: stname,
          course: course,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      alert("Student Registration Successfully");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (err) {
      alert("Error saving student: " + err.message);
    }
  }

  async function editStudent(student) {
    setName(student.stname);
    setCourse(student.course);
    setId(student.id);
  }

  async function DeleteStudent(id) {
    try {
      const response = await fetch("https://localhost:7023/api/Student/DeleteStudent/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      alert("Student deleted Successfully");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (error) {
      alert("Error deleting student: " + error.message);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:7023/api/Student/UpdateStudent/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          stname: stname,
          course: course,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update registration");
      }

      alert("Registration Updated");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (err) {
      alert("Error updating student: " + err.message);
    }
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
            <label>Student Name</label>
            <input
              type="text"
              className="form-control"
              id="stname"
              value={stname}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              className="form-control"
              id="course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map((student) => (
          <tbody key={student.id}>
            <tr>
              <th scope="row">{student.id}</th>
              <td>{student.stname}</td>
              <td>{student.course}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editStudent(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default StudentCrud;

import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "",
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  addTask(event) {
    if (this.state._id) {
      fetch(`/api/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({
            html: "Task edited!",
          });
          this.setState({
            title: "",
            description: "",
            _id: "",
          });
          this.fetchTasks();
        })
        .catch();
    } else {
      fetch("/api/", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return console.log(res);
        })
        .then((data) => {
          console.log(data);
          M.toast({
            html: "Task saved",
          });
          this.setState({
            title: "",
            description: "",
          });
          this.fetchTasks();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    event.preventDefault();
  }

  fetchTasks() {
    fetch("/api/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          tasks: data,
        });
        console.log(this.state.tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteTask(id) {
    // console.log(id);
    if (confirm("Are you sure you want to delete it?")) {
      fetch(`/api/${id}`, {
        method: "DELETE",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          M.toast({
            html: "Task Deleted",
          });
          this.fetchTasks();
        })
        .catch((err) => console.error(err));
    }
  }

  editTask(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue dark-4">
          <div className="container">
            <a className="brand-logo" href="/">
              M.E.R.N Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                      <div className="input-field col s12">
                        <textarea
                          value={this.state.description}
                          onChange={this.handleChange}
                          name="description"
                          className="materialize-textarea"
                          placeholder="Task Description"></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            onClick={() => {
                              this.editTask(task._id);
                            }}
                            className="waves-effect waves-light btn light-blue">
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            onClick={() => {
                              this.deleteTask(task._id);
                            }}
                            className="waves-effect waves-light btn light-blue">
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

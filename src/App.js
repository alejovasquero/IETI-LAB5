import './App.css';
import React from 'react';
import Login from './users/Login.js';
import Tasks from './tasks/Tasks.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskCreator from './tasks/TaskCreator.js';
import UserProfile from './users/UserProfile';
const LoginView = () => (
  <Login />
);


class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      iisLoggedIn: false, tasks: [{
        description: "test task",
        responsible: {
          name: "david",
          email: "david@example.com"
        },
        status: "Ready",
        dueDate: new Date()
      }], user: {
        name: "", email: "", password: ""
      }
    };
    this.saveCredentials = this.saveCredentials.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleUserConfig = this.handleUserConfig.bind(this);
  }

  componentDidMount() {
    this.saveCredentials();
    this.checkAuthentication();
  }

  saveCredentials() {
    let name = localStorage.getItem('username');
    let pass = localStorage.getItem('password');
    console.log(1)
    if (!(name && pass)) {
      localStorage.setItem('username', 'david');
      localStorage.setItem('password', 'vasquez');
    }
    console.log(2)
    let config = {
      name: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      email: "david@example.com"
    }
    console.log(3)
    this.setState({ user: config });
  }

  addTask(task) {
    console.log(JSON.stringify(task))
    this.setState(prevState => {
      const tasks = prevState.tasks.concat(task);
      return {
        tasks
      }
    });
  }

  checkAuthentication() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      this.setState({
        isLoggedIn:
          JSON.parse(loggedIn) === true ? true : false
      }, () => { console.log(this.state.isLoggedIn) });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }


  handleUserConfig(config) {
    this.setState({ user: config });
    localStorage.setItem('username', config.name);
    localStorage.setItem('password', config.password);
  }

  render() {

    const TasksCreator = () => (

      <TaskCreator
        onTaskAddition={this.addTask}
      />
    )

    const TasksView = () => (
      <Tasks tasks={this.state.tasks} user={this.state.user} />
    );

    const UserProfileComponent = () => (
      <UserProfile onConfigSubmit={this.handleUserConfig}></UserProfile>
    );

    return (
      <div className="App">
        <Router>

          <Switch>
            <Route exact path="/" component={LoginView} />
            {

              this.state.isLoggedIn &&
              <div>
                <Route exact path="/tasks" component={TasksView} />
                <Route exact path="/create" component={TasksCreator} />
                <Route exact path="/user" component={UserProfileComponent} />
              </div>


            }

            {

              !this.state.isLoggedIn && <div>NOT AUTHENTICATED</div>
            }

          </Switch>

        </Router>

      </div>
    );
  }
}

export default App;

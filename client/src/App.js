import React, { Component } from "react";
import axios from "axios";
import { serverUrl, regEx } from "./config";

class App extends Component {
  state = {
    url: "",
    shortId: "",
    history: []
  };

  componentDidMount() {
    this.loadLocalStorage();
  }

  handleChange = e => {
    this.setState({ url: e.target.value });
  };

  handleSubmit = e => {
    const url = this.state.url;
    this.validateUrl(url) ? this.saveUrl() : console.log("Wrong URL...");
    this.setState({ url: "" });
    e.preventDefault();
  };

  validateUrl(url) {
    return regEx.test(url);
  }

  loadLocalStorage() {
    const history = JSON.parse(localStorage.getItem("urlHistory")) || [];
    this.setState({ history });
  }

  addToLocalStorage() {
    const history = this.state.history;
    if (history.length >= 10) {
      history.shift();
    }
    localStorage.setItem("urlHistory", JSON.stringify(history));
  }

  saveUrl = () => {
    axios
      .post("http://localhost:3001/create", {
        url: this.state.url
      })
      .then(res => {
        const link = {
          _id: res.data.body._id,
          shortId: res.data.body.shortId,
          url: res.data.body.url
        };
        this.setState(
          { currentUrl: link, history: [...this.state.history, link] },
          () => {
            this.addToLocalStorage();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { url, history } = this.state;

    const renderHistory = history.map(link => {
      return (
        <li key={link._id}>
          <a href={`${serverUrl}/${link.shortId}`}>
            {link === history[history.length - 1]
              ? `${serverUrl}/${link.shortId}`
              : link.url}
          </a>
        </li>
      );
    });

    return (
      <main>
        <section>
          <h2>Simplify life, use short urls.</h2>
        </section>
        <section>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={url}
              onChange={this.handleChange}
              placeholder="Paste URL to shorten..."
            />
            <input type="submit" value="Shorten" />
          </form>
        </section>
        <section>
          <ul className="result">{renderHistory.reverse()}</ul>
        </section>
      </main>
    );
  }
}

export default App;

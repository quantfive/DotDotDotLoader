import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { DotDotDotLoader } from 'react-dotdotdotloader';
import DotDotDotLoader from './node_modules/components/DotDotDotLoader/DotDotDotLoader'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 3,
      interval: 500,
      show: false,
      repeat: false,
    }
  }

  amountOnChange = (e) => {
    this.setState({
      amount: parseInt(e.target.value, 10)
    })
  }

  intervalOnChange = (e) => {
    this.setState({
      interval: parseInt(e.target.value, 10)
    })
  }

  repeatOnChange = (e) => {
    this.setState({
      repeat: e.target.checked
    })
  }

  showOnChange = (e) => {
    this.setState({
      show: e.target.checked
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-dotdotdotloader</h1>
        </header>
        <div className="bodyContainer">
          <div className="inputContainer">
            <div className="input">
              <label>Amount</label>
              <input 
                className="optionTextInput" 
                id="amount" 
                value={this.state.amount} 
                type="number" 
                step="1"
                onChange={this.amountOnChange}
              />
            </div>
            <div className="input">
              <label>Interval</label>
              <input 
                className="optionTextInput" 
                id="interval"
                value={this.state.interval}
                type="number"
                step="1"
                onChange={this.intervalOnChange}
              />
            </div>
            <div className="input">
              <label>Repeat</label>
              <label className="switch">
                <input 
                  type="checkbox"
                  id="repeat"
                  value={this.state.repeat}
                  onChange={this.repeatOnChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="input">
              <label>Show</label>
              <label className="switch">
                <input
                  type="checkbox"
                  id="show"
                  value={this.state.show}
                  onChange={this.showOnChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="textContainer">
            <div className="noStyle">
              No text styles
              <DotDotDotLoader
                amount={this.state.amount}
                interval={this.state.interval}
                repeat={this.state.repeat}
                show={this.state.show}
              />
            </div>
            <div className="redStyle">
              Bigger font and red font color
              <DotDotDotLoader
                amount={this.state.amount}
                interval={this.state.interval}
                repeat={this.state.repeat}
                show={this.state.show}
              />
            </div>
            <div className="greenStyle">
              dotdotdotloader can have its own styles
              <span className="dotStyle">
                <DotDotDotLoader
                  amount={this.state.amount}
                  interval={this.state.interval}
                  repeat={this.state.repeat}
                  show={this.state.show}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

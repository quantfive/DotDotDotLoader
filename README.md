## react-dotdotdotloader
[![Version](http://img.shields.io/npm/v/react-dotdotdotloader.svg)](https://www.npmjs.com/package/react-dotdotdotloader)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-dotdotdotloader.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-dotdotdotloader

![Alt text](https://image.ibb.co/ew7qr5/in2.gif "Ellipsis Loader")

An ellipsis loader for React. You can set the time in between the next dot appears and the number of dots that appear.

## Demo
http://craiglu.react-dotdotdotloader.hellodeploy.com

## Installation
```sh
npm install react-dotdotdotloader
```

## Usage
**Using NPM**

1 . Require react-dotdotdotloader after installation

```js
import { DotDotDotLoader } from 'react-dotdotdotloader'
```

2 . Include react-dotdotdotloader component


```js
<DotDotDotLoader />
```

3 . Customize options

```js
<DotDotDotLoader 
  amount={3}
  show={this.state.showLoader}
  interval={500}
  repeat={true}
/>
```

## Options
Option|Type	|  Description
|:---|:---|:---
 amount	|  Integer  | Max number of dots to display. (Default is 3)
 show	|  Boolean  | `True` will show the loader and `false` will hide the loader. (Required to show and hide loader)
 interval |  Integer  | The number of ms between each dot appearing. (Default is 500)
 repeat |  Boolean  | `True` will have the loader loop from one dot to the `amount`. If `false` loader will not loop and ignore `amount`, adding dots indefinitely until `show` is `false` (Default is true)

## Styles
react-dotdotdotloader will inherit any styles from its parent container. This allows the loader to have the same style as other components in the same contianer or have its own style. Use the same css properties as if you were changing text styling to change the look of the dots. See [live demo](http://craiglu.react-dotdotdotloader.hellodeploy.com/) for example.

1 . No text styling

 HTML
 ```html
 <div className="noStyle">
  No text styles
  <DotDotDotLoader
    amount={this.state.amount}
    interval={this.state.interval}
    repeat={this.state.repeat}
    show={this.state.show}
  />
 </div>
 ```

 CSS
 ```css
.noStyle {
	margin-bottom: 50px;
}
 ```
2 . Bigger font and red color

 HTML
 ```html
<div className="redStyle">
  Bigger font and red font color
  <DotDotDotLoader
    amount={this.state.amount}
    interval={this.state.interval}
    repeat={this.state.repeat}
    show={this.state.show}
  />
</div>
 ```

 CSS
 ```css
.redStyle {
	margin-bottom: 50px;
	font-size: 20px;
	color: #e53030;
}
 ```

3 . dotdotdotloader can have its own styles

 HTML
 ```html
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
 ```

 CSS
 ```css
.greenStyle {
	color: #63ba1b;
}
.dotStyle {
	font-size: 100px;
	color: #a22dbc;
}
 ```

## react-dotdotdotloader

![Alt text](https://image.ibb.co/ew7qr5/in2.gif "Ellipsis Loader")

An ellipsis loader for React. You can set the time in between the next dot appears and the number of dots that appear.


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
 interval |  Integer  | the number of `ms` between each dot appearing. (Default is 500)
 repeat |  Boolean  | `True` will have the loader loop from one dot to the `amount`. If `false` loader will not loop and ignore `amount`, adding dots indefinitely until 'show' is 'false' (Default is true)

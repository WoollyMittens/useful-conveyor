# conveyor.js: Flexible Product Carousel

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

A lightweight slideshow and product slider that adapts to various screen sizes.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/conveyor.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/conveyor.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/conveyor.js'
], function(Conveyor) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {Conveyor} from "js/conveyor.js";
```

## How to start the script

```javascript
var conveyor = new Conveyor({
	'control': document.querySelector('.conveyor-controls'),
	'carousel': document.querySelector('.conveyor-items')
});
```

**control : {dom node}** - The container in which the navigation buttons will be inserted.

**carousel : {dom node}** - The container of the slides.

## How to control the script

### next

```javascript
carousel.next();
```

Shows the next slide.

### prev

```javascript
carousel.previous();
```

Shows the prevous slide.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).

// ====== The State ==================================================


// Represents the area in which the user can draw.
class Picture {
    // Defines the attributes of the Picture.
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }
    // Creates an array representing the pixels and applys the starting color (grey).
    static empty(width, height, color) {
        let pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }
    // Finds the color of the pixel stored at the calculated index (x, y)
    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }
    // Returns a new Picture, but with updated pixel data as the user draws.
    draw(pixels) {
        let copy = this.pixels.slice();
        for (let {x, y, color} of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}

// Returns a new state object, merging the current state and the changes from the action.
function updateState(state, action) {
    return Object.assign({}, state, action);
};


// ====== The DOM (Document, Object, Model) ==================================================


// Creates a DOM element of the given type, assigns the given properties to it, 
// and appends the given children to it (elements and text nodes)
function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);

    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
};


// ====== The Canvas ==================================================


// Defines how large our pixels will be. 
// (In this case 10 pixels x 10 pixels)
const scale = 10;

// Responsible for creating the canvas and redraws the canvas whenever it changes.
// Sets up the user input for the canvas.
class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });
        this.syncState(picture);
    }
    syncState(picture) {
        if (this.picture == picture) return;

        if (this.picture) {
            drawPicture(picture, this.dom, scale, this.picture);
        } else {
            drawPicture(picture, this.dom, scale);
        }
        this.picture = picture;
    }
}

// Renders the changes to the Picture to visually reflect the pixel data
function drawPicture(picture, canvas, scale, previousPicture) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            // The pixel will only be drawn if it is different from the previous picture.
            // Before it would just redraw the entire picture.
            if (!previousPicture || picture.pixel(x, y) !== previousPicture.pixel(x, y)) {
                cx.fillStyle = picture.pixel(x, y);
                cx.fillRect(x * scale, y * scale, scale, scale);
            }
        };
    };
}

// Lets the user hold down left click in order to draw lines.
// Checks whether or not the user is holding down left click and either removes or adds an eventListener.
PictureCanvas.prototype.mouse = function(downEvent, onDown) {
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = moveEvent => {
        if (moveEvent.buttons == 0) {
            this.dom.removeEventListener("mousemove", move);
        } else {
            let newPos = pointerPosition(moveEvent, this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) return;
            pos = newPos
            onMove(newPos);
        }
    };
    this.dom.addEventListener("mousemove", move);
};

// Calculates the position of the pixel where an event occurred.
// (Were the user makes changes)
function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale)
    };
};

// Does the same thing as the "prototype.mouse", but for touch screens.
PictureCanvas.prototype.touch = function (startEvent, onDown) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = moveEvent => {
        let newPos = pointerPosition(moveEvent.touches[0], this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
    };
    let end = () => {
        this.dom.removeEventListener("touchmove", move);
        this.dom.removeEventListener("touchend", end);
    };
    this.dom.addEventListener("touchmove", move);
    this.dom.addEventListener("touchend", end);
};


// ====== The Application ==================================================


// This is the container in which all of the components go into.
// It holds the canvas, tools, and updates the state and UI.
class PixelEditor {
    constructor(state, config) {
        let {tools, controls, dispatch} = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) {
                return pos => onMove(pos, this.state);
            };
        });
        this.controls = controls.map(
            Control => new Control(state, config));
        this.dom = elt("div", {tabIndex: 0}, this.canvas.dom, elt("br"), 
                        ...this.controls.reduce(
                            (a, c) => a.concat(" ", c.dom), []));
    }
    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) {
            ctrl.syncState(state);
        }
    }
}


// Creates a dropdown select menu listing the available tools.
// Updates the state to reflect the tool the user has chosen.
class ToolSelect {
    constructor(state,  {tools, dispatch}) {
        this.select = elt("select",  {
            id: "tools",
            onchange: () => dispatch({tool: this.select.value})
        }, ...Object.keys(tools).map(name => elt("option", {
            selected: name == state.tool
        }, name)));
        this.dom = elt("label", null, "Tool: ", this.select);
    }
    syncState(state) {
        this.select.value = state.tool;
    }
}


// Creates an element using the browser's built in color picker.
// Updates the state to reflect the chosen color.
class ColorSelect {
    constructor(state, {dispatch}) {
        this.input = elt("input", {
            type: "color",
            value: state.color, 
            onchange: () => dispatch({color: this.input.value})
        });
        this.dom = elt("label", null, "Color!: ", this.input);
    }
    syncState(state) {
        this.input.value = state.color;
    }
}


// ====== The Drawing Tools ==================================================


// This is where the a pixel the user clicks actually changes.
// Dispatch and action to update the pictuer with the new data.
function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
        let drawn = {x, y, color: state.color};
        dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
}


// Allows the user to click and drag to select a rectangular area of pixels.
// Pushes each pixel and the color into an array that fills out the rectangle area.
function rectangle(start, state, dispatch) {
    function drawRectangle(pos) {
        let xStart = Math.min(start.x, pos.x);
        let yStart = Math.min(start.y, pos.y);
        let xEnd = Math.max(start.x, pos.x);
        let yEnd = Math.max(start.y, pos.y);
        let drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({x, y, color: state.color});
            }
        }
        dispatch({picture: state.picture.draw(drawn)});
    }
    drawRectangle(start);
    return drawRectangle;
}


// Defines the four directions adjacent to a given pixel.
const around = [
    {dx: -1, dy: 0}, // left
    {dx: 1, dy: 0}, // right
    {dx: 0, dy: -1}, // up
    {dx: 0, dy: 1} // down
];


// Calculates all of the pixels in one area of the same color and adds them to an array.
// Changes all of the array's pixels to the selected color.
function fill({x, y}, state, dispatch) {
    let targetColor = state.picture.pixel(x, y);
    let drawn = [{x, y, color: state.color}];
    for (let done = 0; done < drawn.length; done++) {
        for (let {dx, dy} of around) { // Here's where we use the directions defined by the "around" variable.
            let x = drawn[done].x + dx, y = drawn[done].y + dy;
            if (x >= 0 && x < state.picture.width &&
                y >= 0 && y < state.picture.height &&
                state.picture.pixel (x, y) == targetColor &&
                !drawn.some(p => p.x == x && p.y == y)) {
                drawn.push({x, y, color: state.color});
                }
            }
        }
    dispatch({picture: state.picture.draw(drawn)});
}


// Simply changes the selected color to that of a pixel that has been selected.
// An eyedropper tool, essentially.
function pick(pos, state, dispatch) {
    dispatch({color: state.picture.pixel(pos.x, pos.y)});
}


// ====== Saving and Loading ==================================================


// Lets the user save their art to a PNG file.
// Creates a temporary canvas and draws the picture onto it at a 1:1 scale.
// Creates a download link with the image data and then clicks the link.
class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt("button", {
            onclick: () => this.save()
        }, "SAVE");
    }
    save() {
        let canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        let link = elt("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state) { this.picture = state.picture}
}


// Creates an element (Button) labeled "LOAD IMAGE".
// Calls the startLoad function.
class LoadButton {
    constructor(_, {dispatch}) {
        this.dom = elt("button", {
            onclick: () => startLoad(dispatch)
        }, "LOAD IMAGE")
    }
    syncState() {}
}


// Creates an file input and clicks it.
// I do this because I wanted my LOAD IMAGE input to look like a button.
// The button triggers the creation and clicking of the input.
function startLoad(dispatch) {
    let input = elt("input", {
        type: "file", 
        onchange: () => finishLoad(input.files[0], dispatch)
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
}


// Grabs the selected image.
// Reads the file as a data URL and loads it into an image element.
// Calls the pictureFromImage function.
function finishLoad(file, dispatch) {
    if (file ==  null) return;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        let image = elt("img", {
            onload: () => dispatch({
                picture: pictureFromImage(image)
            }),
            src: reader.result
        });
    });
    reader.readAsDataURL(file);
}


// Creates a canvas and draws the loaded image onto it.
// Grabs and converts the image data into usable information (Each pixels color as a hex string).
function pictureFromImage(image) {
    let width = Math.min(100, image.width);
    let height = Math.min(100, image.height);
    let canvas = elt("canvas", {width, height});
    let cx = canvas.getContext("2d");
    cx.drawImage(image, 0, 0);
    let pixels = [];
    let {data} = cx.getImageData(0, 0, width, height);

    function hex(n) {
        return n.toString(16).padStart(2, "0");
    }

    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3);
        pixels.push("#" + hex(r) + hex(g) + hex(b));
    }
    return new Picture(width, height, pixels)
}


// ====== Undo History ==================================================


// Keeps track of the history of the picture.
// It restores the last picture in history if theres are any.
// If at least 1 second has passed in between changes, it adds the new picture to history.
// Otherwise it updates the state with the current action.
function historyUpdateState(state, action) {
    if (action.undo == true) {
        if (state.done.length == 0) return state;
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        });
    } else if (action.picture && 
            state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, action, {
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        });
    } else {
        return Object.assign({}, state, action);
    }
}


// Creates an element (button) used to undo an action.
// Disables itself when there is nothing to undo.
class UndoButton {
    constructor(state, {dispatch}) {
        this.dom = elt("button", {
            id: "undo-button",
            onclick: () => dispatch({undo: true}),
            disabled: state.done.length == 0
        }, "UNDO")
    }
    syncState(state) {
        this.dom.disabled = state.done.length == 0;
    }
}


// ====== "Let's Dance!!!" ==================================================


// Sets all of the default settings for the application.
const startState = {
    tool: "draw", // Sets default tool to "draw".
    color: "#000000", // Sets the default drawing color to black.
    picture: Picture.empty(60, 30, "#f0f0f0"), // Sets the default background color of the canvas. (grey)
    done: [], // Empty's the Undo history.
    doneAt: 0 // Sets the last time of the last undoable undoable action.
};


// Sets up the list of tools for the user.
const baseTools = {draw, fill, rectangle, pick};


// Sets up the list of UI controls for the user.
const baseControls = [
    ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];


// Starts the PixelEditor's engine.
// Hands all of the components to the PixelEditor class.
function startPixelEditor({state = startState, tools= baseTools, controls = baseControls}) {
    let app = new PixelEditor(state, {
        tools,
        controls,
        dispatch(action) {
            state = historyUpdateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
}
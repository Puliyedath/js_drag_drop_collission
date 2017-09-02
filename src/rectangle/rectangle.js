const rectangle = "rect";

function createDiv() {
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.id = rectangle;
    document.body.appendChild(div);
    return div;
}

function position(x , y, bShrink) {
    this.style.left = `${x}px`;
    this.style.top =  `${y}px` ;
    return this;
}

function shrinkDown() {
    this.style.width = '0px';
    this.style.height = '0px';
    return this;
}

function addRectangle(event, doc){
    var rect = document.getElementById(rectangle);
    if (!rect) {
        rect = createDiv();
        position.call(rect, event.pageX, event.pageY);
    }else {
        position.call(rect, event.pageX, event.pageY);
    }

    var squares = document.querySelectorAll(".square");
    resetSquares(squares);

    shrinkDown.call(rect);

    //add handlers for div drag
    document.addEventListener('mousemove', resizeRectangle, false);
    document.addEventListener('mouseup', removeResizeHandler , false);
}

function removeResizeHandler() {
    console.log('handler removed');
    document.removeEventListener("mousemove" , resizeRectangle);
}

function resetSquares(squares){
    var rect = document.getElementById(rectangle);
    [].map.call(squares, function(square){
        if (doesCollide(rect, square)) {
            square.classList.remove('shaded');
        }
    });
}

function resizeRectangle(event) {
    if (!rect) {
        return false;
    }
    rect.style.width = `${event.pageX - parseInt(rect.style.left)}px`;
    rect.style.height = `${event.pageY - parseInt(rect.style.top)}px`;

    centers = document.querySelectorAll(".square");
    [].map.call(centers, function(center){
        if (doesCollide(rect, center)) {
            center.classList.add('shaded');
        }else{
            center.classList.remove('shaded');
        }
    });

}

/*
  * The reason el2.getBoundingClientRect is used since the squares
  * inside the big square would have offset top and left as zero since
  * thery are calculated based on the immediate parent
*/
function doesCollide(el1, el2){
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.getBoundingClientRect().top + el2.offsetHeight;
    el2.offsetRight = el2.getBoundingClientRect().left + el2.offsetWidth;

    return !((el1.offsetBottom < el2.getBoundingClientRect().top) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.getBoundingClientRect().left) ||
             (el1.offsetLeft > el2.offsetRight))
};

function callCenters(squares){
    var boundingRect;
    return [].map.call(squares, function(square) {
        var ret = [];
        boundingRect = square.getBoundingClientRect();
        ret.push(parseInt(boundingRect.top) + Math.floor(parseInt(boundingRect.height)/2))
        ret.push(parseInt(boundingRect.left) + Math.floor(parseInt(boundingRect.width)/2));
        return ret;
    });
}

let centers = [];
module.exports = function (elem) {
    centers = callCenters(document.querySelectorAll(".square"));
    console.log(centers);
    elem.addEventListener('mousedown', addRectangle, false);
}

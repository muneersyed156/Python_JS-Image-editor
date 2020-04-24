console.log("Entered")
var m = document.getElementById("my_audio")
var sharp = document.getElementById("sharp")
var contrast = document.getElementById("contrast")
var bright = document.getElementById("bright")
var file = document.getElementById("f1")
var e = document.getElementById("edit")
var image = document.getElementById("image")
var height = document.getElementById("height")
var width = document.getElementById("width")
var heightval = document.getElementById("heightval")
var widthval = document.getElementById("widthval")
var undo = document.getElementById("undo")
var sharpness = document.getElementById("sharpness")
var contrastness = document.getElementById("contrastness")
var brightness = document.getElementById("brightness")
var sharpvalue = document.getElementById("sharpvalue")
var brightvalue = document.getElementById("brightvalue")
var contrastvalue = document.getElementById("contrastvalue")
var rotate = document.getElementById("rotate")
var rotatenum = document.getElementById("rotatenum")
var rotatevalue = document.getElementById("rotatevalue")
var flipx = document.getElementById("flipx")
var flipy = document.getElementById("flipy")
var crop = document.getElementById('crop'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
var tocrop = document.getElementById("tocrop")
var enablecropping = document.getElementById("enableCropping")
var new1 = document.getElementById("new1")
var color = document.getElementById("color")
var save = document.getElementById("save")
var addtext = document.getElementById("addtext")
var sentence = document.getElementById("sentence")

l = []
count = 0
edited = false
initialimage = ""
flag = false
rects = 0
cropped = []
texting = "off"

window.onload = function () {
    document.getElementById("my_audio").play();
}

sentence.addEventListener("keyup", function () {
    if (texting = "on") {
        console.log(sentence.value)
    }
    else {
        console.log("enable the textmode")
    }
})
save.addEventListener("click", function () {
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    $.get("http://192.168.43.227:5000/save/" + t, function (data, status) {
        console.log("Done!")
        image.src = "black.jpg"
        alert("The edited image is successfully stored in the editedpics folder :-)")
    })
})
new1.addEventListener("click", function () {
    image.src = ""
    var r, g, b;
    y1 = color.value
    if (y1.charAt(0) == '#') {
        y1 = y1.substr(1);
    }
    if (y1.length == 3) {
        y1 = y1.substr(0, 1) + y1.substr(0, 1) + y1.substr(1, 2) + y1.substr(1, 2) + y1.substr(2, 3) + y1.substr(2, 3);
    }
    r = y1.charAt(0) + '' + y1.charAt(1);
    g = y1.charAt(2) + '' + y1.charAt(3);
    b = y1.charAt(4) + '' + y1.charAt(5);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    k1 = r + "," + g + "," + b
    edited = true
    $.get("http://192.168.43.227:5000/create/" + heightval.innerHTML.toString() + "/" + widthval.innerHTML.toString() + "/" + k1 + "/" + count.toString(), function (data, status) {
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log(data)
    })
})

//var canvas = document.getElementById("canvas")

enablecropping.addEventListener("click", function () {
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    q = cropped[0].toString() + "," + cropped[1].toString() + "," + cropped[2].toString() + "," + cropped[3].toString()
    $.get("http://192.168.43.227:5000/grab/" + t + "/" + q + "/" + count.toString(), function (data, status) {
        console.log("Showing rotated image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed rotated image!")
    })
})

tocrop.addEventListener("click", function () {
    initDraw(document.getElementById('canvas'));

})
function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }

    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            console.log(mouse.x, mouse.y)
            cropped.push(mouse.x, mouse.y)
            console.log("finsihed.");
            enablecropping.disabled = false
            sentence.value = ""
            console.log(cropped)
        } else {
            console.log("begun.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            rects += 1
            if (rects == 2) {
                canvas.removeChild(canvas.lastChild)
                rects -= 1
                cropped.pop()
                cropped.pop()
                cropped.pop()
                cropped.pop()
            }
            element = document.createElement('div');
            k = document.createElement("p");
            k.innerHTML = sentence.value
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            k.style.fontSize = "40px"
            k.style.color = "white"
            element.appendChild(k)
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
            console.log(mouse.x, mouse.y)
            cropped.push(mouse.x, mouse.y)
        }
    }
}

flipx.addEventListener("click", function () {
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    $.get("http://192.168.43.227:5000/flip/" + t + "/" + '1' + "/" + count.toString(), function (data, status) {
        console.log("Showing flippedx image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed flippedx image!")
    })
})

flipy.addEventListener("click", function () {
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    $.get("http://192.168.43.227:5000/flip/" + t + "/" + '0' + "/" + count.toString(), function (data, status) {
        console.log("Showing flippedy image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed flippedy image!")
    })
})

rotatenum.addEventListener("mousemove", function () {
    console.log(rotatenum.value)
    rotatevalue.innerHTML = rotatenum.value
})

rotate.addEventListener("click", function () {
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    valuetoberoated = rotatevalue.innerHTML
    console.log(valuetoberoated)
    $.get("http://192.168.43.227:5000/rotate/" + t + "/" + valuetoberoated + "/" + count.toString(), function (data, status) {
        console.log("Showing rotated image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed rotated image!")
    })
})
sharpness.addEventListener("mousemove", function () {
    console.log(sharpness.value)
    sharpvalue.innerHTML = sharpness.value
})

contrastness.addEventListener("mousemove", function () {
    console.log(contrastness.value)
    contrastvalue.innerHTML = contrastness.value
})

brightness.addEventListener("mousemove", function () {
    console.log(brightness.value)
    brightvalue.innerHTML = brightness.value
})

undo.addEventListener("click", function () {
    if (l.length == 0) {
        console.log("Nothing to undo")
        image.src = initialimage
        edited = false
        count = 0
    }
    else if (l.length != 0) {
        p = l.pop()
        console.log(p)
        image.src = l[l.length - 1]
        count = l.length - 1
        $.get("http://192.168.43.227:5000/delete/" + p, function (data, status) {
            console.log("Deleted!")
            console.log(data)
        })
        if (l.length == 0) {
            console.log("Nothing to undo")
            image.src = initialimage
            count = 0
            edited = false
        }
        if (rects == 2) {
            canvas.removeChild(canvas.lastChild)
            rects -= 1
        }
    }
})

height.addEventListener("mousemove", function () {
    console.log(height.value)
    heightval.innerHTML = height.value
    image.style.height = heightval.innerHTML
    canvas.style.height = heightval.innerHTML
})

width.addEventListener("mousemove", function () {
    console.log(width.value)
    widthval.innerHTML = width.value
    image.style.width = widthval.innerHTML
    canvas.style.width = widthval.innerHTML
})

e.addEventListener("click", function () {
    if (file.value != "") {
        k = file.value
        k = k.split("\\")
        image.src = k[k.length - 1]
        initialimage = k[k.length - 1]
        image.style.height = 200
        image.style.height = 450
    }
})

sharp.addEventListener("click", function () {
    console.log("sharping")
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    factor = sharpvalue.innerHTML
    console.log(factor)
    $.get("http:///192.168.43.227:5000/sharpen/" + t + "/" + factor.toString() + "/" + count.toString(), function (data, status) {
        console.log("Showing sharped image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed sharped image!")
    })
})

contrast.addEventListener("click", function () {
    console.log("contrast")
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    factor = contrastvalue.innerHTML
    $.get("http://192.168.43.227:5000/contrast/" + t + "/" + factor.toString() + "/" + count.toString(), function (data, status) {
        console.log("Showing contrasted image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed contrasted image!")
    })
})

bright.addEventListener("click", function () {
    console.log("brighting")
    if (edited == false) {
        t = image.src
        t = t.split("/")
        t = t[t.length - 1]
        console.log(t)
        edited = true
    }
    else {
        t = image.src
        t = t.split("/")
        t = t[t.length - 2] + "/" + t[t.length - 1]
    }
    factor = brightvalue.innerHTML
    $.get("http://192.168.43.227:5000/bright/" + t + "/" + factor.toString() + "/" + count.toString(), function (data, status) {
        console.log("Showing brightened image!")
        image.src = "./cache/new" + count.toString() + ".jpg"
        l.push("./cache/new" + count.toString() + ".jpg")
        count += 1
        console.log("Showed brightened image!")
    })
})

/*
function hex2rgb(colour) {
    var r, g, b;
    if (colour.charAt(0) == '#') {
        colour = colour.substr(1);
    }
    if (colour.length == 3) {
        colour = colour.substr(0, 1) + colour.substr(0, 1) + colour.substr(1, 2) + colour.substr(1, 2) + colour.substr(2, 3) + colour.substr(2, 3);
    }
    r = colour.charAt(0) + '' + colour.charAt(1);
    g = colour.charAt(2) + '' + colour.charAt(3);
    b = colour.charAt(4) + '' + colour.charAt(5);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    return (r.toString() + ',' + g.toString() + ',' + b.toString())
}
*/
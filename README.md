This repository has this list of files/folders:
1. cache-This is to store the images temporarily while editing this follows "LIFO"(Last in First Out) like a stack
2. editedpics- When the image needs to be saved after editing it the target edited image will be saved here when we download it.
3. index.html- It provides a web-interface to communicate with the image. It was designed with an idea of using it flexibly from Web as well as in the localhost. 
4. index.css - It provides a kind of view and feels purpose
5. index.js  - It plays a major role in interacting with user requests and backend.
6. picedit.py - It has all the features that this editor contains. It accepts the request from "JS" and sends them to "cache" from where the JS gets its response.

Used Concepts:
1. Javascript
2. Python -Opencv,PIL,Flask,os,numpy,flask_cors(CROS)

Features present:
1. Editing an image-Brightness, Sharpness, Contrast
2. Flipping an image
3. Rotating an image
4. Adjusting their sizes



![](comapringimages.png)

The left image is the original and the right image is the edited image. By playing with the brightness, sharpness, contrast of image we can generate images of much more clarity. This could be most useful for blurred images.

Author:
Syed Mohammad Muneer

from PIL import Image
from PIL import ImageEnhance
from flask import Flask,jsonify,render_template
from flask_cors import CORS, cross_origin
import os
import cv2
import numpy as np
import glob

app=Flask(__name__)

@app.route("/")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def hello():
    print("Hello flask!")
    return(render_template("index.html"))

@app.route("/<m>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def messgae(m):
    return(jsonify(message=str(m)))

@app.route("/<k>/<m>/<factor>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def adjust_feature(k,m,c,factor):
    image = Image.open(m)
    if(k=="sharp"):
    	enhancer_object = ImageEnhance.Sharpness(image)
    if(k=="contrast"):
        enhancer_object = ImageEnhance.Contrast(image)
    if(k=="bright"):
        enhancer_object = ImageEnhance.Brightness(image)
    out = enhancer_object.enhance(float(factor))
    out.save("./cache/new"+str(c)+".jpg")
    return("Process {} is DOne!".format(k))

@app.route("/sharpen/<m>/<n>/<factor>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def adjust_sharpness_new(m,n,c,factor):
    image = Image.open(m+"/"+n)
    enhancer_object = ImageEnhance.Sharpness(image)
    out = enhancer_object.enhance(float(factor))
    out.save("./cache/new"+str(c)+".jpg")
    return("Sharped!")

@app.route("/bright/<m>/<n>/<factor>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def adjust_brightness_new(m,n,c,factor):
    image = Image.open(m+"/"+n)
    enhancer_object = ImageEnhance.Brightness(image)
    out = enhancer_object.enhance(float(factor))
    out.save("./cache/new"+str(c)+".jpg")
    return("brightened!")

@app.route("/contrast/<m>/<n>/<factor>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def adjust_contrast_new(m,n,c, factor):
    image = Image.open(m+"/"+n)
    enhancer_object = ImageEnhance.Contrast(image)
    out = enhancer_object.enhance(float(factor))
    out.save("./cache/new"+str(c)+".jpg")
    return("contrasted!")

@app.route("/delete/<p>/<k>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def delete(p,k):
    os.remove(p+"/"+k)
    return("Done!")

@app.route("/rotate/<p>/<k>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def rotate_image(p,k,c):
    colorImage  = Image.open(p)
    rotated     = colorImage.rotate(int(k))
    rotated.save("./cache/new"+str(c)+".jpg")
    return("Done!")

@app.route("/rotate/<p1>/<p2>/<k>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def rotate_image_new(p1,p2,k,c):
    colorImage  = Image.open(p1+"/"+p2)
    rotated     = colorImage.rotate(int(k),expand=True)
    rotated.save("./cache/new"+str(c)+".jpg")
    return("Done!")

@app.route("/flip/<m>/<f>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def flip_image(m,f,c):
    img_fix=cv2.imread(m)
    #img_fix=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    if(f==0):
        img_new=cv2.flip(img_fix,0)
    else:
        img_new=cv2.flip(img_fix,1)
    cv2.imwrite("./cache/new"+str(c)+".jpg",img_new)
    return("Done!")

@app.route("/flip/<m>/<n>/<f>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def flip_image_new(m,n,f,c):
    img_fix=cv2.imread(m+"/"+n)
    #img_fix=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    if(f=='0'):
        img_new=cv2.flip(img_fix,0)
    else:
        img_new=cv2.flip(img_fix,1)
    cv2.imwrite("./cache/new"+str(c)+".jpg",img_new)
    return("Done!")

@app.route("/grab/<m>/<f>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def crop_image(m,f,c):
    img=Image.open(m)
    img1=np.asarray(img)
    f=f.split(",")
    f=[int(x) for x in f]
    k=img1[f[1]:f[3],f[0]:f[2]]
    img = Image.fromarray(k, 'RGB')
    img.save("./cache/new"+str(c)+".jpg")
    return("Done!")

@app.route("/grab/<m>/<n>/<f>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def crop_image_new(m,n,f,c):
    img=Image.open(m+"/"+n)
    img1=np.asarray(img)
    f=f.split(",")
    f=[int(x) for x in f]
    k=img1[f[1]:f[3],f[0]:f[2]]
    img = Image.fromarray(k, 'RGB')
    img.save("./cache/new"+str(c)+".jpg")
    return("Done!")

@app.route("/create/<h>/<w>/<cl>/<c>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def create_image(h,w,cl,c):
    cl=cl.split(",")
    cl=[int(x) for x in cl];h=int(h);w=int(w)
    data = np.zeros((h, w, 3), dtype=np.uint8)
    data[:,:] = cl # red patch in upper left
    img = Image.fromarray(data, 'RGB')
    img.save("./cache/new"+str(c)+".jpg")
    return("Done!")

@app.route("/save/<f>/<p>")
@cross_origin(allow_headers=['Content-Type','Authorization'])
def save_image(f,p):
    img=Image.open(f+"/"+p)
    c=len(os.listdir("./editedpics"))
    img.save("./editedpics/edited"+str(c)+".jpg")
    return("Done!")

if __name__ == '__main__':
    app.run(host="127.0.0.1",debug=True,port=8000)#"*.*.*.*" represnts localhost/server IP address 

import cv2
import numpy as np
from PIL import Image
import os
import matplotlib.pyplot as plt
from picedit import adjust_sharpness,adjust_brightness,adjust_contrast

c=len(os.listdir("cache"))
edit=False
drawing=False
ex=-1
ey=-1
img1=cv2.imread('nana.jpg')
img_fix1=cv2.cvtColor(img1,cv2.COLOR_BGR2RGB)
img_new1=cv2.resize(img_fix1,(650,500))
img1=np.asarray(img_new1)

def get_coordinates(event,x,y,flag,params):
    global ex,ey,drawing,c,edit,img1
    if event==cv2.EVENT_LBUTTONDOWN:
        drawing=True
        ex,ey=x,y
        print((ex,ey))
    elif(event==cv2.EVENT_MOUSEMOVE):
        while(cv2.EVENT_MOUSEMOVE):
            print("moving")
    elif event==cv2.EVENT_LBUTTONUP:
        drawing=False
        edit=True
        cv2.rectangle(img,(ex,ey),(x,y),(255,255,255,0.5),0)
        print((x,y))
        c+=1
        cv2.imwrite('cache/image'+str(c)+'.png',img)
        g=img1[ey:y,ex:x]
        return(g) 

cv2.namedWindow(winname='crop_image')
cv2.setMouseCallback('crop_image',get_coordinates)

while(1):
    h=cv2.waitKey(1)
    if(edit==False):
        img=cv2.imread('nana.jpg')
        img_fix=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        img_new=cv2.resize(img_fix,(650,500))
        img=np.asarray(img_new)
        cv2.imshow('crop_image',img)
    elif(edit==True and (h==ord('d'))):
        print("Undoing")
        os.remove('cache/image'+str(c)+'.png')
        c-=1
        if(c==0):
            edit=False
            print("Back to normal image")
            continue
        img=cv2.imread('cache/image'+str(c)+'.png')
        img_fix=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        img_new=cv2.resize(img_fix,(650,500))
        img=np.asarray(img_new)
        cv2.imshow('crop_image',img)
        
    elif(edit==True):
        img=cv2.imread('cache/image'+str(c)+'.png')
        img_fix=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        img_new=cv2.resize(img_fix,(650,500))
        img=np.asarray(img_new)
        cv2.imshow('crop_image',img)
    elif(h==ord('c')):
        print()
    if cv2.waitKey(2) & 0XFF==27:
        break
cv2.destroyAllWindows()

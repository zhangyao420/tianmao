//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名

function getClass(classname, father) { //兼容函数
  father = father || document;
  //1. 判断浏览器
  if (father.getElementsByClassName) { //条件为真时，代表就是FF和chrome
    return father.getElementsByClassName(classname);
  } else { //条件为假时，代表是IE
    //ID  Tag  name
    var all = father.getElementsByTagName("*"); //所有的
    /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,<div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
    var newarr = [];
    //遍历数组
    for (var i = 0; i < all.length; i++) {
      //"one fi".split()["one","fi"]  "one"
      //if(all[i].className==classname){//如果条件相等，表示找见了
      if (checkRep(all[i].className, classname)) {
        newarr.push(all[i]);
      }
    };
    return newarr;
  }
}

function checkRep(str, classname) { //"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
  var arr = str.split(" "); //以空格做分隔符转换数组
  for (var i in arr) { //遍历数组
    if (arr[i] == classname) { //判断元素与classname是否相同，相同时返回true
      return true;
    }
  }
  return false; // 所有比较以后，没有找到返回false
}
//2016.5.3
/********************************************/
//纯文本的兼容函数
//obj：对象
//val：要设置的内容（纯文本）

function getText(obj, val) {
  if (val != undefined) {
    if (obj.textContent) {
      obj.textContent = val;
    } else {
      obj.innerText = val;
    }
  } else {
    if (obj.textContent) {
      return obj.textContent;
    } else {
      return obj.innerText;
    }
  }
}

/*************************************************************/
//获取样式的兼容函数
//obj:对象
//attr:样式

function getStyle(obj,attr) {
  if (obj.currentStyle) {
    //字符串转换成数字类型
    //Number()
    //parseInt()
    //parseFloat()
    return parseInt(obj.currentStyle[attr]);
  } else {
    return parseInt(getComputedStyle(obj, null)[attr]);
  }
}
/*obj.currentStyle[attr];这样是取这个属性，attr是变量。可以是height，可以是width。
如果obj.currentStyle.attr是去取样式的attr属性，实际上这个属性是不存在的，所以不行。
//什么时候写成[attr]这样attr是个变量的时候。
return getComputedStyle(obj,false)[attr];//这个也是。
attr是一个参数
写成obj.currentStyle.attr，这里就是说，返回obj的currentStyle属性的attr属性，
此时 attr作为.后面的成员变量，已经无法把自己当成变量了
那在外面传参数的时候，参数必须是以字符串的方式传
就是：obj.currentStyle['width'] 如果样式属性如果是当作参数传进来的，
只能以['']的方式来接收*/
/**************************************************************/
//2016.5.5
//获取元素的兼容函数
/*
$(".box")
$("#box")
$("li")
//selector:表示选择器，与css的选择器一样
father:父容器*/

function $(selector, father) {
  //给父容器设置默认值
  father = father || document;
  //对selector做判断
  if (typeof selector == "string") { //是否是字符串
    selector = selector.replace(/^\s*|\s*$/g, ""); //去除字符串左右的空格
    if (selector.charAt(0) == ".") {
      //条件为真时，字符串为类名
      return getClass(selector.slice(1), father);
    } else if (selector.charAt(0) == "#") {
      return father.getElementById(selector.slice(1));
    } else if (/^[a-zA-Z1-6]{1,6}$/.test(selector)) {
      return father.getElementsByTagName(selector);
    }
  } else if (typeof selector == "function") {
    window.onload = function() {
      selector();
    }
  }
}
/*************************************************************************************/
//2016.5.6
//获取子元素的兼容函数

function getChild(father, type) {
  type=type||"a"
  var all = father.childNodes;
  var arr = []
  for (var i = 0; i < all.length; i++) {
    if (type == "a") { //只获取元素子节点
      if (all[i].nodeType == 1) {
        arr.push(all[i])
      };
    } else if (type == "b") { //获取元素+文本子节点
      if (all[i].nodeType == 1 || all[i].nodeValue.replace(/^\s*|\s*$/g, "") != "" && all[i].nodeType == 3) {
        arr.push(all[i])
      }
    };
  };
  return arr
}
/******************************************************************************************/
function getFirst(father){
      return getChild(father)[0];
}
/******************************************************************************************/
function getLast(father){
      return getChild(father)[getChild(father).length-1];
}
/******************************************************************************************/
function getNum(father,num){
  return getChild(father)[num]
}
/******************************************************************************************/
//2016.5.7
//获取上一个兄弟节点
//元素节点，对象
function getUp(obj){
  var up=obj.previousSibling;
  if (up==null) {
    return false;
  };
    while(up.nodeType==8||(up.nodeType==3&&up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时，接着找(条件为注释节点时或是文本节点为空时)
        up=up.previousSibling;
        if (up==null) {
            return false;
        };
    }
    return up;
}
//获取下一个兄弟节点
//元素节点，对象
function getNext(obj){
  var next=obj.nextSibling;
  if (next==null) {
    return false;
  };
    while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足时，接着找(条件为注释节点时或是文本节点为空时)
        next=next.nextSibling;
        if (next==null) {
            return false;
        };
    }
    return next;
}
/**********************************************************************************/
//插入到某个对象之后
function insertAfter( father,newNode,obj){
  var next=getNext(obj)
  if (next) {
    father.insertBefore(newNode,next)
  }else{
    father.appendChild(newNode)
  }
}
/******************************************************/
//2016.5.9
//事件绑定的兼容函数
function addEvent(obj,event,fun){
  if(obj.attachEvent){
    obj.attachEvent("on"+event,function(){
      fun.call(obj)})
  }else{
    alert(1)
    obj.addEventListener(event,fun,false)
  }
}
//删除
function deleteEvent(obj,event,fun){
   if(obj.detachEvent){
    obj.detachEvent("on"+event,fun)
  }else{
    obj.removeEventListener(event,fun,false)
  }
}
/**************************************************/
//滚轮事件
function mouseWheel(obj,up,down){
  if(document.attachEvent){
    document.attachEvent("onmousewheel",scrollFn); //IE、 opera
  }else if(document.addEventListener){
    document.addEventListener("mousewheel",scrollFn,false);
    //chrome,safari -webkit-
    document.addEventListener("DOMMouseScroll",scrollFn,false);
    //firefox -moz-
  }
  function scrollFn(e) {
    var ev=e||window.event;
    var val=ev.detail||ev.wheelDelta
    if (val==-3||val==120) {
      up()
    }else if (val==3||val==-120) {
      down()
    };
  }
}
/********************************************************/
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//实现拖拽的构造函数
/*
obj: 要实现拖拽的对象
attrobj: 属性对象 以{}节省格式传入
   x: 为true时，可以在x轴拖动,false反之
   y: 为true时，可以在y轴拖动,false反之
   animate: 为true时，有缓冲效果,false反之
   father: 父对象
*/

function drag(obj,attrobj){
  this.obj=obj;//要实现拖拽的对象
  this.cx=0;
  this.cy=0;
  this.ox=0;
  this.oy=0;
  this.attrobj=attrobj==undefined?null:attrobj;//是一个对象
  this.x=attrobj.x!=undefined?attrobj.x:true;
  this.y=attrobj.y!=undefined?attrobj.y:true;
  this.animate=attrobj.animate!=undefined?attrobj.animate:true;
  this.father=attrobj.father!=undefined?attrobj.father:document;  //document//bigbox
  //父容器的宽高
  if(this.father.nodeType==9){//父容器为document
    this.fw=document.documentElement.clientWidth;
    this.fh=document.documentElement.clientHeight;
    document.body.style.position="relative";
  }else{
    this.fw=this.father.offsetWidth;
    this.fh=this.father.offsetHeight;
    this.father.style.position="relative";
  }

  this.ow=this.obj.offsetWidth;
  this.oh=this.obj.offsetHeight;

  this.startx=0;
  this.starty=0;
  this.endx=0;
  this.endy=0;
  this.lenx=0;
  this.leny=0;
  this.speed=0.8;

}
drag.prototype={
  drags:function(){//实现拖拽的方法
    //alert(2222)
    this.down();
  },
  down:function(){
    //方法里，this指实例化对象;
    //事件里，this指事件源
    //alert(this)
    var that=this;
    this.obj.onmousedown=function(e){
       var ev=e||window.event;
       if(ev.preventDefault){
        ev.preventDefault();
       }else{
        ev.returnValue=false;
       }
       that.ox=ev.clientX-this.offsetLeft;
       that.oy=ev.clientY-this.offsetTop;
       that.startx=that.ox;
       that.starty=that.oy;
       that.move();
       that.up();
    }
  },
  move:function(){
    var that=this;//在方法里，this实例化对象
    document.onmousemove=function(e){
     var ev=e||window.event;
     if(ev.preventDefault){
        ev.preventDefault();
       }else{
        ev.returnValue=false;
       }
     that.cx=ev.clientX;
     that.cy=ev.clientY;
     var x=that.cx-that.ox;
     var y=that.cy-that.oy;
     if(x<=0){
      x=0;
     }
     if(y<=0){
      y=0;
     }
     if(x>=that.fw-that.ow){
      x=that.fw-that.ow
     }
     if(y>=that.fh-that.oh){
      y=that.fh-that.oh
     }
     if(that.x){
      that.obj.style.left=x+"px";
     }     
     if(that.y){
      that.obj.style.top=y+"px";
     }   

     that.endx=that.cx
     that.endy=that.cy;
     that.lenx=that.endx-that.startx;
     that.leny=that.endy-that.starty;
     that.startx=that.endx;
     that.starty=that.endy;
    }
  },
  up:function(){
    var that=this;
    document.onmouseup=function(){
      if(that.animate){
        var t=setInterval(function(){
          that.lenx*=that.speed;
          that.leny*=that.speed;
          console.log(that.lenx+"***"+that.leny);
          if(that.lenx<-1){
            clearInterval(t);
          }else{
            var x=that.lenx+that.obj.offsetLeft;
            var y=that.leny+that.obj.offsetTop;
            if(x<=0){
          x=0;
         }
         if(y<=0){
          y=0;
         }
         if(x>=that.fw-that.ow){
          x=that.fw-that.ow
         }
         if(y>=that.fh-that.oh){
          y=that.fh-that.oh
         }
            that.obj.style.left=x+"px";
            that.obj.style.top=y+"px";
          }
       },40)
    }
       document.onmousemove=null;
       document.onmouseup=null
    }
  }
}
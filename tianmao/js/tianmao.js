

var box=$(".box");
var zhezhao=$(".zhezhao");
for (var i = 0; i < box.length; i++) {
    box[i].aa=i;
    box[i].onmouseover=function(){
        zhezhao[this.aa].style.display="block";
    };
    box[i].onmouseout=function(){
        zhezhao[this.aa].style.display="none";
    }
}


    var arrColor=["#ff27a6","#e8e8e8","#4c2efe","#e8e8e8","#ffef01","#fb0102"];
    var banner=$(".banner")[0];
    var bannerM=$(".banner-m")[0];
    var tu=$(".tu");
    var num=0;
   var guangbiao=$(".guangbiao");
    function move(){
       num++;
       if (num>=tu.length) {
        num=0;
        //从头开始
       }
       //同意操作其他元素
       for (var i = 0; i < tu.length; i++) {
        tu[i].style.opacity=0;
        guangbiao[i].style.background="#000";
        banner.style.background="none"
       }
       guangbiao[num].style.background="#fff";
       animate(tu[num],{opacity:1},1000,Tween.Linear);
       banner.style.background=arrColor[num]
    }
    var t=setInterval(move,2000);
    //划上去停
    bannerM.onmouseover=function(){
         clearInterval(t);
    };
    bannerM.onmouseout=function(){
         t=setInterval(move,2000);
    };
    for (var i = 0; i < guangbiao.length; i++) {
        guangbiao[i].index=i;
        guangbiao[i].onmouseover=function(){
            for (var j = 0; j < tu.length; j++) {
                tu[j].style.opacity=0;
                guangbiao[j].style.background="#000";
                banner.style.background="none"
            }
            tu[this.index].style.opacity=1;//当前显示
            guangbiao[this.index].style.background="#fff";
            banner.style.background=arrColor[this.index];
            clearInterval(t);
             //改时间函数里的num
             num=this.index;
        };
        guangbiao[i].onmouseout=function(){
            t=setInterval(move,2000);
        }
    }


document.bgColor="#f5f5f5";


var sousuolan=$(".sousuolan")[0];
var sousuolanbox=$(".sousuolanbox")[0];
var biaoti=$(".biaoti")[0];
var jump=$(".jump")[0];
var floor=$(".floor");
var btns=$(".btns");
var tmwz=$(".tianmanwenzi")[0];
var inputbox=$(".inputbox")[0];
var inputSs=$(".input-ssbox")[0];
var fh=$(".fanhuidingbu")[0];
var fanh=$(".fh")[0];
var allColor=["#f7a945","#19c8a9","#f15453","#64c333","#0aa6e8","#ea5f8d","#dd2727","#000"];
var numIndex=0;
document.onscroll=function(){
    var tops=document.body.scrollTop||document.documentElement.scrollTop;
    if (tops>=810) {
        animate(sousuolan,{height:50},100,Tween.Linear);
        animate(sousuolanbox,{display:"block"},100,Tween.Linear)
    }else{
        animate(sousuolan,{height:0},100,Tween.Linear);
        animate(sousuolanbox,{display:"none"},100,Tween.Linear)
        
    }    
    if (tops>=810) {
        jump.style.display="block";
    }else{
        jump.style.display="none";
    }
    for (var i = 0; i < floor.length-1; i++) {
        if (floor[i].offsetTop<=tops-100) {
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background="none"
            }
            btns[i].style.background=allColor[i];
            numIndex=i;
        }
    }
    //按需加载
    var ch=document.documentElement.clientHeight;//浏览器高
    for (var i = 0; i < floor.length; i++) {
        if (floor[i].offsetTop<=tops+ch) {
            var imgs=$("img",floor[i]);
            for (var j=0; j < imgs.length; j++) {
                //获取自定义的属性
                //元素.属性
                //getStyle()
                //setAttribute()//设置属性
                //getAttribute()//获取属性，适用于不标准的属性
                imgs[j].src=imgs[j].getAttribute("date-src");
            }
        }
    }
};
var obj=document.body.scrollTop?document.body:document.documentElement;
for (var i = 0; i < btns.length; i++) {
    btns[i].index=i;
    btns[i].onclick=function(){
        numIndex=this.index;
        animate(obj,{scrollTop:floor[this.index+1].offsetTop-60},300,Tween.Linear)
    };
    btns[i].onmouseover=function(){
        for (var j = 0; j < btns.length; j++) {
            if (j!=numIndex) {
            btns[j].style.background=""
            }
        }
       this.style.background=allColor[this.index]
    }; 
    btns[i].onmouseout=function(){
        for (var h = 0; h < btns.length; h++) {

            if (h!=numIndex) {

            btns[h].style.background=""
            }
        }
    };
    fh.onclick=function(){
        animate(obj,{scrollTop:"0"},500)
    };
    fanh.onclick=function(){
        animate(obj,{scrollTop:"0"},500)
    };
    if (obj==0) {
        fanh.style.display="none";   
    }else{
        fanh.style.display="block";
    }
}
//下拉框
var xiala=$(".xiala");
var xialacaidan=$(".xialacaidan");
for (var i = 0; i < xiala.length; i++) {
    xiala[i].index=i;
    xiala[i].onmouseover=function(){
        xialacaidan[this.index].style.display="block";
    };
    xiala[i].onmouseout=function(){
        xialacaidan[this.index].style.display="none"
    }
}
//侧导航
var Objcolor=["#eb5d77","#6347ef","#6347ef","#eb5d77","#6347ef","#6347ef","#eb5d77","#f8a831","#f8a831","#6347ef","#eb5d77","#6347ef","#f8a831","#3bc7b0","#eb5d77","#3bc7b0"];
var zuo=$(".zuo");
var zuoNeirong=$(".zuo-neirong");
for (var i = 0; i < zuo.length; i++) {
    zuo[i].index=i;
    zuo[i].onmouseover=function(){
        zuoNeirong[this.index].style.display="block";
        zuo[this.index].style.color=Objcolor[this.index]
    };
    zuo[i].onmouseout=function(){
        zuoNeirong[this.index].style.display="none";
        zuo[this.index].style.color=""
    }
}

var dhwb=$(".dhwb");
var tutu=$(".tutu");
for (var i = 0; i < dhwb.length; i++) {
    dhwb[i].index=i;
    dhwb[i].onmouseover=function(){
        tutu[this.index].style.display="block";
    };
    dhwb[i].onmouseout=function(){
        tutu[this.index].style.display="none"
    }
}
//固定导航
var gdbox=$(".gdbox");
var huashang=$(".huashang");
for (var i = 0; i < gdbox.length; i++) {
    gdbox[i].index=i;
    gdbox[i].onmouseover=function(){
        huashang[this.index].style.display="block";
    };
    gdbox[i].onmouseout=function(){
        huashang[this.index].style.display="none"
    }
}
var ewm=$(".ewmx")[0];
var ewmt=$("#ewmt");
ewm.onmouseover=function(){
    ewmt.style.display="block";
};
ewm.onmouseout=function(){
    ewmt.style.display="none"
};
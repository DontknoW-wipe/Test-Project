var element=document.documentElement;
        
        function openfull(){
            if(element.requestFullscreen){
                element.requestFullscreen();
            }
        }
        function closefull(){
            if(document.exitFullscreen){
                document.exitFullscreen();
            }
        }
        function f12()
        {
            document.getElementById('fullscreenpopup').style.display='none';
        }
        function start1()
        {
            setTimeout(openfull,1500); 
            setTimeout(f12,1500);
            
        }
$(document).ready(function(){
    
    
    $.ajax({
        url:'/timerecieve',
        type:'get',
        success:function(data)
        {
           // alert(typeof(data[0]));
            var tq1=JSON.parse(data[0]);
            var tq2=JSON.parse(data[1]);
            //var time=tq1.Testduration;
            var time=tq1.Testduration;
            var hr=time/60;
            hr=Math.floor(hr);
           // alert(hr);
            var mi=time%60;
            mi--;
            var se=59;
                var e=setInterval(f,1000);
                function f()
                {
                    var hour="";
                    var minute="";
                    var second="";
                    if(hr<10)
                    {
                        hour+="0"+hr;
                    }
                    else{
                        hour=hr;
                    }
                    if(mi<10)
                    {
                        minute+="0"+mi;
                    }
                    else{
                        minute=mi;
                    }
                    if(se<10)
                    {
                        second+="0"+se;
                    }
                    else{
                        second=se;
                    }
                    document.getElementById('timer').innerHTML=hour+" : "+minute+" : "+second;
                    se--;
                    if(se==-1&&mi>0)
                    {
                        se=59;
                        mi--;
                    }
                    if(mi==-1&&hr>0)
                    {
                        mi=59;
                        hr--;
                    }
                    if(hr==0)
                    {
                        if(mi==0&&se==-1)
                        {
                            document.getElementById('form').submit();
                        }
                    }
                    
                }
                $('#stname').html(`<b>Name : </b>`+tq2.Name);
        },
        error:function(){
            console.log("Error");
        }
    });


    $.ajax({
        url:'/load',
        type:'get',
        success:function(data){
            var qno1="";
            var qd1="";
            var le=data.length;
            for(var i=0;i<le;i++)
            {
                qno1+=`<a href="#q`+(i+1)+`" class="qbtn">Question `+(i+1)+`</a>`;
                qd1+=`<div id="q`+(i+1)+`" class="questionpart">
                    <div id="questionNo" class="questionNopart">
                        <h2>Question `+(i+1)+`</h2>
                    </div>
                    <div id="q`+(i+1)+`Q" class="questionQ">
                        <p>`+data[i][0]+`</p>
                    </div>
                    <div id="q`+(i+1)+`Option" class="questionOption">
                        <label><p><input type="radio" name="q`+(i+1)+`Answer" value="`+data[i][1]+`">`+data[i][1]+`</p></label>
                        <label><p><input type="radio" name="q`+(i+1)+`Answer" value="`+data[i][2]+`">`+data[i][2]+`</p></label>
                        <label><p><input type="radio" name="q`+(i+1)+`Answer" value="`+data[i][3]+`">`+data[i][3]+`</p></label>
                        <label><p><input type="radio" name="q`+(i+1)+`Answer" value="`+data[i][4]+`">`+data[i][4]+`</p></label>

                    </div>
                </div>`;
            }
            $('#qno').append(qno1);
            $('#questions').append(qd1);
        },
        error:function()
        {
            console.log("error");
        }
    });


});

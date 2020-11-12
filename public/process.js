$(document).ready(function(){


    //emailverify

    var emailcodeverifysuccess=0;
    
    $('#emailbtn').click(function(){
        var errordata="";
        var emailid=$('#email').val();
        var name=$('#name').val();
        var mobileno=$('#mobileno').val();
        var schoolname=$('#schoolname').val();
        var timing=$('#timing').val();
        var testdate=$('#testdate').val();
        var teststart=$('#teststart').val();
        var totalquestion=$('#totalquestion').val();
        if(name=="")
        {
            errordata+="Name \n";
        }
        if(emailid=="")
        {
            errordata+="Email \n";
        }
        if(mobileno=="")
        {
            errordata+="Mobile no. \n";
        }
        if(schoolname=="")
        {
            errordata+="School Name \n";
        }
        if(timing=="")
        {
            errordata+="Test Duration \n";
        }
        if(testdate=="")
        {
            errordata+="Test Date \n";
        }
        if(teststart=="")
        {
            errordata+="Test Time \n";
        }
        if(totalquestion=="")
        {
            errordata+="Total No. of question \n";
        }
        //alert(errordata);
        if(errordata.length==0)
        {
            $.ajax({
                url:'/email/verification',
                type:'post',
                data:JSON.stringify({
                    "email":emailid
                }),
                contentType:"application/json",
                success:function(data)
                {
                    console.log(data);
                    if(data=="done")
                    {
                        $('#verifycodeinput').show(200);
                        $('#alertemailsent').show(100);
                        $('#emailbtn').hide(200);
                        $('#verifycodebtn').show(200);
                    }
                    else{
                        alert("Email id invalid");
                    }
                
                    
                },
                error:function(){
                    console.log("Some error");
                }
                
            });
        }
        else{
            alert("Field's are missing \n"+errordata);
        }
        
    });
   
    //verifycode

    $('#verifycodebtn').click(function(){
        var emailverifycode=$('#verifycodeinput').val();
        if(emailverifycode=="")
        {
            alert("Invalid Code");
        }
        else{
            $.ajax({
                url:'/email/verification/d',
                type:'post',
                data:JSON.stringify({
                    "verifycode":emailverifycode
                }),
                contentType:"application/json",
                success:function(data){
                    if(data=="success")
                    {
                        $('#verifycodeinput').hide(200);
                        $('#alertemailsent').hide(100);
                        $('#emailbtn').hide(200);
                        $('#verifycodebtn').attr("value","Verified");
                        $('#verifycodebtn').attr("disabled","disabled");
                        $('#registerbtn').removeAttr("disabled");
                    }
                    else{
                        alert("Invalid Code");
                    }
                },
                error:function(){
                    console.log("error");
                }
            });
        }
    });
});
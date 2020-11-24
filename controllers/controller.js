const RegisterTestPersonData=require('../models/registerTestPersondata');
const TestStudentData=require('../models/teststudentdata');
const SubmitAnswers=require('../models/submitAnswers');
const Questions=require('../models/Questions');
const Answers=require('../models/Answers');
const session=require('express-session');
const fs=require('fs');
const next = require("mongodb");
const { param } = require('../routes/routes');
const { findByIdAndUpdate } = require('../models/registerTestPersondata');
const { time } = require('console');

const tquestion=null;
function generateid(){
    var codegeneration='0123456789'.split("");
    var s1="";
    for(var i=0;i<11;i++)
    {
        var t1=Math.floor(Math.random()*10);
        s1=s1+codegeneration[t1];
    }
    return s1;
}
exports.gethome=function(req,res){
    res.redirect('/');
};
exports.postlogin=function(req,res){
    const { SESSION_CODE,userId,tquestion,idused ,SutD,RutD,pass1}=req.session;
    var testcode= String(req.body.test_code) ;
    var passcode=req.body.pass_code;
    RegisterTestPersonData.findOne({TestID:testcode},function(err,user){
        
        console.log(user);
        if(user!=null)
        {
            if(user.Password==passcode)
            {
                req.session.SESSION_CODE=generateid();
                req.session.userId=testcode;
                //var data='/'+req.session.userId+'/studentform/'+req.session.SESSION_CODE;
                //res.redirect('/studentform');
                //console.log(data);
               //console.log(typeof(data));
               /*var g=`
               <script>
                 window.open('http://localhost:3300/studentform','xyz','height=720,width=1500');
                </script>
               `;*/
               res.redirect('/studentform');
                //res.send(g);
            }
            else{
                res.redirect('/');
            }
        }
        else{
            res.redirect('/');
        }
    });
    
    

};

exports.getstudentdataform=function(req,res){


    if(req.session.SESSION_CODE&&req.session.userId)
    {
        fs.readFile('public/test.html','utf-8',function(err,content){
            if(err){
                res.send(`<h1>Development work is going on.</h1>`)
            }
            else{
                res.send(content);
            }
        });
    }
    else{
        res.redirect('/');
    }

};

exports.tandcpagestarttest=function(req,res){
    if(req.session)
    {
        fs.readFile('public/tncpage.html','utf-8',function(err,content){
            if(err){
                res.send(`<h1>Development work is going on.</h1>`)
            }
            else{
                res.send(content);
            }
        });
    }
    else
    {
        res.redirect('/');
    }
};

exports.fillstudentdata=function(req,res){

    let info= new TestStudentData({
        Name:req.body.fullname,
        Mobile:req.body.mobileno,
        Email:req.body.email,
        Gender:req.body.gender,
        Dob:req.body.dob,
        Collegename:req.body.collegename,
        Collegeroll:req.body.collegeroll,
        City:req.body.cityname,
        Pincode:req.body.pincode,
        State:req.body.statename,
        SESSION_CODE:req.session.SESSION_CODE
    });
    //res.render('question');
    info.save(function(err){
        if(err)
        {
            return next(err);
        }
        console.log(info);
        req.session.SutD=info;
        res.redirect('/start/test');
    });

};

exports.questionpage=function(req,res){
    
    //console.log(req.session);
    console.log(req.session);
    if(req.session.userId)
    {
        fs.readFile('public/questions.html','utf-8',function(err,content){
            if(err){
                res.send(`<h1>Development work is going on.</h1>`)
            }
            else{
                console.log(req.session.userId);
                res.send(content);
            }
        });
    }
    else{
        res.redirect('/');
    }

    
};

exports.load12=function(req,res){

    if(req.session.userId)
    {
        Questions.findOne({TestID:req.session.userId},function(err,qa){

            console.log(qa.Question);
            res.send(qa.Question);
        });
        
        
    }
};

exports.timeR=function(req,res){
    RegisterTestPersonData.findOne({TestID:req.session.userId},function(err,user){
        if(user!=null)
        {
            console.log(JSON.stringify(user));
            var t=JSON.stringify(user);
            var s=JSON.stringify(req.session.SutD);
            var df=[t,s];
            res.send(df);
        }
    });
};
exports.answersheet=function(req,res){
    var r=req.body;
    let info=new SubmitAnswers();
    info.TestID=req.session.userId;
    info.StudentSESSIONCODE=req.session.SESSION_CODE;
    info.Answers=r;
    info.save(function(err){
        if(err)
        {
            return next(err);
        }
        console.log(info);
        req.session.destroy(function(err){
            console.log(err);
        });
        fs.readFile('public/submitAnswerThank.html','utf-8',function(err,content){
            if(err){
                res.send(`<h1>Development work is going on.</h1>`)
            }
            else{
                //console.log(req.session.userId);
                res.send(content);
            }
        });
        //res.send(msg);
        //res.send(info.Answers[0].q1Answer);
    });
    

};

exports.getregister=function(req,res){
    fs.readFile('public/register.html','utf-8',function(err,content){
        if(err){
            res.send(`<h1>Development work is going on.</h1>`)
        }
        else{
            res.send(content);
        }
    });
};

exports.postregister=function(req,res){
    
     
    var tquestion=req.body.totalquestion;
    req.session.tquestion=tquestion;
    req.session.idused=generateid();
    
    let info = new RegisterTestPersonData();
    info.TestID=req.session.idused;
    info.Fullname=req.body.fname;
    info.Email=req.body.email;
    info.Mobile=req.body.mno;
    info.Schoolname=req.body.schoolname;
    info.Testduration=req.body.timing;
    info.Testdate=req.body.testdate;
    info.Testtime=req.body.teststart;
    info.TotalQuestion=req.body.totalquestion;
    info.EmailVerified=true;
    info.Password=generateid();
    req.session.pass1=info.Password;
    info.save(function(err){
        if(err)
        {
            return next(err);
        }
        console.log(info);
        res.redirect('/addquestions');
    });

    
    //console.log(req.session);
    
};

exports.addquestions=function(req,res){
    fs.readFile('public/registerquestion.html','utf-8',function(err,content){
        if(err){
            res.send(`<h1>Development work is going on.</h1>`)
        }
        else{
            console.log(req.session.tquestion);
            res.send(content);
        }
    });
};

exports.about=function(req,res){
    fs.readFile('public/about.html','utf-8',function(err,content){
        if(err){
            res.send(`<h1>Development work is going on.</h1>`)
        }
        else{
            console.log(req.session.tquestion);
            res.send(content);
        }
    });
};

// EMAIL SEND FUNCTION
var emailsent=false;
var verifycode1=12345;
function generatecodeforemail(){
    var codegeneration='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split("");
    var s1="";
    for(var i=0;i<6;i++)
    {
        var t1=Math.floor(Math.random()*62);
        s1=s1+codegeneration[t1];
    }
    return s1;
}

function mailcheckatstart(emailid1)
{
        var mailerkar=require('nodemailer');

    var trans=mailerkar.createTransport({
        service:'gmail',
        auth:{
            user:'kamalzero167@gmail.com',
            pass:'iamkamalnk'
        }
    });
    verifycode1=generatecodeforemail();
    console.log("Email code : "+verifycode1);
    var mailopt={
        from:'kamalzero167@gmail.com',
        to:emailid1,
        subject:'Your verification Code',
        html:'<h1>Your verification Code is '+verifycode1+'</h1>'
    };

    trans.sendMail(mailopt,function(error,info){
        if(error)
        {
            console.log("Email not sent")
            emailsent=false;
        }
        else
        {
            console.log('Email has been sent successfully : '+info.response);
            emailsent=true
        }
    });
}

exports.emailverify=function(req,res){
    
    var email=req.body.email;
    var mailstatus=mailcheckatstart(email);
    if(emailsent==false)
    {
        var i="not";
        res.send(i);
    }
    else{
        var i="done";
        res.send(i);
    }
};
exports.emailverifyd=function(req,res){
    var verifycode2=req.body.verifycode;
    if(verifycode2==verifycode1)
    {
        var i="success";
        console.log("Verified");
        res.send(i);
    }
    else{
        var i="fm";
        res.send(i);
    }
    console.log(verifycode2);
};

exports.sendquestionno=function(req,res){
    if(req.session.tquestion)
    {
        console.log("send question no"+req.session.tquestion);
        res.send(req.session.tquestion);
        
        
    }
};
exports.postaddquestions=function(req,res){
    var g=req.body;
    let questiondata=new Questions();
    let answerdata=new Answers();
    questiondata.TestID=req.session.idused;
    answerdata.TestID=req.session.idused;
    for(var i=1;i<=req.session.tquestion;i++)
    {
        var tw1=g['q'+i+'Question'];
        var tw2=g['q'+i+'option1'];
        var tw3=g['q'+i+'option2'];
        var tw4=g['q'+i+'option3'];
        var tw5=g['q'+i+'option4'];
        var tw6=g['q'+i+'answer'];
        var a1=[];
        a1[0]=tw1;
        a1[1]=tw2;
        a1[2]=tw3;
        a1[3]=tw4;
        a1[4]=tw5;
        answerdata.Answers.push(tw6);
        questiondata.Question.push(a1);


    }
    answerdata.save(function(err){
        if(err)
        {
            return next(err);
        }
    });
    questiondata.save(function(err){
        if(err)
        {
            return next(err);
        }
    });
    //console.log(g);
    var msg=`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Thank You</title>
            <link rel="stylesheet" href="css/th.css">
        </head>
        <body>
            <div class="container">
                <div class="msg">
                    <h1>
                    Your Test ID is
                       `+questiondata.TestID+` and Password is `+req.session.pass1+` .
                    </h1>
                    <h1>
                        Submitted successfully
                        <br>Thank You
                    </h1>
                    <h1>
                        <a href="/">Click Here For HomePage</a>
                    </h1>

                </div>
            </div>
        </body>
        </html>
    `;
    res.send(msg);
};

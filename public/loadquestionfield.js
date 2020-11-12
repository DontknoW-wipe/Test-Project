
$(document).ready(function(){


    function questiondata(){
            var t_q=parseInt($('#total-q').val());
            t_q=t_q+1;
            $('#total-q').attr("value",t_q);
            $('.question-data').append(`${`            <div class="hidden-q"  >
            <div class="question-para">
                <h1>Question No. ` + t_q + `</h1>
                <textarea name=`}q${t_q}Question${` cols="100" rows="10" placeholder="Your Question.." required ></textarea>    
            </div>
            <div class="option-para">
                <div class="option-q">
                    <input type="text"  name=`}q${t_q}option1${` placeholder="option 1" required>
                </div>
                <div class="option-q">
                    <input type="text" name=`}q${t_q}option2${` placeholder="option 2" required>
                </div>
                <div class="option-q">
                    <input type="text"  name=`}q${t_q}option3${` placeholder="option 3" required>
                </div>
                <div class="option-q">
                    <input type="text"  name=`}q${t_q}option4${` placeholder="option 4" required>
                </div>
                <div class="option-q">
                <input type="text"  name=`}q${t_q}answer${` placeholder="Your Answer" required>
            </div>
            </div>
        </div>`}`);
    }
    $.ajax({
        url:'/noofquestions',
        type:'get',
        success:function(data){
            for(var i=0;i<data;i++)
            {
                questiondata();
            }
        },
        error:function()
        {
            console.log("error");
        }
    });


});

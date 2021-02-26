$(document).ready(function(){
    $("#showTableLink").hide();//hide the link button
    $("#assessmentQuestionDiv").hide();// hide while div containing questions
    localStorage.clear();// used localstorage to send information to another page
    //clear storage      // i know it may not be the most appropriate way but i couldn't find anything better than this.

    $("form").on('submit',function(e){// this function will be called on form submit
        var val = $("input[type=submit][clicked=true]").val();// check which button clicked
        //alert(val);
        //
        if(val=="Start Assessment"){// if it's start assesment then hide table and disabled all textbox
            $("#personalInfoTable").hide();
            $("#showTableLink").val("Show Table");
            $("#showTableLink").show();
            $("#showTableLink").css("float","left");
            $("#st").attr("required","required");
            $("#btn").attr("disabled","disabled");
            $("#name").attr("disabled","disabled");
            $("#email").attr("disabled","disabled");
            $("#phno").attr("disabled","disabled");
            $("#male").attr("disabled","disabled");
            $("#female").attr("disabled","disabled");
            $("#bdate").attr("disabled","disabled");
            $("#assessmentQuestionDiv").show();
            window.location.href="#assessmentQuestionDiv";
            return false;
        }else{// if it's not a start assessment then it will be ->view result
            //all the data will be gathered here and store to the localstorage
            var personalDetails={};// creating JSON object
            personalDetails["name"]=$("#name").val();
            personalDetails["bdate"]=$("#bdate").val();
            personalDetails["phno"]=$("#phno").val();
            personalDetails["email"]=$("#email").val();
            personalDetails["gender"]=$("input[name=gender]:checked").val();
//                        

            var severe=[];
            var mild=[];
            var normal=[];
            $("input[name=severe]:checked").each(function(){
                severe.push($(this).val());
            });
            $("input[name=mild]:checked").each(function(){
                mild.push($(this).val());
            });
            $("input[name=normal]:checked").each(function(){
                normal.push($(this).val());
            });
//                        
//                        //storing data
            localStorage.setItem("personalDetails", JSON.stringify(personalDetails));// stringify will convert json to string

            localStorage.setItem("severe", JSON.stringify(severe));
            localStorage.setItem("mild", JSON.stringify(mild));
            localStorage.setItem("normal", JSON.stringify(normal));
            localStorage.setItem("travel",$("input[name=travel]:checked").val());
            localStorage.setItem("care",$("input[name=care]:checked").val());
            localStorage.setItem("contact",$("input[name=contact]:checked").val());

        }
        //return false;
    });
    //setting click attribute in order to get which button got hit in on submit method 
    $("form input[type=submit]").click(function() {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });




    //a button which will toggle between show and hide table
    $("#showTableLink").on('click',function(){
        if($("#showTableLink").val()=="Show Table"){
            $("#personalInfoTable").show();
            $("#showTableLink").val("Hide Table");
            $("#showTableLink").css("float","right");
        }else{
            $("#personalInfoTable").hide();
            $("#showTableLink").val("Show Table");
            $("#showTableLink").css("float","left");

        }


    });
    //Setting birthday's max value to current date
    var date=new Date().toJSON().slice(0,10);//sliced date down to the portion that i wanted (to remove additional info but date)
    console.log(date);
    var bDate=document.getElementById("bdate");
    bDate.max=date;
    
//    $(':input').not(':hidden, :checkbox, :radio').val('');
    
    $(':checkbox').prop('checked', false);
    $(':radio#care_no').prop('checked', true);
    $(':radio#contact_no').prop('checked', true);
    $(':radio#travel_no').prop('checked', true);
    
});

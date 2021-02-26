$(document).ready(function(){
    //fetching data from localstorage and assigning it into the relevent tag's value
    var personalDetails=JSON.parse(localStorage.getItem("personalDetails"));
    document.getElementById("date").innerHTML=new Date().toJSON().slice(0,10);
    //finding age...
    var date1=new Date(personalDetails.bdate);
    var date2=new Date();
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById("age").innerHTML=Math.floor(diffDays/365);

    document.getElementById("name").innerHTML += personalDetails.name +"<br>";
    document.getElementById("gender").innerHTML += personalDetails.gender;

    var severe=[];
    severe=JSON.parse(localStorage.getItem("severe"));
    
    var mild=[];
        mild=JSON.parse(localStorage.getItem("mild"));
    
    var normal=[];
    normal=JSON.parse(localStorage.getItem("normal"));
    var travel=localStorage.getItem("travel");
    var care=localStorage.getItem("care");
    var contact=localStorage.getItem("contact");
    //I've closely analyze each and every conditions and according to that i've set parameters which may not be 100% accurate
    //If i'll get time, before next assignment due, I'll add few more factors like age difference to make it more relevent
    
    document.getElementById("description").innerHTML="<b>symptoms</b>: <b style='font-weight:bolder'>";
    if(severe.length>0){
        document.getElementById("description").innerHTML+= "<span style='color:red'>"+severe.toString()+"</span>";
        if(mild.length>0){
            document.getElementById("description").innerHTML+=",";
        }
    }if(mild.length>0){
        document.getElementById("description").innerHTML+= "<span style='color:orange'>"+mild.toString()+"</span>";
        if(normal.length>0){
            document.getElementById("description").innerHTML+=",";
        }   
    }if(normal.length>0){
        document.getElementById("description").innerHTML+= "<span style='color:lightblue'>"+normal.toString()+"</span>";
    }
    document.getElementById("description").innerHTML+= ".</b><br><br><br>";
//    document.getElementById("description").innerHTML="<b>symptoms</b>: <b><mark>"+severe.toString()+","+mild.toString()+","+normal.toString()+".</mark></b><br><br>";
    if(severe.length==0){


        
        if(mild.length==0){

            
            if(normal.length==0 && ( travel==="No" && care==="No" && contact==="No")){
                document.getElementById("condition").innerHTML = "Safe";
                document.getElementById("condition").style.color="lightgreen";

                document.getElementById("description").innerHTML="Since you don’t have any COVID-19 symptoms, you don’t need to be tested for COVID-19.<br><br> <b>Please self-monitor, wash your hands frequently, and practice physical distancing.</b> If you develop any symptoms (fever, cough, sneezing, sore throat, or difficulty breathing), or become aware of any potential exposures to cases of COVID-19, take this self-assessment again. If you need more information, go to the Government of Canada’s Covid-19 website.";

            }else if(normal.length==0 && ( travel==="Yes" || care==="Yes" || contact==="Yes")){
                document.getElementById("condition").innerHTML = "normal";
                document.getElementById("condition").style.color="blue";
    //            data.forEach(Element => document.getElementById("description").innerHTML)
                document.getElementById("description").innerHTML="Please <b>self-isolate for 14 days.</b><br> You do not need testing for COVID-19.<br> Since you don't have symptoms, you do not need testing for COVID-19 at this time. However, there’s a chance you could get sick since it’s less than 14 days since your exposure. You should self-monitor for any symptoms (fever, cough, sneezing, sore throat, or difficulty breathing). If you begin to develop these, you should take this self-assessment again.";

            }else if(normal.length>=1 && ( travel==="Yes" || care==="Yes" || contact==="Yes")){
                document.getElementById("condition").innerHTML = "risky";
                document.getElementById("condition").style.color="darkblue";
//                document.getElementById("description").innerHTML="<b>symptoms</b>: <b><mark>"+normal.toString()+".</mark></b><br><br>";

                document.getElementById("description").innerHTML+="Please <b>self-isolate for 14 days.</b><br> If your symptoms worsen, please check back in.<br> Because you have (or had) symptoms, you should self-isolate <b>for 14 days</b>. That means not going to any public places, staying at home, and not having any visitors. Don\'t share personal items like dishes, utensils, or towels, and wash your hands often.";
            }else{
                document.getElementById("condition").innerHTML = "normal";
                document.getElementById("condition").style.color="blue";
//                document.getElementById("description").innerHTML="<b>symptoms</b>: <b><mark>"+normal.toString()+".</mark></b><br><br>";

                document.getElementById("description").innerHTML+="<b>Please stay at home.</b> As a precaution, the Public Health Agency of Canada is asking <b>anyone with symptoms</b> (fever, cough, sneezing, sore throat, or difficulty breathing) to <b>stay home for 14 days.</b>";
            }
        }else{
            document.getElementById("condition").innerHTML = "Mild";
            document.getElementById("condition").style.color="orange";
//             document.getElementById("description").innerHTML="<b>symptoms</b>: <b><mark>"+mild.toString()+".</mark></b><br><br>";
    //            data.forEach(Element => document.getElementById("description").innerHTML)
            document.getElementById("description").innerHTML+="Please consult your family doctor. If you are unable to reach your regular health care provider, call Telehealth.<br>  healthcare provider will need to speak to you about your symptoms in more detail.";
//            console.log(data);
        }

    }else{
        document.getElementById("condition").innerHTML = "Severe";
        document.getElementById("condition").style.color="red";
//        document.getElementById("description").innerHTML="<b>symptoms</b>: <b><mark>"+severe.toString()+".</mark></b><br><br>";
    //            data.forEach(Element => document.getElementById("description").innerHTML)
        document.getElementById("description").innerHTML+="Please<b> call 911</b> or go directly to your nearest<b> emergency department.</b><br>"+
                                                        "These symptoms require <b>immediate attention</b>. You should call 911 immediately, or go directly to your nearest emergency department.";
//        console.log(data);
    //            data.forEach(element => document.getElementById("result").innerHTML += (element+"<br>"));
    //            
    }    
    var sendData={}; 
    sendData['personalDetails']=personalDetails;
    sendData['severe']=JSON.parse(localStorage.getItem("severe"));
    sendData['mild']=JSON.parse(localStorage.getItem("mild"));
    sendData['normal']=JSON.parse(localStorage.getItem("normal"));
    sendData['travel']=localStorage.getItem("travel");
    sendData['care']=localStorage.getItem("care");
    sendData['contact']=localStorage.getItem("contact");
    console.log(sendData);
    
    fetch('https://aiproject001.000webhostapp.com/setData.php', {
        method: 'post',
        body: JSON.stringify(sendData)
      })
        .then(response=>response.json())
        .then(data=>{
        console.log('Received Data:', data);
      });
})

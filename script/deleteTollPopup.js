//deleteAlert is show delete popup 
function deleteAlert(e){
   let tollName = e.target.parentNode.firstChild.innerText,
       alertBox = document.getElementsByClassName('deleteAlert')[0];
   alertBox.style.display = "block";
   document.getElementById('deleteAlertMsg').innerText = `Are you sure to delete ${tollName} tolls and vehicle entries records?`
   alertBox.style.opacity = 1;
   document.getElementsByClassName('deleteBtn1')[0].onclick = function(){
      deleteToll(tollName);
      alertBox.style.display = "none";
      popupAlert(`${tollName} tolls and entries records are removed successfully!`);
   };
   document.getElementsByClassName('deleteBtn2')[0].onclick = function(){
      hidePopup(true);
   };
}

//delete toll and show filtered tolls
function deleteToll(tollName){
     for(let i = 0; i <entries.length;i++){
        entries = entries.filter((entry) => !entry["toll Name"].includes(tollName));
     }
     for(let i = 0; i <tolls.length; i++){
        tolls = tolls.filter((toll) => !toll["tollName"].includes(tollName));
     }
     modifier();
     searchToll(document.getElementById('searchTollAction'));
     //in case user delete same dropOption and tollName then show All tolls
     (dropTollSelected == tollName) ? dropTollSelected ="All":"";
     (!drop) ? dropTolls() : "" ;
     setUpdateData();
}

function popupAlert(msg){
   document.getElementById('alertMsg').innerText = msg;
   document.getElementsByClassName('alert')[0].style.display = "block";
   document.getElementsByClassName('alert')[0].style.opacity = 1;
   document.getElementsByClassName("alertClosebtn")[0].onclick = hidePopup;
   setTimeout(hidePopup, 1000);
}

//hide popup with animation
function hidePopup(e){
   let div = (e) ? document.getElementsByClassName('deleteAlert')[0] : 
   document.getElementsByClassName('alert')[0];
   div.style.opacity = "0";
   (e) ? setTimeout(function(){ div.style.display = "none"; }, 400) : setTimeout(function(){ div.style.display = "none"; }, 2000);
}   
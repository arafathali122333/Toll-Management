// hide is used to hide already selected vehicle type
// dropTollSelected, drop, buttonTracker is trackered by recent value
let hide=[null, null, null, null],
    entriesTH=["vehicle Type","vehicle Number","date/Time","toll Name","tariff"],
    tollsTH=["toll Name","Car/Jeep/Van","LCV","Truck/Bus","Heavy vehicle",""],
    dropTollSelected="All", modifiedTolls=[],
    drop=true,tolls,entries, buttonTracker=true;

//update data localStorage
function setUpdateData() {
    localStorage.setItem("tolls",JSON.stringify(tolls));
    localStorage.setItem("entries",JSON.stringify(entries));
}

//get data from localStorage
function getUpdateData() {
    tolls=localStorage.getItem('tolls') ? JSON.parse(localStorage.getItem('tolls')) : [];
    entries=localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [];
}

getUpdateData();

//openForm is show add toll and entries dom
function openForm(e){
    if(e.className == "add-toll"){
        document.getElementsByClassName('form-popup')[0].style.display = 'block';
    }
    else{
        if(tolls.length>0){
        //show toll option in add entry form
        document.getElementById('tollNameSelect').innerHTML="";
        for(let i = 0; i <tolls.length; i++){
            let select = document.createElement('option');
            select.innerText = select.value = tolls[i].tollName;
            document.getElementById('tollNameSelect').appendChild(select);
        }
        document.getElementsByClassName('form-popup2')[0].style.display = 'block';
        }
        else {
            // add entries with no tolls
            popupAlert("No Tolls Found, So Please Add Some Toll");
        }
    }
}

//this function used for remove E,e,-,+ element in single and return journey
function negativeValRemover(e){
    e.target.value = e.target.value.replace(/[eE +-]/g, '');
}

////openForm is hide add toll and entries dom
function closeForm(e){
    if(e.className == "toll-cancel"){
        document.getElementsByClassName('form-popup')[0].style.display = 'none';
    }
    else{
        document.getElementsByClassName('form-popup2')[0].style.display = 'none';
    }
}

//tollChecker is check tollname is new or not
function tollChecker(e){
    for(let i=0;i<tolls.length;i++){
        if(tolls[i].tollName.toUpperCase()==e.value.trim().toUpperCase()){
            document.getElementsByClassName('alertTag')[0].style.display = 'block';
            return true;
        }
    }
    document.getElementsByClassName('alertTag')[0].style.display = 'none';
}


function addNewToll(e){
    e.preventDefault();
    let toll = Object.fromEntries(new FormData(e.target).entries()),
        shows= ['Car/Jeep/Van','LCV','Truck/Bus','Heavy vehicle',''],
        data={
            tollName: toll.tollName.trim(),
            vehicleFare: [{type: toll.vehicleType1, singleJourney:toll.singleJourney1, returnJourney:toll.returnJourney1},
                {type: toll.vehicleType2, singleJourney:toll.singleJourney2, returnJourney:toll.returnJourney2},    
                {type: toll.vehicleType3, singleJourney:toll.singleJourney3, returnJourney:toll.returnJourney3},
                {type: toll.vehicleType4, singleJourney:toll.singleJourney4, returnJourney:toll.returnJourney4}
            ]
        };
    if(!tollChecker({value:toll.tollName})){
        tolls.push(data);
        setUpdateData();
        e.target.reset();
        document.getElementsByClassName('form-popup')[0].style.display = 'none';
        hide=[null,null,null,null];
        removeHide(shows);
        (!buttonTracker) ? (modifier(), searchToll(document.getElementById('searchTollAction'))) : "";
        popupAlert(`${data.tollName} toll has been added successfully!`);
        (!drop) ? dropTolls() : "" ;
    }
}

//hide select tag in already selected vehicle type
function resVTC(thisSelect) {
    let otherSelectId = thisSelect.id,
        show=['Car/Jeep/Van','LCV','Truck/Bus','Heavy vehicle',''];
        hide[parseInt(otherSelectId)]=thisSelect.value;
        for(let j=0;j<hide.length;j++){
                let otherSelect = document.getElementById(j+"vehicle");
                for (let i = 0; i < otherSelect.options.length; i++) {
                    for(let k = 0; k <hide.length;k++){
                        if (otherSelect.options[i].value == hide[k]) {
                            otherSelect.options[i].setAttribute('hidden', 'hidden');
                        }
                        if(show[k]==hide[j] && hide[j]) {
                            show.splice(k,1);
                        }
                }
            }
        }
        removeHide(show);
} 

// show select tag in already selected vehicle type
function removeHide(show){
    for(let j=0;j<hide.length;j++){
        let otherSelect = document.getElementById(j+"vehicle");
        for (let i = 0; i < otherSelect.options.length; i++) {
            for(let j = 0; j < show.length; j++){
                if (otherSelect.options[i].value == show[j]) {
                    otherSelect.options[i].removeAttribute('hidden');
                }
            }
        }
    }
}
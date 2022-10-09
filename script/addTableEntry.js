// filterEntries get filtered entries tracker
let filterEntries=entries;

function addNewEntry(e){
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target).entries()),
        dateTime = new Date(),
        tariff = tariffChange();
    entries.push({
        "vehicle Type": data.vehicleType,
        "vehicle Number": data.vehicleNumber.trim(),
        "date/Time": dateTime.getTime(),
        "toll Name": data.tollName,
        "tariff": tariff
    });
    setUpdateData();
    //this buttonTracker ternary operator check filtered tolls records
    (buttonTracker) ? filterToll({target:{innerText:dropTollSelected}}): "";
    e.target.reset();
    document.getElementsByClassName('form-popup2')[0].style.display = 'none';
    popupAlert(`${data.vehicleNumber.toUpperCase()} vehicle entry added in ${data.tollName} toll successfully! `);
}

//addTable both tolls, entries, filtered tolls and entries
function addTable(arr,heads){
    if(arr.length>0) {
            let tr=document.createElement("tr");
            for(let i=0;i<heads.length;i++){
                let th= document.createElement("th");
                th.innerText=heads[i];
                tr.appendChild(th);
            }
            document.getElementsByClassName('tollsEntries')[0].appendChild(tr);
        for(let i=0;i<arr.length;i++){
                let tr=document.createElement("tr");
                let td= document.createElement("td");
                td.innerText = arr[i][heads[0]];
                tr.appendChild(td);
                td= document.createElement("td");
                td.innerText = arr[i][heads[1]];
                tr.appendChild(td);
                td= document.createElement("td");
                td.innerText = (heads[2]=='date/Time') ? dateTime(arr[i][heads[2]]) : arr[i][heads[2]];
                tr.appendChild(td);
                td= document.createElement("td");
                td.innerText = arr[i][heads[3]];
                tr.appendChild(td);
                td= document.createElement("td");
                td.innerText = arr[i][heads[4]];
                tr.appendChild(td);
                (heads[5]!=undefined) ? (td= document.createElement("td"),
                td.onclick=deleteAlert,
                td.className="deleteIcon",
                td.innerText = "🗑️",
                tr.appendChild(td)):"";
                document.getElementsByClassName('tollsEntries')[0].appendChild(tr);
        }
    }
   else{
       let div = document.createElement('div');
       div.innerText = (buttonTracker) ? "😔 No Entries Found" : "😔 No Tolls Found";
       div.className = "no-found";
       document.getElementsByClassName('tollsEntries')[0].appendChild(div);
   }
}

//convert timestamp to date/Time
function dateTime(timeStamp){
    let time = new Date(timeStamp);
    return time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + ", " +
            time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

//webpage onload call addTable function
addTable(entries,entriesTH);


function tariffChange(){
    let tollName = document.getElementById("tollNameSelect").value,
        vehicleType = document.getElementById("vehicleType").value,
        vehicleNumber = document.getElementById("vehicleNumber").value.trim(),
        durationInSec = 3600,
        time = new Date().getTime(),
        singleJourney, returnJourney;
        //get single and return journey with selected inputs
        if(tollName && vehicleType && vehicleNumber){
            for(let i=0;i<tolls.length;i++){
                if(tolls[i].tollName==tollName){
                    let current = tolls[i].vehicleFare;
                    for(let j=0;j<current.length;j++){
                        if(current[j].type==vehicleType){
                            singleJourney= current[j].singleJourney;
                            returnJourney= current[j].returnJourney;
                        }
                    }
                }
            }
        }

        //show single or return journey in tariff with respect to time duration
        if(singleJourney && returnJourney && singleJourney!=returnJourney){
            for(let i=entries.length-1;i>=0;i--){
                if(entries[i]['toll Name'] == tollName && entries[i]['vehicle Type'] == vehicleType && 
                   entries[i]['vehicle Number'].toUpperCase() == vehicleNumber.toUpperCase()){
                    if(entries[i]['tariff']==returnJourney){
                        document.getElementsByClassName('not-allowed')[0].value=singleJourney;
                        return singleJourney;
                    }
                    else if(entries[i]['tariff']==singleJourney){
                        if(Math.floor((time - entries[i]['date/Time'])/1000) < durationInSec){
                            document.getElementsByClassName('not-allowed')[0].value=returnJourney;
                            return returnJourney;
                        }
                    }
                }
            }
        }
        document.getElementsByClassName('not-allowed')[0].value=singleJourney;
        return singleJourney;
}

/*Note: tariff is calculated by previous journey is single or return with respect to time descending.
  if singleJourney check timing to return single or return journey.otherwise return singleJourney.
  because user return and single journey multiple times. 
*/
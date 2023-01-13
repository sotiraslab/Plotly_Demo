function makeHeader(data) {
    // code to be executed
    let row = document.createElement('tr');
    for (let i = 0; i < data.length; i++){
        var heading = document.createElement('th');
        heading.innerHTML = data[i];
        row.appendChild(heading)
    }

    return row
}

function addRow(data){
    // code to be executed
    let row = document.createElement('tr');
    for (let i = 0; i < data.length; i++){
        var heading = document.createElement('th');
        if(i == 0){
            heading.innerText = data[i];
        }else{
            img = add_image(data[i]);
            heading.appendChild(img);
        }
        row.appendChild(heading);
    }

    return row
}

function add_image(img_url){
    var img = document.createElement('img');
    img.src = img_url;
    img.width = 320;
    img.height = 384;
    return img
}


let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('body').appendChild(table);

header = makeHeader(new Array("Slice", "T1", "T1c", "T2", "Flair", "GT", "Prediction", "Error Map[Pred] "+ urlParams.get('Diff_Dice'), "Error Map[GT]" ))
thead.appendChild(header);

slices = urlParams.get('slice').split("_");
var data_files = [];
base_url = urlParams.get('base_url');
base_url = base_url + "/plot_" + urlParams.get('mode') + "/" + urlParams.get('id') + "/";
for (let i = 0; i < slices.length; i++){
    data_files[i] = new Array(slices[i], 
    base_url+slices[i] + "/T1.png", 
    base_url+slices[i] + "/T1c.png", 
    base_url+slices[i] + "/T2.png", 
    base_url+slices[i] + "/Flair.png", 
    base_url+slices[i] + "/GT.png", 
    base_url+slices[i] + "/Prediction.png", 
    base_url+slices[i] + "/Diff_Pred.png", 
    base_url+slices[i] + "/Diff_GT.png"
    );
}

for (let i = 0; i < data_files.length; i++){
    row = addRow(data_files[i]);
    tbody.appendChild(row);
}
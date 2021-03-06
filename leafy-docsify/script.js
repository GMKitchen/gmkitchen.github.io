// editable info

const publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/1eWukktR9bgAEf8DV4Rv4lm2dgEE2MjrtWIf7j5q0-qk/edit?usp=sharing"; // change this to your own URL
const categoryStartNum = 4; // let the program know where the categoy begins on the spreadsheet column. Default value is 3.
const sheetName = "Sheet1"; // this has to match your google doc sheet name
const punctuation = " - "; // this changes the punctuation between the title and the description. In most cases you'd want to use "," or "-" or ":"

// tableTop.js script
function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  const checked = "x";
  const columnArray = tabletop.sheets()[sheetName].columnNames;
  const columnName = [columnArray.length];

  for (let j = 0; j < columnArray.length; j++) {
    columnName[j] = columnArray[j];
  }

  // create sorting buttons
  for (let j = categoryStartNum; j < columnArray.length; j++) {
    addButton(columnName[j]);
  }

  for (let i = categoryStartNum; i < columnArray.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j][columnName[i]] == checked) {
        addElement(
          columnName[i],
          data[j][columnName[0]],
          data[j][columnName[1]],
          data[j][columnName[2]],
					data[j][columnName[3]]
        );
      }
    }
  }
  // alert("Successfully processed!"); // check if data is imported
}

function addButton(columnName) {
  const newButton = document.createElement("BUTTON");
  const newButtonContent = document.createTextNode(columnName);

  newButton.appendChild(newButtonContent);
  newButton.className = "btn";
  newButton.addEventListener("click", function() {
    filterSelection(columnName);
    btnOff(); // turns off all active buttons
    newButton.classList.add("active"); // turn this button on
  });
  document.getElementById("myBtnContainer").appendChild(newButton);
}

function btnOff() {
  let btnClassArray = document.getElementsByClassName("btn");
  for (let i = 0; i < btnClassArray.length; i++) {
    if (btnClassArray[i].classList.contains("active")) {
      btnClassArray[i].classList.remove("active");
    }
  }
}

function addElement(columnName, title, url, author, description) {
  const hashtag1 = ["filterDiv"];
  const hashtag2 = [columnName];
  const hashtagArray = hashtag1.concat(hashtag2);
  const hashtagString = hashtagArray.join(" ");
  const newRow = document.createElement("tr");
  newRow.className = hashtagString;

  // place individual link inside individual div
  for (let i = 0; i < 1; i++) {
    let link = document.createElement("a");
    let linkContent = document.createTextNode(title);
    link.appendChild(linkContent);
    link.title = title;
    link.href = url;
    // linke.className = "itemLink";

		let coll0 = document.createElement("td");
		coll0.appendChild(link);

		let coll1 = document.createElement("td");
		let coll1Content = document.createTextNode(`${author}`);
		coll1.appendChild(coll1Content);

		let coll2 = document.createElement("td");
		let coll2Content = document.createTextNode(`${description}`);
		coll2.appendChild(coll2Content)
    // coll1.className = "itemDescription";

		newRow.appendChild(coll0);
		newRow.appendChild(coll1);
		newRow.appendChild(coll2);// put <p> into newDiv
    // let para = document.createElement("td");
    // let paraContent = document.createTextNode(`${punctuation} ${author}`);
    // para.appendChild(paraContent);
    // para.className = "itemPara";

    // para.appendChild(link); // put <a> into <p>
    // link.after(paraContent); // put <p> description after <a>
    // newDiv.appendChild(para); // put <p> into newDiv
  }
  document.getElementsByClassName("container")[0].appendChild(newRow);
}

window.addEventListener("DOMContentLoaded", init);

// filter script
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

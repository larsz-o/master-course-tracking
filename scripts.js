var updated = [];
var sheetsList = [];

function getLatestTerms() {
  for (var j = 1; j < sheetsList.length; j++){
    var sheet = SpreadsheetApp.getActiveSheet().getRange(sheetsList[j] + '!A2:D150').getValues();
  for(var i = 0; i < sheet.length; i++){
    if (sheet[i][3] === true){
      updated.push({term: sheet[i][2], index: i, course: sheet[i][0], year: sheetsList[j]});
      }
    
    }
  }
  getAll();
  }

function getAll(){
  var sheet = SpreadsheetApp.getActiveSheet().getRange('Course_List!A2:A142').getValues();
  for (var i = 0; i < updated.length; i++){
    for (var j = 0; j < sheet.length; j++){
      if (updated[i].course === sheet[j][0]){
        SpreadsheetApp.getActiveSheet().getRange('Course_List!C' + (j+2)).setValue(updated[i].term + ' ' + updated[i].year);
        Logger.log('match');
      }
    }
  }
}
function getSheets(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (var i = 0; i < sheets.length; i++){
    sheetsList.push(sheets[i].getName());
  }
  getLatestTerms();
}

function onEdit(){
  getSheets();
}
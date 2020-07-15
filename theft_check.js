console.log('in theft check');

const route = require('express').Router()
const Excel = require('exceljs');

   route.post('/',(req,res)=>{

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile("DATASET.xlsx")
      .then(function() {
        var worksheet_row = workbook.getWorksheet('Sheet1').getColumn('A').values
        let resp = 'not found';
         for(let i=0;i<worksheet_row.length;i++){
             if( worksheet_row[i] == req.body.carNumber){
                 resp = "found"
                 break;
             }
         }
         res.send(resp);
      })
      .catch((err)=>{
        console.log('Not Found')
      });
})

module.exports = route
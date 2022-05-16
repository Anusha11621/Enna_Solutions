import { Component } from '@angular/core';
const csv2json = require('../assets/csv2json.js')


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'assignment';
  p:number = 1;
  totalassets=0;
  nameinput="";
  finalresult:any =[{}];
  productgroup:any
  constructor() {}
  process(event:any){
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsText(file)

    reader.onload = () => {
      let data =  reader.result
      let json =  csv2json(data)

      let result = json.reduce(function (r:any, a:any) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
      }, Object.create(null));

      this.productgroup = result
      
      let keys = Object.keys(result)

      this.finalresult=[]
      
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        let temprecords = result[element]


        let batches = new Set();
        // calculating all unique batches
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          batches.add(element["batch"]);
        }
        let batchesarray = Array.from(batches);
        
        // calculating stock sum
        let stocksum = 0
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          stocksum = stocksum + parseInt(element["stock"])
        }
        //calculating free parameter across batches 
        let minimumfree = 0
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          minimumfree = Math.min(minimumfree,element["free"])
        }
        //calculating deal parameter across batches
        let minimumdeal = 0
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          minimumdeal = Math.min(minimumdeal,element["deal"])
        }
        //calculating max MRP 
        let maximummrp = 0
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          maximummrp = Math.max(maximummrp,element["mrp"])
        }
        //calculating max Rate
        let maximumrate = 0
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          maximumrate = Math.max(maximumrate,element["rate"])
        }
        //calculating nearest date across batches
        let nearestdate = ""
        for (let index = 0; index < temprecords.length; index++) {
          const element = temprecords[index];
          
          if (nearestdate === "" ){
            nearestdate = element["exp"]
          }
          else{
            var d1 = new Date(nearestdate)
            var d2 = new Date(element["exp"])
            if(d2<d1){
              nearestdate = d2.toLocaleDateString()
            }
          }
          
        }
        //Forming product to aggregated parameters 
        let tempaggobject = {
          "name" : element,
          "batch" : batchesarray,
          "stock" : stocksum,
          "free" :  minimumfree,
          "deal" : minimumdeal,
          "mrp" : maximummrp,
          "rate" : maximumrate,
          "exp" : nearestdate,     
        }
        //push the above object to the final array 
        this.finalresult.push(tempaggobject)
        
      }  
      this.totalassets = this.finalresult.length
    }
  } 
  onBatchSelect(batchevent:any, productname:any){

   
    let productnamegroup =  this.productgroup[productname];

    let records=[];
     for (let index = 0; index < productnamegroup.length; index++) {
       const element = productnamegroup[index];
       if(element.batch === batchevent.target.value){
         records.push(element);
       }
     }
     window.alert(JSON.stringify(records))
 }
}

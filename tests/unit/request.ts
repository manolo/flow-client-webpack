const { suite, test } = intern.getInterface("tdd");
const { assert } = intern.getPlugin("chai");

import esriRequest from "esri/request";

suite("request", () => {
   test("should resolve a Promise", () => {
        function solvePromise(resolve:any, reject:any) {
          const req = new XMLHttpRequest();
          req.onreadystatechange = function(event) {
              if (this.readyState === XMLHttpRequest.DONE) {
                  if (this.status === 200) {
                      resolve(this.responseText);
                  }
              }
          };
          req.open('GET', 'https://services.arcgisonline.com/arcgis/rest/services?f=json', true);
          req.send(null);
        }
  
        var promise = new Promise(solvePromise);
        return promise.then(function(value:string) {
          assert.equal(JSON.parse(value).currentVersion, '10.6');
        });
    });

    test("should resolve ESRI Promise", async () => {
        return esriRequest('https://services.arcgisonline.com/arcgis/rest/services?f=json', {
        responseType: "json"
        }).then(function(response:any){
        assert.equal(response.data.currentVersion, '10.6');
        });
    });

});
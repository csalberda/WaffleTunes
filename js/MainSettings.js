/******************************************************************************
* Creates the main settings menu for the given main
*******************************************************************************/
function MainSettings() {

   //create main content div
   var mainSettingsOverlayDiv = document.createElement("div");
   mainSettingsOverlayDiv.id = "mainSettingsOverlay";

   this.mainSettingsDiv = document.createElement("div");
   this.mainSettingsDiv.id = "mainSettings";

   this.mainSettingsTitle = document.createElement("h1");
   this.mainSettingsTitle.id = "mainSettingsTitle";
   this.mainSettingsTitle.innerHTML = "Tune Settings";
   this.mainSettingsDiv.appendChild(this.mainSettingsTitle);

   this.createMainSettingsTimeSignature(this.mainSettingsDiv);
   this.createMainSettingsNumOfMeasures(this.mainSettingsDiv);
   this.createMainSettingsFooter(this.mainSettingsDiv);

   mainSettingsOverlayDiv.appendChild(this.mainSettingsDiv);
   document.body.appendChild(mainSettingsOverlayDiv);
}

/******************************************************************************
* Define the low note and the high note in the grid
*******************************************************************************/
MainSettings.prototype.createMainSettingsTimeSignature = function(){
   var mainSettingsTimeSignatureHeader = document.createElement("h1");
   mainSettingsTimeSignatureHeader.className = "mainSettingsCenterElement";
   mainSettingsTimeSignatureHeader.innerHTML = "Time Signature";

   this.mainSettingsTimeSignature = document.createElement("input");
   this.mainSettingsTimeSignature.id = "mainSettingsTimeSignature";
   this.mainSettingsTimeSignature.className = "mainSettingsCenterElement";
   this.mainSettingsTimeSignature.type = "text";
   this.mainSettingsTimeSignature.value = Tune.timeSignature;


   this.mainSettingsDiv.appendChild(mainSettingsTimeSignatureHeader);
   this.mainSettingsDiv.appendChild(this.mainSettingsTimeSignature);
}

/******************************************************************************
* Pick the color of the main
* TODO: find a good color picker tool
*******************************************************************************/
MainSettings.prototype.createMainSettingsNumOfMeasures = function(){

   var mainSettingsNumOfMeasuresHeader = document.createElement("h1");
   mainSettingsNumOfMeasuresHeader.className = "mainSettingsCenterElement";
   mainSettingsNumOfMeasuresHeader.innerHTML = "Number of Measures";

   this.mainSettingsNumOfMeasures = document.createElement("input");
   this.mainSettingsNumOfMeasures.id = "mainSettingsNumOfMeasures";
   this.mainSettingsNumOfMeasures.className = "mainSettingsCenterElement";
   this.mainSettingsNumOfMeasures.type = "text";
   this.mainSettingsNumOfMeasures.value = Tune.numOfMeasures;

   this.mainSettingsDiv.appendChild(mainSettingsNumOfMeasuresHeader);
   this.mainSettingsDiv.appendChild(this.mainSettingsNumOfMeasures);
}

/******************************************************************************
* Create the cancel/save/and delete buttons
*******************************************************************************/
MainSettings.prototype.createMainSettingsFooter = function(){
   var _this = this;

   var mainSettingsFooterDiv = document.createElement("div");
   mainSettingsFooterDiv.id = "mainSettingsFooter";
   mainSettingsFooterDiv.className = "mainSettingsCenterElement";

   var mainSettingsExit = document.createElement("button");
   mainSettingsExit.type = "button";
   mainSettingsExit.id = "mainSettingsExit";
   mainSettingsExit.className = "mainSettingsButton";
   mainSettingsExit.addEventListener('click', function(e){
      _this.cancelMainSettings();
   });

   var mainSettingsSave = document.createElement("button");
   mainSettingsSave.type = "button";
   mainSettingsSave.id = "mainSettingsSave";
   mainSettingsSave.className = "mainSettingsButton";
   mainSettingsSave.addEventListener('click', function(e){
      _this.saveMainSettings();
   });

   var mainSettingsDelete = document.createElement("button");
   mainSettingsDelete.type = "button";
   mainSettingsDelete.id = "mainSettingsDelete";
   mainSettingsDelete.className = "mainSettingsButton";
   mainSettingsDelete.addEventListener('click', function(e){
      _this.deleteMain();
   });

   mainSettingsFooterDiv.appendChild(mainSettingsExit);
   mainSettingsFooterDiv.appendChild(mainSettingsSave);
   mainSettingsFooterDiv.appendChild(mainSettingsDelete);

   this.mainSettingsDiv.appendChild(mainSettingsFooterDiv);
}


/******************************************************************************
* Cancel/close the current dialog
*******************************************************************************/
MainSettings.prototype.cancelMainSettings = function(){
   console.log("cancelMainSettings");
   var mainSettingsOverlay = document.getElementById("mainSettingsOverlay");
   document.body.removeChild(mainSettingsOverlay);
}

/******************************************************************************
* saves the new settings
*******************************************************************************/
MainSettings.prototype.saveMainSettings = function(){
   console.log("saveMainSettings");

   Tune.timeSignature = mainSettingsTimeSignature.value;
   Tune.numOfMeasures = mainSettingsNumOfMeasures.value;

   this.cancelMainSettings();
}

/******************************************************************************
* Deletes all channels
*******************************************************************************/
MainSettings.prototype.deleteMain = function(){

   console.log("deleteAllChannels");

   for(var channelName in Tune.channels) {
      var channelDiv = document.getElementById(channelName);
      channelDiv.parentNode.removeChild(channelDiv);
      Tune.numOfChannels--;
   }
   stopPlayback();

   this.cancelMainSettings();
}

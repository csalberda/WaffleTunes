/******************************************************************************
* Creates the channel settings menu for the given channel
*******************************************************************************/
function ChannelSettings(_channelName) {
   this.channelName = _channelName;

   //create channel content div
   var channelSettingsOverlayDiv = document.createElement("div");
   channelSettingsOverlayDiv.id = "channelSettingsOverlay";

   this.channelSettingsDiv = document.createElement("div");
   this.channelSettingsDiv.id = "channelSettings";
   this.channelSettingsDiv.style.background = "gray";

   this.channelSettingsNameInput = document.createElement("input");
   this.channelSettingsNameInput.id = "channelSettingsName";
   this.channelSettingsNameInput.type = "text";
   this.channelSettingsNameInput.value = (Tune.channels[_channelName] == undefined)?"New Channel":Tune.channels[_channelName].customName;
   this.channelSettingsDiv.appendChild(this.channelSettingsNameInput);

   this.createChannelSettingsType(this.channelSettingsDiv);
   this.createChannelSettingsScale(this.channelSettingsDiv);
   this.createChannelSettingsRange(this.channelSettingsDiv);
   this.createChannelSettingsColor(this.channelSettingsDiv);
   this.createChannelSettingsFooter(this.channelSettingsDiv);

   channelSettingsOverlayDiv.appendChild(this.channelSettingsDiv);
   document.body.appendChild(channelSettingsOverlayDiv);
}

/******************************************************************************
* Should this instrument be a grid for a 'programmed' tune or
* a keyboard for improv :)
*******************************************************************************/
ChannelSettings.prototype.createChannelSettingsType = function(){
   var _this = this;

   var channelSettingsTypeDiv = document.createElement("div");
   channelSettingsTypeDiv.id = "channelSettingsType";
   channelSettingsTypeDiv.className = "channelSettingsCenterElement";

   var channelSettingsTypeHeader = document.createElement("h1");
   channelSettingsTypeHeader.className = "channelSettingsTitle";
   channelSettingsTypeHeader.innerHTML = "Input Type";

   //Tune.channels[this.channelName].type = "grid";
   this.channelSettingsTypeGrid = document.createElement("button");
   this.channelSettingsTypeGrid.type = "button";
   this.channelSettingsTypeGrid.id = "channelSettingsGrid";
   this.channelSettingsTypeGrid.className = "channelSettingsButtonDown";
   this.channelSettingsTypeGrid.addEventListener('click', function(){
      _this.typeSelected("grid");
   });

   this.channelSettingsTypeKeyboard = document.createElement("button");
   this.channelSettingsTypeKeyboard.type = "button";
   this.channelSettingsTypeKeyboard.id = "channelSettingsKeyboard";
   this.channelSettingsTypeKeyboard.className = "channelSettingsButtonUp";
   this.channelSettingsTypeKeyboard.addEventListener('click', function(){
      _this.typeSelected("keyboard");
   });

   channelSettingsTypeDiv.appendChild(channelSettingsTypeHeader);
   channelSettingsTypeDiv.appendChild(this.channelSettingsTypeGrid);
   channelSettingsTypeDiv.appendChild(this.channelSettingsTypeKeyboard);

   this.channelSettingsDiv.appendChild(channelSettingsTypeDiv);
}

/******************************************************************************
* Define chromatic vs diatonic
*******************************************************************************/
ChannelSettings.prototype.createChannelSettingsScale = function(){
   var _this = this;

   var channelSettingsScaleDiv = document.createElement("div");
   channelSettingsScaleDiv.id = "channelSettingsScale";
   channelSettingsScaleDiv.className = "channelSettingsCenterElement";

   var channelSettingsScaleHeader = document.createElement("h1");
   channelSettingsScaleHeader.className = "channelSettingsTitle";
   channelSettingsScaleHeader.innerHTML = "Scale";

   this.channelSettingsScaleDiatonic = document.createElement("button");
   this.channelSettingsScaleDiatonic.type = "button";
   this.channelSettingsScaleDiatonic.id = "channelSettingsDiatonic";
   this.channelSettingsScaleDiatonic.className = "channelSettingsButtonUp";
   this.channelSettingsScaleDiatonic.addEventListener('click', function(){
      _this.scaleSelected("diatonic");
   });

   //Tune.channels[this.channelName].scale = "diatonic";
   this.channelSettingsScaleChromatic = document.createElement("button");
   this.channelSettingsScaleChromatic.type = "button";
   this.channelSettingsScaleChromatic.id = "channelSettingsChromatic";
   this.channelSettingsScaleChromatic.className = "channelSettingsButtonDown";
   this.channelSettingsScaleChromatic.addEventListener('click', function(){
      _this.scaleSelected("chromatic");
   });

   channelSettingsScaleDiv.appendChild(channelSettingsScaleHeader);
   channelSettingsScaleDiv.appendChild(this.channelSettingsScaleDiatonic);
   channelSettingsScaleDiv.appendChild(this.channelSettingsScaleChromatic);

   this.channelSettingsDiv.appendChild(channelSettingsScaleDiv);
}

/******************************************************************************
* Define the low note and the high note in the grid
*******************************************************************************/
ChannelSettings.prototype.createChannelSettingsRange = function(){
   var channelSettingsRangeHeader = document.createElement("h1");
   channelSettingsRangeHeader.className = "channelSettingsTitle";
   channelSettingsRangeHeader.innerHTML = "Range";

   var channelSettingsRangeImage = document.createElement("img");
   channelSettingsRangeImage.id = "channelSettingsRangeImage";
   channelSettingsRangeImage.className = "channelSettingsCenterElement";

   var channelSettingsRangeHigh = document.createElement("input");
   channelSettingsRangeHigh.id = "channelSettingsHighNoteSlider";
   channelSettingsRangeHigh.className = "channelSettingsCenterElement";
   channelSettingsRangeHigh.type = "range";
   channelSettingsRangeHigh.min = 0;
   channelSettingsRangeHigh.max = 75;

   var channelSettingsRangeLow = document.createElement("input");
   channelSettingsRangeLow.id = "channelSettingsLowNoteSlider";
   channelSettingsRangeLow.className = "channelSettingsCenterElement";
   channelSettingsRangeLow.type = "range";
   channelSettingsRangeLow.min = 0;
   channelSettingsRangeLow.max = 75;

   this.channelSettingsDiv.appendChild(channelSettingsRangeHeader);
   this.channelSettingsDiv.appendChild(channelSettingsRangeImage);
   this.channelSettingsDiv.appendChild(channelSettingsRangeHigh);
   this.channelSettingsDiv.appendChild(channelSettingsRangeLow);

}

/******************************************************************************
* Pick the color of the channel
* TODO: find a good color picker tool
*******************************************************************************/
ChannelSettings.prototype.createChannelSettingsColor = function(){

   var channelSettingsRangeHeader = document.createElement("h1");
   channelSettingsRangeHeader.className = "channelSettingsTitle";
   channelSettingsRangeHeader.innerHTML = "Color";

   var channelSettingsColorSelector = document.createElement("input");
   channelSettingsColorSelector.id = "channelSettingsColorSlider";
   channelSettingsColorSelector.className = "channelSettingsCenterElement";
   channelSettingsColorSelector.type = "range";
   channelSettingsColorSelector.min = 0;
   channelSettingsColorSelector.max = 10;

   this.channelSettingsDiv.appendChild(channelSettingsRangeHeader);
   this.channelSettingsDiv.appendChild(channelSettingsColorSelector);
}

/******************************************************************************
* Create the cancel/save/and delete buttons
*******************************************************************************/
ChannelSettings.prototype.createChannelSettingsFooter = function(){
   var _this = this;

   var channelSettingsFooterDiv = document.createElement("div");
   channelSettingsFooterDiv.id = "channelSettingsFooter";
   channelSettingsFooterDiv.className = "channelSettingsCenterElement";

   var channelSettingsExit = document.createElement("button");
   channelSettingsExit.type = "button";
   channelSettingsExit.id = "channelSettingsExit";
   channelSettingsExit.className = "channelSettingsButtonUp";
   channelSettingsExit.addEventListener('click', function(e){
      _this.cancelChannelSettings();
   });

   var channelSettingsSave = document.createElement("button");
   channelSettingsSave.type = "button";
   channelSettingsSave.id = "channelSettingsSave";
   channelSettingsSave.className = "channelSettingsButtonUp";
   channelSettingsSave.addEventListener('click', function(e){
      _this.saveChannelSettings();
   });

   var channelSettingsDelete = document.createElement("button");
   channelSettingsDelete.type = "button";
   channelSettingsDelete.id = "channelSettingsDelete";
   channelSettingsDelete.className = "channelSettingsButtonUp";
   channelSettingsDelete.addEventListener('click', function(e){
      _this.deleteChannel();
   });

   channelSettingsFooterDiv.appendChild(channelSettingsExit);
   channelSettingsFooterDiv.appendChild(channelSettingsSave);
   channelSettingsFooterDiv.appendChild(channelSettingsDelete);

   this.channelSettingsDiv.appendChild(channelSettingsFooterDiv);
}






/******************************************************************************
* Type (Grid/Keyboard) selected
*******************************************************************************/
ChannelSettings.prototype.typeSelected = function(_strType){
   var _this = this;

   Tune.channels[_this.channelName].type = _strType;
   switch (_strType) {
      case "grid":
         _this.channelSettingsTypeGrid.className = "channelSettingsButtonDown";
         _this.channelSettingsTypeKeyboard.className = "channelSettingsButtonUp";
      break;
      case "keyboard":
         _this.channelSettingsTypeGrid.className = "channelSettingsButtonUp";
         _this.channelSettingsTypeKeyboard.className = "channelSettingsButtonDown";
      break;
   }
}

/******************************************************************************
* Scale (Diatonic/Chromatic) selected
*******************************************************************************/
ChannelSettings.prototype.scaleSelected = function(_strScale){
   var _this = this;

   Tune.channels[_this.channelName].scale = _strScale;
   switch (_strScale) {
      case "diatonic":
         _this.channelSettingsScaleDiatonic.className = "channelSettingsButtonDown";
         _this.channelSettingsScaleChromatic.className = "channelSettingsButtonUp";
      break;
      case "chromatic":
         _this.channelSettingsScaleDiatonic.className = "channelSettingsButtonUp";
         _this.channelSettingsScaleChromatic.className = "channelSettingsButtonDown";
      break;
   }
}

/******************************************************************************
* Cancel/close the current dialog
*******************************************************************************/
ChannelSettings.prototype.cancelChannelSettings = function(){
   var channelSettingsOverlay = document.getElementById("channelSettingsOverlay");
   document.body.removeChild(channelSettingsOverlay);
}

/******************************************************************************
* saves the new settings
*******************************************************************************/
ChannelSettings.prototype.saveChannelSettings = function(){
   console.log("saveChannelSettings");

   //Create the channel based on the settings inputs
   var newChannel = new Channel(
      this.channelSettingsNameInput.value,
      "bass",
      (this.channelSettingsTypeGrid.id == "channelSettingsGrid")? "grid":"keyboard",
      (this.channelSettingsScaleDiatonic.id == "channelSettingsDiatonic")? "diatonic":"chromatic"
   );

   this.cancelChannelSettings();
}

/******************************************************************************
* Deletes the entire specified channel
*******************************************************************************/
ChannelSettings.prototype.deleteChannel = function(){
   console.log("deleteChannel");
   var channelDiv = document.getElementById(this.channelName);
   channelDiv.parentNode.removeChild(channelDiv);
   Tune.numOfChannels--;

   if(Tune.numOfChannels == 0)
   stopPlayback();

   this.cancelChannelSettings();
}

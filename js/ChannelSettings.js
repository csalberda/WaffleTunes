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
   this.channelSettingsDiv.style.background = Tune.channels[_channelName].bgColor;

   this.channelSettingsNameInput = document.createElement("input");
   this.channelSettingsNameInput.id = "channelSettingsName";
   this.channelSettingsNameInput.type = "text";
   this.channelSettingsNameInput.value = Tune.channels[this.channelName]["name"];
   this.channelSettingsDiv.appendChild(this.channelSettingsNameInput);

   this.createChannelSettingsType(this.channelSettingsDiv);
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

   var channelSettingsTypeDiv = document.createElement("div");
   channelSettingsTypeDiv.id = "channelSettingsType";
   channelSettingsTypeDiv.className = "channelSettingsCenterElement";

   var channelSettingsTypeHeader = document.createElement("h1");
   channelSettingsTypeHeader.className = "channelSettingsTitle";
   channelSettingsTypeHeader.innerHTML = "Type";

   var channelSettingsTypeGrid = document.createElement("button");
   channelSettingsTypeGrid.type = "button";
   channelSettingsTypeGrid.id = "channelSettingsGrid";
   channelSettingsTypeGrid.className = "channelSettingsButton";

   var channelSettingsTypeKeyboard = document.createElement("button");
   channelSettingsTypeKeyboard.type = "button";
   channelSettingsTypeKeyboard.id = "channelSettingsKeyboard";
   channelSettingsTypeKeyboard.className = "channelSettingsButton";

   channelSettingsTypeDiv.appendChild(channelSettingsTypeHeader);
   channelSettingsTypeDiv.appendChild(channelSettingsTypeGrid);
   channelSettingsTypeDiv.appendChild(channelSettingsTypeKeyboard);

   this.channelSettingsDiv.appendChild(channelSettingsTypeDiv);
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
   channelSettingsExit.className = "channelSettingsButton";
   channelSettingsExit.addEventListener('click', function(e){
      _this.cancelChannelSettings();
   });

   var channelSettingsSave = document.createElement("button");
   channelSettingsSave.type = "button";
   channelSettingsSave.id = "channelSettingsSave";
   channelSettingsSave.className = "channelSettingsButton";
   channelSettingsSave.addEventListener('click', function(e){
      _this.saveChannelSettings();
   });

   var channelSettingsDelete = document.createElement("button");
   channelSettingsDelete.type = "button";
   channelSettingsDelete.id = "channelSettingsDelete";
   channelSettingsDelete.className = "channelSettingsButton";
   channelSettingsDelete.addEventListener('click', function(e){
      _this.deleteChannel();
   });

   channelSettingsFooterDiv.appendChild(channelSettingsExit);
   channelSettingsFooterDiv.appendChild(channelSettingsSave);
   channelSettingsFooterDiv.appendChild(channelSettingsDelete);

   this.channelSettingsDiv.appendChild(channelSettingsFooterDiv);
}


/******************************************************************************
* Cancel/close the current dialog
*******************************************************************************/
ChannelSettings.prototype.cancelChannelSettings = function(){
   console.log("cancelChannelSettings");
   var channelSettingsOverlay = document.getElementById("channelSettingsOverlay");
   document.body.removeChild(channelSettingsOverlay);
}

/******************************************************************************
* saves the new settings
*******************************************************************************/
ChannelSettings.prototype.saveChannelSettings = function(){
   console.log("saveChannelSettings");

   Tune.channels[this.channelName]["name"] = this.channelSettingsNameInput.value;
   var channelNameField = document.getElementById("channel"+this.channelName+"NameField");
   channelNameField.value = this.channelSettingsNameInput.value;


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

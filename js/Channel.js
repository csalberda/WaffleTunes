/******************************************************************************
* Creates all the necessary components for a new channel and adds it to the
* channels object.
*******************************************************************************/
function Channel(_channelName, _instrumentName, _type, _scale) {
   this._this = this;
   //Add to Tune object
   this.channelName = "channel"+Tune.numOfChannels;

   Tune.channels[this.channelName] = this;
   Tune.channels[this.channelName].customName = _channelName
   Tune.channels[this.channelName].instrument = _instrumentName;
   Tune.channels[this.channelName].bgColor = arrColors[Tune.numOfChannels%6];

   Tune.numOfChannels++;

   //Add channel div
   this.htmlChannelDiv = document.createElement("div");
   this.htmlChannelDiv.id = this.channelName;
   this.htmlChannelDiv.className = "channelContainer";
   this.htmlChannelDiv.name = this.channelName;

   document.getElementById("allChannelsContainer").appendChild(this.htmlChannelDiv);

   this.createNewChannelHeader();
   this.createNewChannelContent();
}

/******************************************************************************
* Creates all the necessary components for the new channel's header
*******************************************************************************/
Channel.prototype.createNewChannelHeader = function(){
   var _this = this;

   //create channel header div
   var htmlChannelHeaderDiv = document.createElement("div");
   htmlChannelHeaderDiv.id = this.channelName+"Header";
   htmlChannelHeaderDiv.className = "channelHeader";
   htmlChannelHeaderDiv.style.background = Tune.channels[this.channelName].bgColor;


   this.htmlExpandedButton = document.createElement("button");
   this.htmlExpandedButton.type = "button";
   this.htmlExpandedButton.id = "expandedIcon";
   this.htmlExpandedButton.className = "channelHeaderButtonUp";
   this.htmlExpandedButton.addEventListener('click', function(){
      _this.collapseChannel();
   });

   Tune.channels[this.channelName]["instrument"] = "bass";
   this.htmlInstrumentButton = document.createElement("button");
   this.htmlInstrumentButton.type = "button";
   this.htmlInstrumentButton.id = "bassIcon";
   this.htmlInstrumentButton.className = "channelHeaderButtonUp";
   this.htmlInstrumentButton.addEventListener('click', function(){
      _this.channelInstrument();
   });

   Tune.channels[this.channelName]["startOnLoop"] = false;
   this.htmlStartOnLoopButton = document.createElement("button");
   this.htmlStartOnLoopButton.type = "button";
   this.htmlStartOnLoopButton.id = "startOnLoop";
   this.htmlStartOnLoopButton.className = "channelHeaderButtonUp";
   this.htmlStartOnLoopButton.addEventListener('click', function(){
      _this.startChannelOnLoop();
   });

   Tune.channels[this.channelName]["stopOnLoop"] = false;
   this.htmlStopOnLoopButton = document.createElement("button");
   this.htmlStopOnLoopButton.type = "button";
   this.htmlStopOnLoopButton.id = "stopOnLoop";
   this.htmlStopOnLoopButton.className = "channelHeaderButtonUp";
   this.htmlStopOnLoopButton.addEventListener('click', function(){
      _this.stopChannelOnLoop();
   });

   this.htmlChannelNameField = document.createElement("input");
   this.htmlChannelNameField.type = "text";
   this.htmlChannelNameField.id = this.channelName+"NameField";
   this.htmlChannelNameField.className = "channelNameField";
   this.htmlChannelNameField.value = Tune.channels[this.channelName]["customName"];
   this.htmlChannelNameField.addEventListener('change', function(){
      _this.nameFieldChanged();
   });

   Tune.channels[this.channelName]["muted"] = false;
   this.htmlMuteButton = document.createElement("button");
   this.htmlMuteButton.type = "button";
   this.htmlMuteButton.id = "unmutedChannel";
   this.htmlMuteButton.className = "channelHeaderButtonUp";
   this.htmlMuteButton.addEventListener('click', function(){
      _this.muteChannel();
   });

   Tune.channels[this.channelName]["volume"] = 100;
   this.htmlChannelVolume = document.createElement("input");
   this.htmlChannelVolume.type = "range";
   this.htmlChannelVolume.min = 0;
   this.htmlChannelVolume.max = 100;
   this.htmlChannelVolume.value = 100;
   this.htmlChannelVolume.id = "channelVolume";
   this.htmlChannelVolume.addEventListener('change', function(){
      _this.channelVolumeChanged();
   });

   this.htmlClearButton = document.createElement("button");
   this.htmlClearButton.type = "button";
   this.htmlClearButton.id = "clearChannel";
   this.htmlClearButton.className = "channelHeaderButtonUp";
   this.htmlClearButton.addEventListener('click', function(){
      _this.clearChannel();
   });

   this.htmlSettingsButton = document.createElement("button");
   this.htmlSettingsButton.type = "button";
   this.htmlSettingsButton.id = "channelSettingsButton";
   this.htmlSettingsButton.className = "channelHeaderButtonUp";
   this.htmlSettingsButton.addEventListener('click', function(){
      new ChannelSettings(_this.channelName);
   });

   //Add them all to the channel header div
   htmlChannelHeaderDiv.appendChild(this.htmlExpandedButton);
   htmlChannelHeaderDiv.appendChild(this.htmlInstrumentButton);
   htmlChannelHeaderDiv.appendChild(this.htmlChannelNameField);

   htmlChannelHeaderDiv.appendChild(this.htmlStartOnLoopButton);
   htmlChannelHeaderDiv.appendChild(this.htmlStopOnLoopButton);
   htmlChannelHeaderDiv.appendChild(this.htmlMuteButton);
   htmlChannelHeaderDiv.appendChild(this.htmlChannelVolume);

   htmlChannelHeaderDiv.appendChild(this.htmlSettingsButton);
   htmlChannelHeaderDiv.appendChild(this.htmlClearButton);

   this.htmlChannelDiv.appendChild(htmlChannelHeaderDiv);
}

/******************************************************************************
* Creates the content div and adds the notes and table
*******************************************************************************/
Channel.prototype.createNewChannelContent = function(){

   //create channel content div
   this.htmlContentDiv = document.createElement("div");
   this.htmlContentDiv.id = this.channelName+"Content";
   this.htmlContentDiv.className = "channelContent";
   this.htmlChannelDiv.style.background = "dark"+Tune.channels[this.channelName].bgColor;


   this.createNewChannelNotes();
   this.createNewChannelTable();

   this.htmlChannelDiv.appendChild(this.htmlContentDiv);
}

/******************************************************************************
* Creates the instrument notes table/column
*******************************************************************************/
Channel.prototype.createNewChannelNotes = function(){
   var _this = this;

   var newNotes = document.createElement("table");
   newNotes.id = this.channelName+"Notes";
   newNotes.className = "channelNotes";

   for (var y=0; y<defaultTableHeight; y++) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");

      var button = document.createElement("button");
      button.type = "button";
      button.id = this.channelName+"_"+y;
      button.className = "tableButtonUp";
      button.innerHTML = arrScale[y];
      button.addEventListener('click', function(e){
         _this.instrumentNoteSelected(this);
      });

      td.appendChild(button);
      tr.appendChild(td)
      newNotes.appendChild(tr);
   }

   this.htmlContentDiv.appendChild(newNotes)
}

/******************************************************************************
* Creates the 'programmable' table
*******************************************************************************/
Channel.prototype.createNewChannelTable = function(){
   var _this = this;

   //Add table array to Tune object
   Tune.channels[this.channelName]["data"] = [];
   for (var x=0; x<Tune.getNumOfColumns(); x++) {
      Tune.channels[this.channelName].data.push([]);
      for (var y=0; y<defaultTableHeight; y++) {
         Tune.channels[this.channelName].data[x].push(0);
      }
   }

   //Add HTML table
   var newTable = document.createElement("table");
   newTable.id = this.channelName+"Table";
   newTable.className = "channelTable";

   for (var y=0; y<defaultTableHeight; y++) {
      var tr = document.createElement("tr");
      for (var x=0; x<Tune.getNumOfColumns(); x++) {

         var td = document.createElement("td");

         var button = document.createElement("button");
         button.id = this.channelName+"_"+x+"_"+y;
         button.type = "button";
         button.className = "tableButtonUp";

         if(!(parseInt(x/Tune.timeSignature)%2))
            button.style.angle = "0.8";

         button.addEventListener('click', function(e){
            _this.tableNoteSelected(this);
         });

         td.appendChild(button);
         tr.appendChild(td)
      }
      newTable.appendChild(tr);
   }

   this.htmlContentDiv.appendChild(newTable)
}

/******************************************************************************
* Collapse the specified channel's contents
*******************************************************************************/
Channel.prototype.collapseChannel = function(){
   if(this.htmlContentDiv.style.display == "none"){
      this.htmlContentDiv.style.display = "inline";
      this.htmlExpandedButton.id = "expandedIcon";
   }
   else{
      this.htmlContentDiv.style.display = "none";
      this.htmlExpandedButton.id = "collapsedIcon";
   }
}

/******************************************************************************
* Plays the given note
*******************************************************************************/
Channel.prototype.instrumentNoteSelected = function(_button){
   //parse button info from noteID
   var arr = _button.id.split("_")
   var channelName = arr[0];
   var row = parseInt(arr[1]);

   playNote(Tune.channels[channelName].instrument, row, Tune.tempo, 1.0);
}

/******************************************************************************
* Updates the tune data and html of the specified button
*******************************************************************************/
Channel.prototype.tableNoteSelected = function(_button){
   //parse button info from noteID
   var arr = _button.id.split("_")
   var channelName = arr[0];
   var col = parseInt(arr[1]);
   var row = parseInt(arr[2]);

   if(Tune.channels[channelName].data[col][row]){
      //update Tune data
      Tune.channels[channelName].data[col][row] = 0;
      //update HTML table
      _button.className = "tableButtonUp";
   }
   else{

      if(!Tune.bPlaying)
         playNote(Tune.channels[channelName].instrument, row, Tune.tempo, 1.0);

      //update Tune data
      Tune.channels[channelName].data[col][row] = Tune.tempo;
      //update HTML table
      _button.className = "tableButtonDown";
   }
}

/******************************************************************************
* Change the channels instrument
*******************************************************************************/
Channel.prototype.channelInstrument = function(){
   console.log("change channel instrument");
   arrInstuments = Object.keys(instruments);

   var index = arrInstuments.indexOf(Tune.channels[this.channelName].instrument);


   Tune.channels[this.channelName].instrument = arrInstuments[(index+1)%arrInstuments.length];
   this.htmlInstrumentButton.id = Tune.channels[this.channelName].instrument+"Icon";
}

/******************************************************************************
* Mute this channel
*******************************************************************************/
Channel.prototype.muteChannel = function(_bool){

   if(_bool == undefined)
   Tune.channels[this.channelName].muted = !Tune.channels[this.channelName].muted;
   else
   Tune.channels[this.channelName].muted = _bool;

   if(Tune.channels[this.channelName].muted)
   this.htmlMuteButton.id = "mutedChannel";
   else
   this.htmlMuteButton.id = "unmutedChannel";
}

/******************************************************************************
* Start specified channel on loop
*******************************************************************************/
Channel.prototype.startChannelOnLoop = function(){

   Tune.channels[this.channelName].startOnLoop = !Tune.channels[this.channelName].startOnLoop;
   this.htmlStartOnLoopButton.className = (Tune.channels[this.channelName].startOnLoop)?"channelHeaderButtonDown":"channelHeaderButtonUp";

   Tune.channels[this.channelName].stopOnLoop = false;
   this.htmlStopOnLoopButton.className = "channelHeaderButtonUp";
}

/******************************************************************************
* Stop specified channel on loop
*******************************************************************************/
Channel.prototype.nameFieldChanged = function(){

   Tune.channels[this.channelName].customName = this.htmlChannelNameField.value

}

/******************************************************************************
* Name field has changed
*******************************************************************************/
Channel.prototype.stopChannelOnLoop = function(_bool){

   Tune.channels[this.channelName].stopOnLoop = !Tune.channels[this.channelName].stopOnLoop;
   this.htmlStopOnLoopButton.className = (Tune.channels[this.channelName].stopOnLoop)?"channelHeaderButtonDown":"channelHeaderButtonUp";

   Tune.channels[this.channelName].startOnLoop = false;
   this.htmlStartOnLoopButton.className = "channelHeaderButtonUp";

}

Channel.prototype.checkLoopButtons = function(){

   if(Tune.channels[this.channelName].startOnLoop)
      this.muteChannel(false);
   else if (Tune.channels[this.channelName].stopOnLoop)
      this.muteChannel(true);

   this.htmlStartOnLoopButton.className = "channelHeaderButtonUp";
   this.htmlStopOnLoopButton.className = "channelHeaderButtonUp";
   this.startOnLoop = false;
   this.stopOnLoop = false;

}

/******************************************************************************
* Channel volume slider (0-100) -> (0.0-1.0)
*******************************************************************************/
Channel.prototype.channelVolumeChanged = function(){
   Tune.channels[this.channelName]["volume"] = this.htmlChannelVolume.value/100;

   if(this.htmlChannelVolume.value == 0){
      this.muteChannel(true);
   }
}

/******************************************************************************
* Erases the table data from the specified channel
*******************************************************************************/
Channel.prototype.clearChannel = function(){
   var channelDiv = document.getElementById(this.channelName);

   for (var y=0; y<defaultTableHeight; y++) {
      for (var x=0; x<Tune.getNumOfColumns(); x++) {

         //Update data
         Tune.channels[this.channelName].data[x][y] = 0;
         //Update HTML
         var button = document.getElementById(this.channelName+"_"+x+"_"+y);

         button.className = "tableButtonUp";
      }
   }
}

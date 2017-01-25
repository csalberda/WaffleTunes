/******************************************************************************
* Creates all the necessary components for a new channel and adds it to the
* channels object.
*******************************************************************************/
function Channel(_instrumentName) {
   this._this = this;
   //Add to Tune object
   this.channelName = "channel"+Tune.numOfChannels;

   Tune.channels[this.channelName] = {};
   Tune.channels[this.channelName].instrument = _instrumentName;
   Tune.channels[this.channelName].bgColor = arrColors[Tune.numOfChannels%6];

   Tune.numOfChannels++;

   //Add channel div
   this.channelDiv = document.createElement("div");
   this.channelDiv.id = this.channelName;
   this.channelDiv.className = "channelContainer";
   this.channelDiv.name = this.channelName;

   document.getElementById("allChannelsContainer").appendChild(this.channelDiv);

   this.createNewChannelHeader();
   this.createNewChannelContent();
}

/******************************************************************************
* Creates all the necessary components for the new channel's header
*******************************************************************************/
Channel.prototype.createNewChannelHeader = function(){
   var _this = this;

   //create channel header div
   var newChannelHeaderDiv = document.createElement("div");
   newChannelHeaderDiv.id = this.channelName+"Header";
   newChannelHeaderDiv.className = "channelHeader";
   newChannelHeaderDiv.style.background = Tune.channels[this.channelName].bgColor;


   this.expandedButton = document.createElement("button");
   this.expandedButton.type = "button";
   this.expandedButton.id = "expandedIcon";
   this.expandedButton.className = "channelHeaderButtonUp";
   this.expandedButton.addEventListener('click', function(){
      _this.collapseChannel();
   });

   Tune.channels[this.channelName]["instrument"] = "bass";
   this.instrumentButton = document.createElement("button");
   this.instrumentButton.type = "button";
   this.instrumentButton.id = "bassIcon";
   this.instrumentButton.className = "channelHeaderButtonUp";
   this.instrumentButton.addEventListener('click', function(){
      _this.channelInstrument();
   });

   Tune.channels[this.channelName]["muted"] = false;
   this.muteButton = document.createElement("button");
   this.muteButton.type = "button";
   this.muteButton.id = "unmutedChannel";
   this.muteButton.className = "channelHeaderButtonUp";
   this.muteButton.addEventListener('click', function(){
      _this.muteChannel();
   });

   Tune.channels[this.channelName]["startOnLoop"] = false;
   this.startOnLoopButton = document.createElement("button");
   this.startOnLoopButton.type = "button";
   this.startOnLoopButton.id = "startOnLoop";
   this.startOnLoopButton.className = "channelHeaderButtonUp";
   this.startOnLoopButton.addEventListener('click', function(){
      _this.startChannelOnLoop();
   });

   Tune.channels[this.channelName]["stopOnLoop"] = false;
   this.stopOnLoopButton = document.createElement("button");
   this.stopOnLoopButton.type = "button";
   this.stopOnLoopButton.id = "stopOnLoop";
   this.stopOnLoopButton.className = "channelHeaderButtonUp";
   this.stopOnLoopButton.addEventListener('click', function(){
      _this.stopChannelOnLoop();
   });

   Tune.channels[this.channelName]["name"] = "My Melody";
   this.channelNameField = document.createElement("input");
   this.channelNameField.type = "text";
   this.channelNameField.id = this.channelName+"NameField";
   this.channelNameField.className = "channelNameField";
   this.channelNameField.value = Tune.channels[this.channelName]["name"];

   this.clearButton = document.createElement("button");
   this.clearButton.type = "button";
   this.clearButton.id = "clearChannel";
   this.clearButton.className = "channelHeaderButtonUp";
   this.clearButton.addEventListener('click', function(){
      _this.clearChannel();
   });

   this.settingsButton = document.createElement("button");
   this.settingsButton.type = "button";
   this.settingsButton.id = "channelSettingsButton";
   this.settingsButton.className = "channelHeaderButtonUp";
   this.settingsButton.addEventListener('click', function(){
      new ChannelSettings(_this.channelName);
   });

   //Add them all to the channel header div
   newChannelHeaderDiv.appendChild(this.expandedButton);
   newChannelHeaderDiv.appendChild(this.instrumentButton);
   newChannelHeaderDiv.appendChild(this.channelNameField);

   newChannelHeaderDiv.appendChild(this.muteButton);
   newChannelHeaderDiv.appendChild(this.startOnLoopButton);
   newChannelHeaderDiv.appendChild(this.stopOnLoopButton);

   newChannelHeaderDiv.appendChild(this.settingsButton);
   newChannelHeaderDiv.appendChild(this.clearButton);

   this.channelDiv.appendChild(newChannelHeaderDiv);
}

/******************************************************************************
* Creates the content div and adds the notes and table
*******************************************************************************/
Channel.prototype.createNewChannelContent = function(){

   //create channel content div
   this.contentDiv = document.createElement("div");
   this.contentDiv.id = this.channelName+"Content";
   this.contentDiv.className = "channelContent";
   this.channelDiv.style.background = "dark"+Tune.channels[this.channelName].bgColor;


   this.createNewChannelNotes();
   this.createNewChannelTable();

   this.channelDiv.appendChild(this.contentDiv);
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

   this.contentDiv.appendChild(newNotes)
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
         button.addEventListener('click', function(e){
            _this.tableNoteSelected(this);
         });

         td.appendChild(button);
         tr.appendChild(td)
      }
      newTable.appendChild(tr);
   }

   this.contentDiv.appendChild(newTable)
}

/******************************************************************************
* Collapse the specified channel's contents
*******************************************************************************/
Channel.prototype.collapseChannel = function(){
   if(this.contentDiv.style.display == "none"){
      this.contentDiv.style.display = "inline";
      this.expandedButton.id = "expandedIcon";
   }
   else{
      this.contentDiv.style.display = "none";
      this.expandedButton.id = "collapsedIcon";
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

   playNote(Tune.channels[channelName].instrument, row, Tune.tempo);
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
      playNote(Tune.channels[channelName].instrument, row, Tune.tempo);
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
   this.instrumentButton.id = Tune.channels[this.channelName].instrument+"Icon";
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
   this.muteButton.id = "mutedChannel";
   else
   this.muteButton.id = "unmutedChannel";
}

/******************************************************************************
* Start specified channel on loop
*******************************************************************************/
Channel.prototype.startChannelOnLoop = function(){

   Tune.channels[this.channelName].startOnLoop = !Tune.channels[this.channelName].startOnLoop;
   this.startOnLoopButton.className = (Tune.channels[this.channelName].startOnLoop)?"channelHeaderButtonDown":"channelHeaderButtonUp";

   Tune.channels[this.channelName].stopOnLoop = false;
   this.stopOnLoopButton.className = "channelHeaderButtonUp";
}

/******************************************************************************
* Stop specified channel on loop
*******************************************************************************/
Channel.prototype.stopChannelOnLoop = function(_bool){

   Tune.channels[this.channelName].stopOnLoop = !Tune.channels[this.channelName].stopOnLoop;
   this.stopOnLoopButton.className = (Tune.channels[this.channelName].stopOnLoop)?"channelHeaderButtonDown":"channelHeaderButtonUp";

   Tune.channels[this.channelName].startOnLoop = false;
   this.startOnLoopButton.className = "channelHeaderButtonUp";

}

Channel.prototype.checkLoopButtons = function(){
   console.log("updateLoopButtons");

   if(Tune.channels[this.channelName].startOnLoop){
      console.log("start!");
      muteChannel(false);
   }
   else if (Tune.channels[this.channelName].stopOnLoop) {
      console.log("stop!");
      muteChannel(true);
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

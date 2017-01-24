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


   var expandedButton = document.createElement("button");
   expandedButton.type = "button";
   expandedButton.id = "expandedIcon";
   expandedButton.className = "channelHeaderButton";
   expandedButton.addEventListener('click', function(){
      _this.collapseChannel(this);
   });

   Tune.channels[this.channelName]["instrument"] = "bass";
   var instrumentButton = document.createElement("button");
   instrumentButton.type = "button";
   instrumentButton.id = "bassIcon";
   instrumentButton.className = "channelHeaderButton";
   instrumentButton.addEventListener('click', function(){
      _this.channelInstrument(this);
   });

   Tune.channels[this.channelName]["muted"] = false;
   var muteButton = document.createElement("button");
   muteButton.type = "button";
   muteButton.id = "unmutedChannel";
   muteButton.className = "channelHeaderButton";
   muteButton.addEventListener('click', function(){
      _this.muteChannel(this);
   });

   Tune.channels[this.channelName]["startOnLoop"] = false;
   var startOnLoopButton = document.createElement("button");
   startOnLoopButton.type = "button";
   startOnLoopButton.id = "startOnLoop";
   startOnLoopButton.className = "channelHeaderButton";
   startOnLoopButton.addEventListener('click', function(){
      _this.startChannelOnLoop(this);
   });

   Tune.channels[this.channelName]["stopOnLoop"] = false;
   var stopOnLoopButton = document.createElement("button");
   stopOnLoopButton.type = "button";
   stopOnLoopButton.id = "stopOnLoop";
   stopOnLoopButton.className = "channelHeaderButton";
   stopOnLoopButton.addEventListener('click', function(){
      _this.stopChannelOnLoop(this);
   });

   Tune.channels[this.channelName]["name"] = "My Melody";
   var channelNameField = document.createElement("input");
   channelNameField.type = "text";
   channelNameField.id = this.channelName+"NameField";
   channelNameField.className = "channelNameField";
   channelNameField.value = Tune.channels[this.channelName]["name"];

   var clearButton = document.createElement("button");
   clearButton.type = "button";
   clearButton.id = "clearChannel";
   clearButton.className = "channelHeaderButton";
   clearButton.addEventListener('click', function(){
      _this.clearChannel();
   });

   var settingsButton = document.createElement("button");
   settingsButton.type = "button";
   settingsButton.id = "channelSettingsButton";
   settingsButton.className = "channelHeaderButton";
   settingsButton.addEventListener('click', function(){
      new ChannelSettings(_this.channelName);
   });

   //Add them all to the channel header div
   newChannelHeaderDiv.appendChild(expandedButton);
   newChannelHeaderDiv.appendChild(instrumentButton);
   newChannelHeaderDiv.appendChild(channelNameField);

   newChannelHeaderDiv.appendChild(muteButton);
   newChannelHeaderDiv.appendChild(startOnLoopButton);
   newChannelHeaderDiv.appendChild(stopOnLoopButton);

   newChannelHeaderDiv.appendChild(settingsButton);
   newChannelHeaderDiv.appendChild(clearButton);

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
      button.className = "tableButtonOff";
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
         button.className = "tableButtonOff";
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
Channel.prototype.collapseChannel = function(_button){
   if(this.contentDiv.style.display == "none"){
      this.contentDiv.style.display = "inline";
      _button.id = "expandedIcon";
   }
   else{
      this.contentDiv.style.display = "none";
      _button.id = "collapsedIcon";
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
      _button.className = "tableButtonOff";
   }
   else{
      playNote(Tune.channels[channelName].instrument, row, Tune.tempo);
      //update Tune data
      Tune.channels[channelName].data[col][row] = Tune.tempo;
      //update HTML table
      _button.className = "tableButtonOn";
   }
}

/******************************************************************************
* Change the channels instrument
*******************************************************************************/
Channel.prototype.channelInstrument = function(_button){
   console.log("change channel instrument");
   arrInstuments = Object.keys(instruments);

   var index = arrInstuments.indexOf(Tune.channels[this.channelName].instrument);


   Tune.channels[this.channelName].instrument = arrInstuments[(index+1)%arrInstuments.length];
   _button.id = Tune.channels[this.channelName].instrument+"Icon";
}

/******************************************************************************
* Mute this channel
*******************************************************************************/
Channel.prototype.muteChannel = function(_button){
   Tune.channels[this.channelName].muted = !Tune.channels[this.channelName].muted;

   if(Tune.channels[this.channelName].muted)
   _button.id = "mutedChannel";
   else
   _button.id = "unmutedChannel";
}

/******************************************************************************
* Start specified channel on loop
*******************************************************************************/
Channel.prototype.startChannelOnLoop = function(_button){
   console.log("Start this channel at the end of the current loop");
   Tune.channels[this.channelName].startOnLoop = !Tune.channels[this.channelName].startOnLoop;
}

/******************************************************************************
* Stop specified channel on loop
*******************************************************************************/
Channel.prototype.stopChannelOnLoop = function(_button){
   console.log("Stop this channel at the end of the current loop");
   Tune.channels[this.channelName].stopOnLoop = !Tune.channels[this.channelName].stopOnLoop;
}

/******************************************************************************
* Erases the table data from the specified channel
*******************************************************************************/
Channel.prototype.clearChannel = function(){
   var channelDiv = document.getElementById(this.channelName);

   for (var y=0; y<defaultTableHeight; y++) {
      for (var x=0; x<Tune.getNumOfColumns(); x++) {

         //Upfate data
         Tune.channels[this.channelName].data[x][y] = 0;
         //Update HTML
         var button = document.getElementById(this.channelName+"_"+x+"_"+y);

         button.innerHTML = "";
      }
   }
}

/******************************************************************************
* Plays all the channels from the start
*******************************************************************************/
function playAllChannels(){
   console.log("playAllChannels");

   recursivePlay(0);
}

/******************************************************************************
* Toggles whether to stop after one play or loop on complete
*******************************************************************************/
function loopPlayback(_button){
   Tune.loopPlayback = !Tune.loopPlayback;

   if(Tune.loopPlayback)
   _button.id = "loopPlayback";
   else
   _button.id = "stopOnLoop";
}

/******************************************************************************
* Stops the playback of all channels
*******************************************************************************/
function stopPlayback(){
   console.log("stopPlayback");
   stopPlayback();
}

/******************************************************************************
* Toggles the note type
*******************************************************************************/
function noteType(_button){
   if(Tune.noteType == "staccato"){
      Tune.noteType = "legato";
      _button.id = "noteTypeLegato";
   }
   else{
      Tune.noteType = "staccato"
      _button.id = "noteTypeStaccato";
   }
}

/******************************************************************************
* Inc/Dec the tempo
*******************************************************************************/
function setTempo(_value){

   if(_value == "minus")
   console.log("setTempo: "+_value);
   else if(_value == "plus")
   console.log("setTempo: "+_value);
   else
   console.log("setTempo: "+_value);
}

/******************************************************************************
* Delete all channels
*******************************************************************************/
function deleteAllChannels(){
   console.log("deleteAllChannels");
}

/******************************************************************************
* Add a new Channel
*******************************************************************************/
function addChannel(){
   var newChannel = new Channel("bass");
   new ChannelSettings(newChannel.channelName);
}

/******************************************************************************
* Opens the main settings
*******************************************************************************/
function openMainSettings(){
   console.log("openMainSettings");
   new MainSettings();
}

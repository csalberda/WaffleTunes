/******************************************************************************
* Plays all the channels from the start
*******************************************************************************/
function playAllChannels(){
   console.log("playAllChannels");

   if(!Tune.bPlaying){
      Tune.bPlaying = true;
      recursivePlay(0);
   }
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
function setTempo(_action){
   var tempoLabel = document.getElementById("tempoLabel");

   if(_action == "minus")
      Tune.tempo -= 10;
   else if(_action == "plus")
      Tune.tempo += 10;

   tempoLabel.innerHTML = Tune.tempo;
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

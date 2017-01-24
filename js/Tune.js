/******************************************************************************
*
*******************************************************************************/
function Tune(_instrumentName) {
   this.numOfMeasures = 2;
   this.timeSignature = 8;
   this.loopPlayback = false;
   this.noteType = "staccato";
   this.tempo = 200;
   this.numOfChannels = 0;
   this.channels = {};
}

Tune.prototype.getNumOfColumns = function(){
   return this.timeSignature * this.numOfMeasures;
}

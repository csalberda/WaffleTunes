
var playTimeout;
var arrInstrumentNames = ["bass","bassDrum","highHatClosed","highHatOpen",
"sawWave","sineWave","snare","squareWave","triangleWave"];
var audioSamples = {};

/*******************************************************************************
* Loads the audio recources/samples
*******************************************************************************/
function loadAudio() {
   //Load all audio samples
   for(var i=0; i<arrInstrumentNames.length; i++){
      audioSamples[arrInstrumentNames[i]] = new Howl({
         src: ['assets/audio/samples/'+arrInstrumentNames[i]+'.ogg']
      });
   }
}

/*******************************************************************************
* Play recursivly through the tables' data
*******************************************************************************/
function recursivePlay(curColumn){
   //return if no channels exist
   if(Object.keys(Tune.channels).length == 0) return;

   console.log("recursivePlay: "+curColumn);

   if(curColumn > Tune.channels.channel0.data.length-1){
      console.log("done!");

      //update loop buttons for each channel
      for (var channel in Tune.channels){
         Tune.channels[channel].checkLoopButtons();
      }

      if(Tune.loopPlayback)
      recursivePlay(0);
      else
      playTimeout = undefined;
      return;
   }
   else{
      for (var i=0; i<Tune.numOfChannels; i++) {
         //ignore channel if muted
         if(!Tune.channels["channel"+i].muted){
            for (var y=0; y<Tune.getNumOfColumns(); y++) {
               if(Tune.channels["channel"+i].data[curColumn][y]){ //(if not duration 0)
                  playNote(Tune.channels["channel"+i].instrument, y, Tune.tempo);
               }
            }
         }
      }
      playTimeout = setTimeout(function(){ recursivePlay(curColumn+1) }, Tune.tempo);
   }
}

/*******************************************************************************
* Play a single note given the instrument name, pitch, and duration
*******************************************************************************/
function playNote(_instrumentName, _y, _duration){

   var sound = audioSamples[_instrumentName].play();

   //MAGIC FORMULA: set the rate based on the _y pos
   var rate = Math.pow((Math.pow(2,(1/12))),(defaultTableHeight-_y));
   audioSamples[_instrumentName].rate(rate, sound);

   setTimeout(function(){ audioSamples[_instrumentName].stop(sound); }, _duration);
}

/*******************************************************************************
* Stop the looping playback
*******************************************************************************/
function stopPlayback (_sprite){
   clearTimeout(playTimeout);
   playTimeout = undefined;
}

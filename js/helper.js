var arrScale = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
var arrColors = ["blue","purple","red","orange","yellow","green"];
var defaultTableHeight = 13;

/*******************************************************************************
* Map one number from a scale to the proportional number in another scale
*******************************************************************************/
function mapNumbers(x, in_min, in_max, out_min, out_max)	{
   return (x-in_min) * (out_max-out_min) / (in_max-in_min) + out_min;
}

var Tune = new Tune("bass");

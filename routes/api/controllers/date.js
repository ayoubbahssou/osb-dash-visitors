var parseDate=function(str) {
    var mdy = str.split('-')
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}
function dayDiff(first, second) {
    return (second-first)/(1000*60*60*24);
}
exports.diff=function(first, second,frequency){
    return Math.round((parseDate(second)-parseDate(first))/(1000*60*60*24*frequency));
}
exports.getPeriods=function(first, second,frequency){
  //
  //  console.log(first.getDate());
    console.log(second);
    var firstdate=parseDate(first);
    var seconddate=parseDate(second);
var diff=Math.round(dayDiff(firstdate, seconddate)/frequency);
console.log(diff);
var dateArray=[];
for (i=0;i<diff;i++){
var firstDate=new Date();
var secondDate=new Date();
var dateObj={};
firstDate.setYear(firstdate.getYear()+1900);
secondDate.setYear(firstdate.getYear()+1900);
if(frequency==30){
firstDate.setDate(firstdate.getDate());
secondDate.setDate(firstdate.getDate());
firstDate.setMonth(firstdate.getMonth()+i);
secondDate.setMonth(firstdate.getMonth()+(i+1));
}
else{
firstDate.setMonth(firstdate.getMonth());
secondDate.setMonth(firstdate.getMonth());
firstDate.setDate(firstdate.getDate()+i*frequency);
secondDate.setDate(firstdate.getDate()+(i+1)*frequency);
}
// {"$gte": new Date(2015, 2, 30), "$lt": new Date(2015, 2, 31)}
dateObj["$gte"]=firstDate;
dateObj["$lt"]=secondDate;
dateArray[i]=dateObj;
}
    console.log(dateArray)
return dateArray;
};


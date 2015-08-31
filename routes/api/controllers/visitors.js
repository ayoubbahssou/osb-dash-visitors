var database = require('../../../models');
var async = require('async');
var latlong=require('./latlong.js');
var date=require('./date.js');
var VisitorApi = (function() {
    /**
     * Public Functions
     */
   /* var _countVisitorsByOperator = function(operator,value,callback) {
        var query = {};
        query[operator] = value;
console.log('query');
console.log(query);
        database.getCollection('Visitor').count(query).exec(function(err, visitors) {
            if(err) return callback(err);
            return callback(null,visitors);
        });
    };*/
    var getDataForMap=function(stat){



        var min = Infinity;
        var max = -Infinity;

// get min and max values
        for (var i = 0; i < stat.systems.length; i++) {
            var id = stat.systems[i];
            var value = stat.stats[i][id];

            if (value <min) {
                min = value;
            }
            if (value >max) {
                max = value;
            }

        }


        var dataProvider=[];




        // create circle for each country
        var minBulletSize = 3;
        var maxBulletSize = 35;

        // it's better to use circle square to show difference between values, not a radius
        var maxSquare = maxBulletSize*maxBulletSize*2*Math.PI;
        var minSquare = minBulletSize*minBulletSize*2*Math.PI;

        // create circle for each country
        /*
         var names=[];
         for (var i = 0; i <systems.length; i++) {
         var id = systems[i];
         names[i]=latlong[id].name;
         }
         */
        for (var i = 0; i < stat.systems.length; i++) {
            var id = stat.systems[i];
            //var name = latlong[id].name;
            //var color = latlong[id].color;
            var value = stat.stats[i][id];
            // console.log(value);
            // calculate size of a bubble
            var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
            //console.log(square)
            if (square < minSquare) {
                square = minSquare;
            }
            var size = Math.sqrt(square / (Math.PI * 2));
            // var id = dataItem.code;

            //var countrynames
            var dataItem={
                type: "circle",
                width: size,
                height: size,
                color: latlong[id].color,
                longitude: latlong[id].longitude,
                latitude: latlong[id].latitude,
                title:latlong[id].name ,
                value: value
            };
            dataProvider.push(dataItem);

        }




        stat.mapData=dataProvider

    }

    var _countVisitorsByOperator = function(operators,values,operator,value,callback) {
       console.log(values.length);
        var query = [];
        var thisOperator;
        var thisValue;
        var thisQuery = {};
        var lastQuery = {};
      //  if (values != ['precaution']) {


//console.log(values.length);

            for (i = 2; i < values.length; i++) {
                thisQuery = {};
                thisOperator = operators[i];
                thisValue = values[i];
                thisQuery[thisOperator] = thisValue;
                query.push(thisQuery);
               // console.log('f la boucle' + i);
                //console.log();
            }
      //  }

        lastQuery[operator]=value;
        query.push(lastQuery);
            //console.log('query');
            //console.log(query);
        database.getCollection('Visitor').count({$and:query}).exec(function(err, visitors) {
                if (err) return callback(err);
            console.log(visitors)
                return callback(null, visitors);
            });
        };

    /******/
    var _gettatisticByCriteriaOnMap = function(operators,values,criteria, done) {
        console.log('in get stat')
        database.getCollection('Visitor').distinct(criteria, function(err, systems) {
            if(err) return done(err);
            if(systems) {
                console.log('systems');
                console.log(systems);
                async.map(systems, function(system,callback) {
                    _countVisitorsByOperator(operators,values,criteria,system, function(err, result) {
                        if(err) return callback(err);
                        var statObj = {};
                        // var coordObj={};
                        // coordObj[criteria]=system;
                        //statObj.systems=[]
                        statObj[system] = result;

                        /* if(criteria='geo.country') {
                         console.log('statObj');
                         console.log(coordObj);
                         database.getCollection('Visitor').findOne(coordObj).exec(function (err, obj) {

                         // if (err) return callback(err);
                         // console.log(obj)
                         statObj.coords= obj.geo.ll;
                         /// console.log('statObj');
                         //console.log(statObj)
                         });
                         }*/
                        //statObj.systems.push(system)
                        return callback(null,statObj);
                    })
                }, function(err, data) {
                    var newData={};
                    newData.systems=systems;
                    newData.stats=data;
                    getDataForMap(newData);
                    console.log(newData);
                    return done(err,newData);
                });
            } else {
                return done(null, {});
            }
        });
    };

    /*****/
    var _gettatisticByCriteria = function(operators,values,criteria, done) {
       console.log('in get stat');
        var deviceType;
        if (criteria=='deviceType'){
            criteria='userAgent.os.name';
            deviceType=true;
        }
        database.getCollection('Visitor').distinct(criteria, function(err, systems) {
            if(err) return done(err);
            if(systems) {
                console.log('systems');
                console.log(systems);
		        async.map(systems, function(system,callback) {
                    _countVisitorsByOperator(operators,values,criteria,system, function(err, result) {
                        if(err) return callback(err);
                        var statObj = {};
                        // var coordObj={};
                        // coordObj[criteria]=system;
                        //statObj.systems=[]
			            statObj[system] = result;

                        /* if(criteria='geo.country') {
                            console.log('statObj');
                            console.log(coordObj);
                            database.getCollection('Visitor').findOne(coordObj).exec(function (err, obj) {

                               // if (err) return callback(err);
                               // console.log(obj)
                                statObj.coords= obj.geo.ll;
                               /// console.log('statObj');
                                //console.log(statObj)
                            });
                        }*/
			//statObj.systems.push(system)
                        return callback(null,result);
                    })
                }, function(err, data) {

                    var newStats=[];
                    var newData={};
         if(deviceType){

         var mobile=0;
         var disktop=0;



         for(i=0;i<systems.length;i++){
         if(systems[i]=='Android'||systems[i]=='Windows Phone'||systems[i]=='iOS'||systems[i]=='BlackBerry'){
         mobile=mobile+data[i];
         }
         else{
         disktop=disktop+data[i];
         }
         }

         newStats.push(mobile);
         newStats.push(disktop);
         newData.systems=['mobile devices','desktop devices'];
         //getDataForMap(newData);
         // console.log()
         //console.log(newData);
         newData.series=['mobile devices','desktop devices'];
         newData.stats=newStats;
         }
         else{
             if(criteria=='geo.country'){
                 for(i=0;i<systems.length;i++){
                     systems[i]=latlong[systems[i]].name
                 }
             }

             newData.systems=systems;
             newData.stats=data;
             //getDataForMap(newData);
             console.log(newData);
         }


                    return done(err,newData);
                });
            } else {
                return done(null, {});
            }
        });
    };

    /****/

   /* var _gettatisticByDoubleCriteria = function(operators,values,first,second,frequency,criteria, done) {
        var dateArray=date.getPeriods(first,second,frequency);
        //console.log(dateArray);
        var diff=date.diff(first,second,frequency);
        database.getCollection('Visitor').distinct(criteria, function(err,countries) {
            if(err) return done(err);

            database.getCollection('Visitor').distinct(criteria, function(err, systems){

            if(err) return done(err);
            if(systems) {

                var names=[];
                for (var i = 0; i <countries.length; i++) {
                    var id = countries[i];
                    names[i]=latlong[id].name;
                }
                async.map(systems, function(system,callback) {
                    async.map(names, function (countryName, next) {
                     async.map(dateArray, function (date, next) {
                        // console.log('date');
                        // console.log(date);
                        // {"$gte": new Date(2015, 2, 30), "$lt": new Date(2015, 2, 31)}
                        var queryDate = {};
                        var operatorsAndDate = [];
                        var valuesAndDate = [];
                        for (i = 0; i < values.length; i++) {
                            operatorsAndDate.push(operators[i]);
                            valuesAndDate.push(values[i]);
                        }
                        operatorsAndDate.push("visitDate");
                        var firstdate = date.$gte;
                        //=new Date('01/02/2015');
                        var seconddate = date.$lt;

                        valuesAndDate.push(date);

                        console.log(date);
                        _countVisitorsByOperator(operatorsAndDate, valuesAndDate, criteria, system, function (err, result) {
                            if (err) return next(err);
                            var statObj = {};
                            // var coordObj={};
                            // coordObj[criteria]=system;
                            //statObj.systems=[]
                            statObj[system] = result;


                            return next(null, result);
                        })
                    },function (err, data) {
                        var newData = {};
                        //* newData.systems = systems;
                        //  newData.stats = data;
                        //getDataForMap(newData);
                        //  console.log(newData);
                        newData[system] = data;
                        //  console.log(newData);
                        return callback(err, data);
                    });
                    }, function (err, data) {
                        var newData = {};
                        //* newData.systems = systems;
                       //  newData.stats = data;
                         //getDataForMap(newData);
                       //  console.log(newData);
                        newData[system] = data;
                        //  console.log(newData);
                        return callback(err, data);
                    });
                }, function(err, stats) {
                    var newData={};

                    var labels=[];
                    var period;
                    if(frequency==1){
                        period="day ";
                    }
                    if(frequency==30){
                        period="month ";
                    }
                    if(frequency==7){
                        period="week ";
                    }
                    for(i=0;i<diff;i++){
                        labels[i]= period.concat(i+1);
                    }
                    newData.labels=labels;
                    //getDataForMap(newData);
                    // console.log()
                    //console.log(newData);
                    newData.series=systems;
                    newData.data=stats;
                    return done(err,newData);
                });
            } else {
                return done(null, {});
            }
        });
        })
    };

    /*****/

    var _gettatisticByCriteriaAndDate = function(operators,values,first,second,frequency,criteria, done) {
        var dateArray=date.getPeriods(first,second,frequency);
        var deviceType=false;
        console.log('date');
        console.log(first);
        console.log(dateArray);
        var diff=date.diff(first,second,frequency);
        if (criteria=='deviceType'){
            criteria='userAgent.os.name';
            deviceType=true;
        }
        database.getCollection('Visitor').distinct(criteria, function(err, systems) {
            if(err) return done(err);
            if(systems) {
                /*console.log('systems');
                console.log(systems);*/
                async.map(systems, function(system,callback) {
                    async.map(dateArray, function (date, next) {
                       console.log('date');
                       // console.log(date);
                        // {"$gte": new Date(2015, 2, 30), "$lt": new Date(2015, 2, 31)}
                        var queryDate = {};
                        var operatorsAndDate=[];
                        var valuesAndDate=[];
                        for(i=0;i<values.length;i++){
                            operatorsAndDate.push(operators[i]);
                            valuesAndDate.push(values[i]);
                        }
                        operatorsAndDate.push("visitDate");
                        var firstdate=date.$gte;
                        //=new Date('01/02/2015');
                        var seconddate=date.$lt;
                     /*   var st=''
                        var str=''
                        st=st.concat(firstdate.getMonth()+1);
                        st=st.concat('/');
                        st=st.concat(firstdate.getDate());
                        st=st.concat('/');
                        st=st.concat(firstdate.getYear()+1900);
                        str=str.concat(seconddate.getMonth()+1);
                        str=str.concat('/');
                        str=str.concat(seconddate.getDate());
                        str=str.concat('/');
                        str=str.concat(seconddate.getYear()+1900);*/
                       // date.$lt=new Date(str);
                        //date.$gte=new Date(st);
                        valuesAndDate.push(date);
                       /* console.log('Dat')
                        console.log(values.length)
                        console.log('Dat')
                        console.log(date)
                        console.log('Dat')
                        console.log(valuesAndDate)*/
                        console.log(date);
                        _countVisitorsByOperator(operatorsAndDate, valuesAndDate, criteria, system, function (err, result) {
                            if (err) return next(err);
                            var statObj = {};
                            // var coordObj={};
                            // coordObj[criteria]=system;
                            //statObj.systems=[]
                            statObj[system] = result;


                            return next(null, result);
                        })
                    }, function (err, data) {
                        var newData = {};
                       /* newData.systems = systems;
                        newData.stats = data;
                        //getDataForMap(newData);
                        console.log(newData);*/
                        newData[system] = data;
                      //  console.log(newData);
                        return callback(err, data);
                    });
                }, function(err, stats) {
                    var newData={};

                    var labels=[];
                    var period;
                    if(frequency==1){
                       period="day ";
                    }
                    if(frequency==30){
                        period="month ";
                    }
                    if(frequency==7){
                        period="week ";
                    }
                    for(i=0;i<diff;i++){
                         labels[i]= period.concat(i+1);
                    }
                    if(deviceType){
                        var newStats=[];
                        var mobile=[];
                        var disktop=[];
                        for(j=0;j<labels.length;j++){
                            mobile[j]=0;
                            disktop[j]=0;
                            for(i=0;i<systems.length;i++){
                                if(systems[i]=='Android'||systems[i]=='Windows Phone'||systems[i]=='iOS'||systems[i]=='BlackBerry'){
                                    mobile[j]=mobile[j]+stats[i][j];
                                }
                                else{
                                    disktop[j]=disktop[j]+stats[i][j];
                                }
                            }
                        }
                        newStats.push(mobile);
                        newStats.push(disktop);
                        newData.labels=labels;
                        //getDataForMap(newData);
                        // console.log()
                        //console.log(newData);
                        newData.series=['mobile devices','desktop devices'];
                        newData.data=newStats;
                    }
                    else{
                        newData.labels=labels;
                        //getDataForMap(newData);
                        // console.log()
                        //console.log(newData);
                        newData.series=systems;
                        newData.data=stats;
                    }


                        return done(err,newData);
                    });
            } else {
                return done(null, {});
            }
        });
    };

    /**
     * Private Functions
     */
    return {
        getStatisticsByCriteria : function
    (req, res, next)
    {
        var criteria = req.query.criteria;
        var operators = req.query.operators;
        var values = req.query.values;
        console.log('visitors api')
        console.log(values);
        console.log(operators);
        _gettatisticByCriteria(operators, values, criteria, function (err, data) {
            if (err) return res.status(500).send({message: err.message});
            return res.status(200).send(data);
        })

    },
        getStatisticsByCriteriaOnMap : function
            (req, res, next)
        {
            var criteria = req.query.criteria;
            var operators = req.query.operators;
            var values = req.query.values;
            console.log('visitors api')
            console.log(values);
            console.log(operators);
            _gettatisticByCriteriaOnMap(operators, values, criteria, function (err, data) {
                if (err) return res.status(500).send({message: err.message});
                return res.status(200).send(data);
            })

        },

    gettatisticByCriteriaAndDate:function (req, res, next) {
        var criteria = req.query.criteria;
        var operators = req.query.operators;
        var values = req.query.values;
        var first=req.query.firstdate;
        var second=req.query.seconddate;
        var frequency=req.query.frequency;
        _gettatisticByCriteriaAndDate(operators, values,first,second,frequency, criteria, function (err, data) {
            if (err) return res.status(500).send({message: err.message});
            console.log(data)
            return res.status(200).send(data);
        })
    }
}
})();


module.exports = VisitorApi;

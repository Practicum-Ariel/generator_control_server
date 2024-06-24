// const controller => need to get from someone
const DAY_MS = 1000 * 60 * 60 * 24;

async function getData({generator_id,time,sensor_type, anomalya ={}}){
    const _id = {_id:generator_id};
    switch (time) {
        case 'day':
            getDayBefore()
            break;
        case 'week':
            getWeekBefore()
            break;
        case 'month':
            getMonthBefore()
            break;       
        default:
            throw {code:500, msg:("Dates not in right format")};
    }
    switch (sensor_type) {
        case 'temperature':
            sensor_type = "t1 t2 t3 t4";
            break;
        case 'vibration':
            sensor_type = "s1 s2 s3 s4"
            break;
        case 'volume':
            sensor_type = "v1 v2 v3 v4"
            break;
        default:
            throw {code:500, msg:("Sensors not good")};
    }
    

    return;
}


const getDayBefore = () => {
    const currentDate = new date();
    const myDate = currentDate - (DAY_MS)
    return [currentDate,myDate]; //new Date(myDate)
}
const getWeekBefore = () => {
    const currentDate = new date();
    const myDate = currentDate - (DAY_MS*7) 
    return [currentDate,myDate]; //new Date(myDate)
}
const getMonthBefore = () => {
    const currentDate = new date();
    const myDate = currentDate - (DAY_MS*30)
    return [currentDate,myDate]; //new Date(myDate)
}

const getPastDayDates = () => {
    const dates = [];
    const ansDates = []
    const currentDate = new Date();
  
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setHours(currentDate.getHours() - i);
      dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string
      
    }
    ansDates.push(dates[0], dates[dates.length-1])

    console.log(ansDates);
  
    return ansDates;
  };
  getPastDayDates()
const getPastWeekDates = () => {
    const dates = [];
    const ansDates = [];
    const currentDate = new Date();
  
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      dates.push(date.toISOString().split('Z')[0]); // Format the date as YYYY-MM-DDTHH:MM:SS
    }
    ansDates.push(dates[0],dates[dates.length-1]);
    return ansDates;
  };

  const getPastMonthDates = () => {
    const dates = [];
    const ansDates = []
    const currentDate = new Date();
  
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      dates.push(date.toISOString().split('Z')[0]); // Format the date with time as ISO string
    }
    ansDates.push(dates[0],dates[dates.length-1]);
  
    return ansDates;
  };  


  const d = new Date()
  const c = d - (1000* 60*60*24)
  console.log(new Date(c).toISOString());

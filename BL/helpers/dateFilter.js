const DAY_MS = 1000 * 60 * 60 * 24;
const dot = {
    'day': 1,
    'week': 7,
    'month': 30
}

module.exports  = (time) => new Date() - (DAY_MS * dot[time])


// const timeFilter = (time) => {
//     switch (time) {
//         case 'day':
//             time = getDayBefore()
//             break;
//         case 'week':
//             time = getWeekBefore()
//             break;
//         case 'month':
//             time = getMonthBefore()
//             break;
//         default:
//             throw { code: 500, msg: ("Dates not in right format") };
//     }
//     return time
// }
// const getDayBefore = () => new Date() - (DAY_MS) // return new Date()

// const getWeekBefore = () => new Date() - (DAY_MS * 7)

// const getMonthBefore = () => new Date() - (DAY_MS * 30)




// {timeFilter}
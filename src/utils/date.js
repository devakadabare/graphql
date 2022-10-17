const Moment = require('moment');
const { extendMoment } = require('moment-range');

const moment = extendMoment(Moment);

const getDayNameByDate = (date) => {
    const weekDayName = moment(date).format('dddd');
    return weekDayName;
};

//getTimeSlotsByTimeRange('06:00', '17:00');
const getTimeSlotsByTimeRange = (start, end, slotLength, interval) => {
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    var timeSlots = [];

    while (startTime <= endTime) {
        timeSlots.push({
            string: `${new moment(startTime).format('hh:mm A')} - ${new moment(startTime).add(slotLength, 'minutes').format('hh:mm A')}`,
            start: new Date(moment(startTime)),
            end: new Date(moment(startTime).add(slotLength, 'minutes')),
            isDisabled: false,
        });
        startTime.add(slotLength + interval, 'minutes');
    }
    return timeSlots;
};

const disableConflictingTimeSlots = (previousSessions, generatedTimeSlots) => {
    const output = [];
    for (i = 0; i < generatedTimeSlots.length; i++) {
        const { start, end } = generatedTimeSlots[i];
        for (let x = 0; x < previousSessions.length; x++) {
            const range1 = moment.range([moment(start), moment(end)]);
            const range2 = moment.range([moment(previousSessions[x].startTime), moment(previousSessions[x].endTime)]);

            if (range1.overlaps(range2)) {
                if ((range2.contains(range1, true) || range1.contains(range2, true)) && !date1[0].isSame(date2[0])) {
                    // console.log('Fully Conflict');
                    output.push({ ...generatedTimeSlots[i], isDisabled: true });
                } else {
                    // console.log('Partially Conflict');
                    output.push({ ...generatedTimeSlots[i], isDisabled: true });
                }
            } else {
                output.push({ ...generatedTimeSlots[i] });
            }
        }
    }

    return output;
};

module.exports = {
    getDayNameByDate,
    getTimeSlotsByTimeRange,
    disableConflictingTimeSlots,
};

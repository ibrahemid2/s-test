"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTask3 = exports.findEarliestMeetingTime = void 0;
// Main function to find the earliest meeting time
const utils_1 = require("../utils");
function findEarliestMeetingTime(schedules, duration) {
    const endOfDay = (0, utils_1.timeToMinutes)('19:00');
    let possibleStartTime = (0, utils_1.timeToMinutes)('09:00'); //set to the start of the day and reassign in the loop
    // combine and sort.
    let intervals = schedules.flat().map(([start, end]) => [(0, utils_1.timeToMinutes)(start), (0, utils_1.timeToMinutes)(end)])
        .sort((a, b) => a[0] - b[0]);
    // loop and check
    for (const [start, end] of intervals) { //ex: [540, 660] => 09:00 - 11:00
        // check if the meeting can be scheduled before the current meeting
        if (possibleStartTime + duration <= start) { //ex: 540 + 60 <= 540
            return (0, utils_1.minutesToTime)(possibleStartTime);
        }
        possibleStartTime = Math.max(possibleStartTime, end); // set the possible start time to the end of the current meeting
    }
    // Check if there is enough time for the meeting at the end of the day
    return (possibleStartTime + duration <= endOfDay) ? (0, utils_1.minutesToTime)(possibleStartTime) : null;
}
exports.findEarliestMeetingTime = findEarliestMeetingTime;
function logTask3() {
    return __awaiter(this, void 0, void 0, function* () {
        const schedules = [
            [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
            [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
            [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
        ];
        findEarliestMeetingTime(schedules, 60);
    });
}
exports.logTask3 = logTask3;
logTask3();

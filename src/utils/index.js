"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionArgNames = exports.minutesToTime = exports.timeToMinutes = void 0;
const minutesInHour = 60;
function timeToMinutes(time) {
    // ex 09:00 => 540
    const [hours, minutes] = time.split(':').map(Number);
    return hours * minutesInHour + minutes;
}
exports.timeToMinutes = timeToMinutes;
function minutesToTime(minutes) {
    // ex 540 => 09:00
    const hours = Math.floor(minutes / minutesInHour);
    const mins = minutes % minutesInHour;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
exports.minutesToTime = minutesToTime;
function getFunctionArgNames(func) {
    // ex function add(a, b) => ['a', 'b']
    const funcAsString = func.toString();
    return funcAsString.slice(funcAsString.indexOf('(') + 1, funcAsString.indexOf(')')).match(/([^\s,]+)/g) || [];
}
exports.getFunctionArgNames = getFunctionArgNames;

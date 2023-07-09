"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
test('findEarliestMeetingTime should return "12:15" for the first provided example', () => {
    const schedules = [
        [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
        [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
        [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    const duration = 60;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBe("12:15");
});
test('findEarliestMeetingTime should return "09:00" when there is a gap at the start of the day', () => {
    const schedules = [
        [['09:15', '10:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
        [['09:30', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
        [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    const duration = 15;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBe("09:00");
});
test('findEarliestMeetingTime should return null when there is no gap large enough', () => {
    const schedules = [
        [['09:00', '11:30'], ['11:40', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
        [['09:00', '12:00'], ['14:00', '16:30'], ['17:00', '19:00']],
        [['09:00', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    const duration = 120;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBeNull();
});
test('findEarliestMeetingTime should return "09:00" when all schedules are empty', () => {
    const schedules = [[], [], []];
    const duration = 60;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBe("09:00");
});
test('findEarliestMeetingTime should return "16:00" when there is exactly enough time at the end of the day', () => {
    const schedules = [
        [['09:00', '12:00'], ['12:30', '16:00']],
        [['09:00', '11:30'], ['12:00', '16:00']],
        [['09:00', '11:00'], ['11:30', '16:00']]
    ];
    const duration = 180;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBe("16:00");
});
test('findEarliestMeetingTime should return null when a meeting ends exactly at the end of the day', () => {
    const schedules = [
        [['09:00', '12:00'], ['12:15', '19:00']],
        [['09:00', '11:30'], ['11:45', '19:00']],
        [['09:00', '11:00'], ['11:15', '19:00']]
    ];
    const duration = 15;
    expect((0, index_1.findEarliestMeetingTime)(schedules, duration)).toBeNull();
});

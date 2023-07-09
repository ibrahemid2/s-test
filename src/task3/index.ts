// Main function to find the earliest meeting time
import {minutesToTime, timeToMinutes} from "../utils";

export function findEarliestMeetingTime(schedules: string[][][], duration: number): string | null {
    const endOfDay = timeToMinutes('19:00');
    let possibleStartTime = timeToMinutes('09:00');//set to the start of the day and reassign in the loop


    // combine and sort.
    let intervals = schedules.flat().map(([start, end]) => [timeToMinutes(start), timeToMinutes(end)])
        .sort((a, b) => a[0] - b[0]);


    // loop and check
    for (const [start, end] of intervals) { //ex: [540, 660] => 09:00 - 11:00
        // check if the meeting can be scheduled before the current meeting
        if (possibleStartTime + duration <= start) { //ex: 540 + 60 <= 540
            return minutesToTime(possibleStartTime);
        }
        possibleStartTime = Math.max(possibleStartTime, end);// set the possible start time to the end of the current meeting
    }
    // Check if there is enough time for the meeting at the end of the day
    return (possibleStartTime + duration <= endOfDay) ? minutesToTime(possibleStartTime) : null;
}


export async function logTask3() {
    const schedules = [
        [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
        [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
        [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];
    findEarliestMeetingTime(schedules, 60);
}


logTask3();



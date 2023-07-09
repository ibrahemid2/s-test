const minutesInHour = 60;

function timeToMinutes(time: string): number {
    // ex 09:00 => 540
    const [hours, minutes] = time.split(':').map(Number);
    return hours * minutesInHour + minutes;
}

function minutesToTime(minutes: number): string {
    // ex 540 => 09:00
    const hours = Math.floor(minutes / minutesInHour);
    const mins = minutes % minutesInHour;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}


function getFunctionArgNames(func: Function): string[] {
    // ex function add(a, b) => ['a', 'b']
    const funcAsString = func.toString();
    return funcAsString.slice(funcAsString.indexOf('(') + 1, funcAsString.indexOf(')')).match(/([^\s,]+)/g) || [];
}


export {timeToMinutes, minutesToTime, getFunctionArgNames};



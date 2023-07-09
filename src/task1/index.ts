export async function retryFailures<T>(task: () => Promise<T>, retries: number): Promise<T> {
    if (retries === 0) throw ZeroRetriesError;

    try {
        console.log(`Trying task. Retries left: ${retries}`);
        return await task();
    } catch (error) {
        console.log(`Task failed. Retries left: ${retries}`);
        if (retries === 1) { // no more retries left
            console.log('No more retries left. Throwing error.');
            throw error; // rethrow the last error
        } else {
            return await retryFailures(task, retries - 1);
        }
    }
}

export function createTestFunction(successfulAttempt: number) {
    let attempt = 0;
    return async () => {
        attempt++;
        console.log(`Running task. Attempt: ${attempt}`);
        if (attempt === successfulAttempt) {
            console.log(`Task succeeded at attempt: ${attempt}`);
            return attempt;
        }
        //throw an error to simulate a failed attempt
        throw Object.assign(new Error(`failure`), {attempt});
    };
}

export interface AttemptsError extends Error {
    attempt: number;
}

export const ZeroRetriesError = new Error('retries parameter must be greater than 0');

export async function logTask1() {
    const result = await retryFailures(createTestFunction(3), 5);
    console.log('finished. Result:', result);
}



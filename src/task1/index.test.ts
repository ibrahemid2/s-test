import {AttemptsError, createTestFunction, retryFailures, ZeroRetriesError} from "./index";

test('function should succeed on the third attempt', async () => {
    console.log('Starting test: function should succeed on the third attempt');
    const result = await retryFailures(createTestFunction(3), 5);
    console.log('Test finished. Result:', result);
    expect(result).toBe(3);
});

test('function should fail on the second attempt and throw the last error', async () => {
    console.log('Starting test: function should fail on the second attempt and throw the last error');
    expect.assertions(1);
    try {
        await retryFailures(createTestFunction(3), 2);
    } catch (e) {
        const error = e as AttemptsError;
        console.log('Test finished. Caught error. Attempt:', error.attempt);
        expect(error.attempt).toBe(2);
    }
});

test('function should succeed on the tenth attempt', async () => {
    console.log('Starting test: function should succeed on the tenth attempt');
    const result = await retryFailures(createTestFunction(10), 10);
    console.log('Test finished. Result:', result);
    expect(result).toBe(10);
});


test('function should succeed on the first attempt', async () => {
    console.log('Starting test: function should succeed on the first attempt');
    const result = await retryFailures(createTestFunction(1), 5);
    console.log('Test finished. Result:', result);
    expect(result).toBe(1);
});

test('function should fail all attempts and throw the last error', async () => {
    console.log('Starting test: function should fail all attempts and throw the last error');
    expect.assertions(1);
    try {
        await retryFailures(createTestFunction(11), 10); // task never succeeds
    } catch (e) {
        const error = e as AttemptsError;
        console.log('Test finished. Caught error. Attempt:', error.attempt);
        expect(error.attempt).toBe(10);
    }
});

test('function should not retry if retries parameter is 0', async () => {
    console.log('Starting test: function should not retry if retries parameter is 0');
    expect.assertions(1);
    try {
        await retryFailures(createTestFunction(3), 0);
    } catch (e: any) {
        console.log('Test finished. Caught error. Message:', e.message);
        expect(e).toBe(ZeroRetriesError);
    }
});

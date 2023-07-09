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
exports.logTask1 = exports.zeroRetriesError = exports.createTestFunction = exports.retryFailures = void 0;
function retryFailures(task, retries) {
    return __awaiter(this, void 0, void 0, function* () {
        if (retries === 0)
            throw exports.zeroRetriesError;
        try {
            console.log(`Trying task. Retries left: ${retries}`);
            return yield task();
        }
        catch (error) {
            console.log(`Task failed. Retries left: ${retries}`);
            if (retries === 1) { // no more retries left
                console.log('No more retries left. Throwing error.');
                throw error; // rethrow the last error
            }
            else {
                return yield retryFailures(task, retries - 1);
            }
        }
    });
}
exports.retryFailures = retryFailures;
function createTestFunction(successfulAttempt) {
    let attempt = 0;
    return () => __awaiter(this, void 0, void 0, function* () {
        attempt++;
        console.log(`Running task. Attempt: ${attempt}`);
        if (attempt === successfulAttempt) {
            console.log(`Task succeeded at attempt: ${attempt}`);
            return attempt;
        }
        //throw an error to simulate a failed attempt
        throw Object.assign(new Error(`failure`), { attempt });
    });
}
exports.createTestFunction = createTestFunction;
exports.zeroRetriesError = new Error('retries parameter must be greater than 0');
function logTask1() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield retryFailures(createTestFunction(3), 5);
        console.log('finished. Result:', result);
    });
}
exports.logTask1 = logTask1;

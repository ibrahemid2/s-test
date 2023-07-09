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
const index_1 = require("./index");
test('function should succeed on the third attempt', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should succeed on the third attempt');
    const result = yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(3), 5);
    console.log('Test finished. Result:', result);
    expect(result).toBe(3);
}));
test('function should fail on the second attempt and throw the last error', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should fail on the second attempt and throw the last error');
    expect.assertions(1);
    try {
        yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(3), 2);
    }
    catch (e) {
        const error = e;
        console.log('Test finished. Caught error. Attempt:', error.attempt);
        expect(error.attempt).toBe(2);
    }
}));
test('function should succeed on the tenth attempt', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should succeed on the tenth attempt');
    const result = yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(10), 10);
    console.log('Test finished. Result:', result);
    expect(result).toBe(10);
}));
test('function should succeed on the first attempt', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should succeed on the first attempt');
    const result = yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(1), 5);
    console.log('Test finished. Result:', result);
    expect(result).toBe(1);
}));
test('function should fail all attempts and throw the last error', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should fail all attempts and throw the last error');
    expect.assertions(1);
    try {
        yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(11), 10); // task never succeeds
    }
    catch (e) {
        const error = e;
        console.log('Test finished. Caught error. Attempt:', error.attempt);
        expect(error.attempt).toBe(10);
    }
}));
test('function should not retry if retries parameter is 0', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting test: function should not retry if retries parameter is 0');
    expect.assertions(1);
    try {
        yield (0, index_1.retryFailures)((0, index_1.createTestFunction)(3), 0);
    }
    catch (e) {
        console.log('Test finished. Caught error. Message:', e.message);
        expect(e).toBe(index_1.ZeroRetriesError);
    }
}));

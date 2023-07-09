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
exports.logTask2 = exports.defaultArguments = void 0;
const utils_1 = require("../utils");
function defaultArguments(func, defaultParams) {
    // get the argument names from the function or from the helper
    const argNames = func.argNames || (0, utils_1.getFunctionArgNames)(func);
    // Create a new function that implements the default arguments functionality
    const funcWithDefaults = function (...args) {
        const mergedParams = Object.assign(Object.assign({}, func.defaultParams), defaultParams);
        const allArgs = argNames.map((argName, index) => {
            if (args[index] !== undefined) {
                return args[index];
            }
            return mergedParams[argName];
        });
        return func(...allArgs);
    };
    // Copy the properties of the original function
    funcWithDefaults.argNames = argNames;
    funcWithDefaults.defaultParams = Object.assign(Object.assign({}, func.defaultParams), defaultParams);
    // Return the new function
    return funcWithDefaults;
}
exports.defaultArguments = defaultArguments;
function add(a, b) {
    return a + b;
}
function logTask2() {
    return __awaiter(this, void 0, void 0, function* () {
        const add2 = defaultArguments(add, { b: 9 });
        console.log(add2(10) === 19);
        console.log(add2(10, 7) === 17);
        console.log(isNaN(add2()));
        const add3 = defaultArguments(add2, { b: 3, a: 2 });
        console.log(add3(10) === 13);
        console.log(add3() === 5);
        const add4 = defaultArguments(add, { c: 3 });
        console.log(isNaN(add4(10)));
        console.log(add4(10, 10) === 20);
        const add5 = defaultArguments(add2, { a: 10 });
        console.log(add5() === 19);
    });
}
exports.logTask2 = logTask2;

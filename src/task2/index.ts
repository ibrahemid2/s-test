import {getFunctionArgNames} from "../utils";

type Params = { [key: string]: any };

interface FuncWithDefaults extends Function {
    argNames?: string[];
    defaultParams?: Params;

    (...args: any[]): any;
}

export function defaultArguments(func: FuncWithDefaults, defaultParams: Params): FuncWithDefaults {
    // get the argument names from the function or from the helper
    const argNames = func.argNames || getFunctionArgNames(func);

    // Create a new function that implements the default arguments functionality
    const funcWithDefaults: FuncWithDefaults = function (...args: any[]) {

        const mergedParams = {...func.defaultParams, ...defaultParams};

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
    funcWithDefaults.defaultParams = {...func.defaultParams, ...defaultParams};

    // Return the new function
    return funcWithDefaults;
}


function add(a: number, b: number): number {
    return a + b;
}

export async function logTask2() {
    const add2 = defaultArguments(add, {b: 9});
    console.log(add2(10) === 19);
    console.log(add2(10, 7) === 17);
    console.log(isNaN(add2()));

    const add3 = defaultArguments(add2, {b: 3, a: 2});
    console.log(add3(10) === 13);
    console.log(add3() === 5);

    const add4 = defaultArguments(add, {c: 3});
    console.log(isNaN(add4(10)));
    console.log(add4(10, 10) === 20);

    const add5 = defaultArguments(add2, {a: 10});
    console.log(add5() === 19);
}

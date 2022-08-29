/**
 * "It returns a function that, when invoked, will wait for a specified amount of time before invoking the original
 * function."
 *
 * The debounce function takes two arguments: the function to be invoked and the delay in milliseconds. It returns a
 * function that, when invoked, will wait for a specified amount of time before invoking the original function
 * @param func - The function that will be called after the delay.
 * @param delay - The amount of time to wait before calling the function.
 * @returns A function that will call the passed in function after a delay.
 */
export default function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

import * as $ from 'jquery';

export default function createAnalytics() {
    let counter: number = 0;
    let destroyed: boolean = false;

    const listener = ():number => counter++;

    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            destroyed = true;
        },
        getClicks() {
            if (destroyed) {
                return `Analytics is destroyed`
            }
            return counter;
        }
    }
}

window['analytics'] = createAnalytics();
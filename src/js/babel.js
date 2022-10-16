export default async function something() {
    return await Promise.resolve('something for test')
}

something().then(console.log);

class Utils {
    static id = Date.now()
}

console.log(Utils.id)

import('lodash').then(_ => {
    console.log("lodash", _.random(0, 42, true))
});
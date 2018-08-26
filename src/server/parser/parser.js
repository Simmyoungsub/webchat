const run = () => {
    const t = {
        'a': ['agent_name']
    };

    const t1 = [
        {
            name: 'a',
            age: 10,
            country: 'korea',
            nick: ['ken', 'jin', 'logan']
        },
        {
            name: 'b',
            age: 20,
            country: 'america',
            nick: ['cap', 'iron', 'hulk']
        }
    ];

    const t2 = [
        {
            name: 'a',
            age: 10,
            country: 'korea'
        },
        {
            name: 'b',
            age: 20,
            country: 'america'
        }
    ];

    const result = parsing(t1);
    console.log(result);
};

const parsing = (data) => {
    let array = [];

    for (const k of Object.keys(data)) {
        if (Array.isArray(data[k])) {
            if (typeof(data[k][0]) !== 'object' ) {
                array.push([0, '', data[k][0], '']);
            }else {
                array = array.concat(parsing(data[k][0]));
            }
        }else if (data[k] && typeof(data[k]) === 'object') {
            array = array.concat(parsing(data[k]));
        }else {
            array.push([k, '', data[k], '']);
        }
    }

    return array;
};

module.exports = {
    run
};
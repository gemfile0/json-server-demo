module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");
    return {
        users: [
            { id: 1 }
        ],
        surprisingBonus: [
            {
                id: 1,
                userId: 1,
            }
        ],
        visitingBonuses: [
            { 
                id: 1, 
                visitCount: 7, 
                visitPresents: [
                    { day: 2, isOpened: false },
                    { day: 5, isOpened: false },
                    { day: 7, isOpened: false },
                    { day: 10, isOpened: false },
                    { day: 15, isOpened: false },
                ],
                userId: 1 
            }
        ],
        myaquaBonuses: [
            {
                id: 1,
                timeleft: Math.floor(Date.now() / 1000) + 10,
                userId: 1
            }
        ],
        friendsBonuses: [
            {
                id: 1,
                aquas: _.times(8, function(n) {
                    return {
                        id: n + 1,
                        name: faker.name.findName(),
                        level: Math.floor(Math.random() * 10) + 1,
                        pictureUrl: faker.internet.avatar(),
                        aquaDatas: [
                            {
                                id: 1,
                                level: Math.floor(Math.random() * 4) + 1,
                                fishCountDatas: [
                                    {
                                        id: Math.floor(Math.random() * 134) + 1,
                                        count: 10
                                    }
                                ]
                            }
                        ]
                    } 
                }), 
                userId: 1
            }
        ],
        instantBonuses: [
            {
                id: 1,
                timeleft: Math.floor(Date.now() / 1000) + 20,
                values: [
                    {type: 0, value: 100000},
                    {type: 0, value: 150000},
                    {type: 0, value: 200000},
                    {type: 0, value: 250000},
                    {type: 0, value: 300000},
                    {type: 0, value: 400000},
                    {type: 0, value: 500000},
                    {type: 0, value: 700000},
                    {type: 0, value: 1000000},
                    {type: 0, value: 2000000},
                ],
                userId: 1
            }
        ],
    }
}
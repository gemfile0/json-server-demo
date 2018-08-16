module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");
    return {
        surprisingBonus: {
            visitedDays: 7,
            visitingPresents: [
                {day: 2, isOpened: false },
                {day: 5, isOpened: false },
                {day: 7, isOpened: false },
                {day: 10, isOpened: false },
                {day: 15, isOpened: false },
            ],
            timeleftTilMyaquaBonus: Math.floor(Date.now() / 1000) + 10,
            friendsAquas: _.times(8, function(n) {
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
            timeleftTilInstantBonus: Math.floor(Date.now() / 1000) + 20,
            instantBonuses: [
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
            ]
        }
    }
}
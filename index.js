module.exports = function() {
    var faker = require("faker");
    var _ = require("lodash");
    return {
        users: [
            { id: 1 }
        ],
        surprisingBonuses: [
            {
                id: 1,
                userId: 1,
            }
        ],
        visitBonuses: [
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
                surprisingBonusId: 1,
                bonusTableId: 1
            }
        ],
        bonusTables: [
            {
                id: 1, // visit bonus
                values: [
                    { id: 2, type: 0, value: 20000 },
                    { id: 5, type: 0, value: 50000 },
                    { id: 7, type: 0, value: 70000 },
                    { id: 10, type: 0, value: 100000 },
                    { id: 15, type : 0, value: 150000 }
                ]
            },
            {
                id: 2, // instant bonus
                values: [
                    { id: 1, type: 0, value: 100000 },
                    { id: 2, type: 0, value: 150000 },
                    { id: 3, type: 0, value: 200000 },
                    { id: 4, type: 0, value: 250000 },
                    { id: 5, type: 0, value: 300000 },
                    { id: 7, type: 0, value: 400000 },
                    { id: 8, type: 0, value: 500000 },
                    { id: 9, type: 0, value: 700000 },
                    { id: 10, type: 0, value: 1000000 },
                    { id: 11, type: 0, value: 2000000 },
                ]
            }
        ],
        myaquaBonuses: [
            {
                id: 1,
                timestamp: Math.floor(Date.now() / 1000) + 15,
                surprisingBonusId: 1
            }
        ],
        friendsBonuses: [
            {
                id: 1,
                timestamp: Math.floor(Date.now() / 1000) + 15,
                friendsAquas: _.times(10, function(n) {
                    const levelGenerated = Math.floor(Math.random() * 10) + 1;
                    return {
                        id: n + 1,
                        name: faker.name.findName(),
                        level: levelGenerated,
                        pictureUrl: faker.internet.avatar(),
                        aquas: [
                            {
                                id: 1,
                                level: Math.floor(Math.random() * 4) + 1,
                                fishCounts: [
                                    {
                                        id: Math.floor(Math.random() * 134) + 1,
                                        count: 10
                                    }
                                ]
                            }
                        ],
                        hasVisited: false, 
                        bonusValue: 10000 * levelGenerated
                    } 
                }), 
                surprisingBonusId: 1
            }
        ],
        instantBonuses: [
            {
                id: 1,
                timestamp: Math.floor(Date.now() / 1000) + 15,
                surprisingBonusId: 1,
                bonusTableId: 2
            }
        ]
    }
}
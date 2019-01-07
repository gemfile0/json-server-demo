const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const db = router.db;
const faker = require("faker")
const _ = require("lodash")

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter({
    '/login': '/users'
}))

server.post('/users', (req, res, next) => {
    const { uid } = req.body
    const user = db
        .get('users')
        .find({ uid: uid })
        .value()
    
    if (user == null) {
        
    } else {
        req.method = 'GET'
        req.body.id = user.id;
        req.query = req.body
    }

    next();
})

router.render = (req, res) => {
    const { data } = res.locals
    
    console.log("[router.render] req.method : " + req.method + ", req.path : " + req.path);

    if (req.method == 'POST') {
        const { id } = data
        const surprisingBonus = db
            .get('surprisingBonuses')
            .find({ id: id })
            .value()
        
        if (surprisingBonus == null) {
            initInventory(id)
            initUser(id)
            initSurprisingBonus(id)
            initInbox(id)
            initShowcase(id)
            initRelation(id)
            initShopping(id);
            initTodaysEvent(id);
        }
        
        data.aquaInventory = db.get('aquaInventories').find({ id: id }).value()
        data.lobbyInventory = db.get('lobbyInventories').find({ id: id }).value()
        res.jsonp(data)
        
    } else if (req.method == 'GET' && req.path == '/users') {
        const { id } = req.body;
        const user = db
            .get('users')
            .find({ id: id })
            .value()
        
        user.aquaInventory = db.get('aquaInventories').find({ id: id }).value()
        data.lobbyInventory = db.get('lobbyInventories').find({ id: id }).value()
        res.jsonp(user)
        
    } else {
        res.jsonp(data)
    }
}

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

function initUser(id) {
    db.get('users')
        .find({ id: id })
        .assign({ 
            created: Math.floor(Date.now() / 1000),
            level: 1,
            xp: 0,
            coin: 10000000,
            gem: 100
        })
        .write()
}

function initInventory(id) {
    if (db.get('shopTables').size().value() == 0) {
        db.get('shopTables')
            .push(
            {
                id: 1, // lobby shop
                name: "lobbyShop",
                values: [
                    { id: 1, isNew: true, soldCount: 1, releaseTime: 1533195389, priceToBuy: 10 },
                    { id: 2, isNew: false, soldCount: 2, releaseTime: 1533195388, priceToBuy: 20  },
                    { id: 3, isNew: false, soldCount: 3, releaseTime: 1533195387, priceToBuy: 30 },
                    { id: 4, isNew: false, soldCount: 4, releaseTime: 1533195386, priceToBuy: 40  },
                    { id: 5, isNew: false, soldCount: 5, releaseTime: 1533195385, priceToBuy: 50  },
                    { id: 6, isNew: false, soldCount: 1, releaseTime: 1533195384, priceToBuy: 60  },
                    { id: 7, isNew: false, soldCount: 1, releaseTime: 1571825094, priceToBuy: 70  },
                    { id: 8, isNew: false, soldCount: 1, releaseTime: 1571825094, priceToBuy: 80  },
                    { id: 9, isNew: false, soldCount: 1, releaseTime: 1571825094, priceToBuy: 90  },
                    { id: 10, isNew: false, soldCount: 1, releaseTime: 1571825094, priceToBuy: 100  }
                ]
            },
            {
                id: 2, // aqua shop
                name: "aquaShop",
                values: [
                    { id: 1, isNew: false, releaseTime: 1533195381, priceToBuy: 10 },
                    { id: 2, isNew: false, releaseTime: 1533195382, priceToBuy: 20  },
                    { id: 3, isNew: false, releaseTime: 1533195383, priceToBuy: 30  },
                    { id: 4, isNew: false, releaseTime: 1533195384, priceToBuy: 40  },
                    { id: 5, isNew: false, releaseTime: 1533195385, priceToBuy: 50  },
                    { id: 6, isNew: false, releaseTime: 1533195386, priceToBuy: 60  },
                    { id: 7, isNew: false, releaseTime: 1533195387, priceToBuy: 70  },
                    { id: 8, isNew: false, releaseTime: 1533195388, priceToBuy: 80  },
                    { id: 9, isNew: false, releaseTime: 1533195389, priceToBuy: 90  },
                    { id: 10, isNew: false, releaseTime: 1533195390, priceToBuy: 100  },
                    { id: 11, isNew: false, releaseTime: 1533195391, priceToBuy: 110  },
                    { id: 12, isNew: false, releaseTime: 1533195392, priceToBuy: 120  },
                    { id: 13, isNew: false, releaseTime: 1533195393, priceToBuy: 130  },
                    { id: 14, isNew: false, releaseTime: 1533195394, priceToBuy: 140  },
                    { id: 15, isNew: false, releaseTime: 1533195395, priceToBuy: 150  },
                    { id: 16, isNew: false, releaseTime: 1533195396, priceToBuy: 160  },
                    { id: 17, isNew: false, releaseTime: 1533195397, priceToBuy: 170  },
                    { id: 18, isNew: false, releaseTime: 1533195398, priceToBuy: 180  },
                    { id: 19, isNew: false, releaseTime: 1533195399, priceToBuy: 190  },
                    { id: 20, isNew: false, releaseTime: 1533195400, priceToBuy: 200  },
                ]
            },
            {
                id: 3,  // coin shop
                name: "coinShop",
                values: [
                    { id: 1,  value: 2000000,    price: "1.99" },
                    { id: 2,  value: 6000000,    price: "4.99" },
                    { id: 3,  value: 13000000,   price: "9.99" },
                    { id: 4,  value: 40000000,   price: "19.99" },
                    { id: 5,  value: 120000000,  price: "39.99" },
                    { id: 6,  value: 240000000,  price: "59.99" },
                    { id: 7,  value: 500000000,  price: "99.99" },
                    { id: 8,  value: 1200000000, price: "199.99" },
                    { id: 9,  value: 2300000000, price: "299.99" },
                    { id: 10, value: 5000000000, price: "499.99" },
                ]
            },
            {
                id: 4,  // gem shop
                name: "gemShop",
                values: [
                    { id: 1, value: 100,  valueOrigin: 0,    price: "0.99" },
                    { id: 2, value: 240,  valueOrigin: 200,  price: "1.99" },
                    { id: 3, value: 700,  valueOrigin: 500,  price: "4.99" },
                    { id: 4, value: 1440, valueOrigin: 900,  price: "8.99" },
                    { id: 5, value: 3600, valueOrigin: 2000, price: "19.99" },
                ]
            },
            {
                id: 5, // Sale
                name: "sale",
                values: [
                    { id: 1, value: 1800000,  valueOrigin: 600000,  price: "4.99",  xpBoost: 5 },
                    { id: 2, value: 3300000,  valueOrigin: 1100000, price: "9.99",  xpBoost: 9 },
                    { id: 3, value: 12000000, valueOrigin: 4000000, price: "19.99", xpBoost: 19 }
                ]
            },
            {
                id: 6,
                name: "speicalDeal",
                values: [
                    { id: 1, value: 12000000, valueOrigin: 4000000, price: "19" }
                ]
            },
            {
                id: 7,
                name: "coupon",
                values: [
                    { id: 0, value: 1.0 },
                    { id: 1, value: 2.0 },
                    { id: 2, value: 1.75 },
                    { id: 3, value: 1.5 },
                    { id: 4, value: 1.25 },
                ]
            })
            .write()
    }

    db.get('lobbyInventories')
        .push({
            id: id,
            lobbyIndex: 1,
            lobbies: [
            {
                id: 1,
                purchaseTime: 1533285485
            }],
            userId: id,
            shopTableId: 1
        })
        .write()
    
    db.get('aquaInventories')
        .push({
            id: id,
            aquaIndex: 0,
            aquas: [
            {
                id: 1,
                purchaseTime: 1533285485,
                level: 7,
                fishes: [
                {
                    id: 100,
                    count: 5,
                    added: 0
                },
                {
                    id: 111,
                    count: 3,
                    added: 0
                },
                {
                    id: 124,
                    count: 1,
                    added: 0
                },
                {
                    id: 120,
                    count: 1,
                    added: 0
                },
                {
                    id: 132,
                    count: 1,
                    added: 0
                },
                {
                    id: 134,
                    count: 1,
                    added: 0
                }]
            }],
            fishes: _.times(134, function(n) {
                return {
                    id: n + 1,
                    count: 30,
                    added: 0
                }
            }),
            userId: id,
            shopTableId: 2
        })
        .write()
}

function initTodaysEvent(id) {
    db.get('todaysEvents')
        .push({
            id: id,
            userId: id,
            achievedCount: 1,
            nextEvent: {
                isOpened: false,
                spins: 0,
                spinsToOpen: 0,
                priceToOpen: 10,
            },
            state: 0,
            missions: [
                {
                    id: 1, 
                    timeAssigned: Math.floor(Date.now() / 1000),
                    timeBegin: 0,
                    coins: 0,
                    retry: {
                        count: 1,
                        price: 10
                    },
                    goal: {
                        duration: 30,
                        type: 0,
                        value: 10000
                    },
                    reward: {
                        fishId: Math.floor(Math.random() * 134) + 1,
                        type: 0,
                        value: 50000
                    }
                }
            ]
        })
        .write()
}

function initShopping(id) {
    db.get('shoppings')
        .push({
            id: id,
            userId: id,
            coupons: [
                { id: 1, type: 1 }, 
                { id: 2, type: 2 }, 
                { id: 3, type: 3 }, 
                { id: 4, type: 4 }, 
                { id: 5, type: 1 }, 
                { id: 6, type: 1 }
            ],
            xpBoostExpiration: 0,
            sale: {
                id: 1,
                types: [1, 2, 3],
                expiration: Math.floor(Date.now() / 1000) + 3600 * 72
            },
            specialDeal: { 
                id: 1, 
                type: 1, 
                expiration: Math.floor(Date.now() / 1000) + 3600 * 24 
            }
        })
        .write()
}

function initRelation(id) {
    db.get('relations')
        .push({
            id: id,
            userId: id,
            friends: _.times(10, function(n) {
                return {
                    id: n + 1,
                    name: faker.name.findName(),
                    level: Math.floor(Math.random() * 10) + 1,
                    pictureUrl: faker.internet.avatar(),
                    hasSent: false
                }
            }),
            others: _.times(10, function(n) {
                return {
                    id: n + 11,
                    name: faker.name.findName(),
                    level: Math.floor(Math.random() * 10) + 1,
                    pictureUrl: faker.internet.avatar(),
                    hasSent: false
                }
            })
        })
        .write()
}

function initShowcase(id) {
    db.get('showcases')
        .push({
            id: id,
            userId: id,
            aquaInventories: _.times(5, function(n) {
                return {
                    id: n + 1,
                    name: faker.name.findName(),
                    level: Math.floor(Math.random() * 10) + 1,
                    pictureUrl: faker.internet.avatar(),
                    aquas: [
                        {
                            id: Math.floor(Math.random() * 20) + 1,
                            level: Math.floor(Math.random() * 4) + 1,
                            fishes: [
                                {
                                    id: Math.floor(Math.random() * 134) + 1,
                                    count: 10,
                                }
                            ]
                        }
                    ],
                    hasVisited: false
                }
            }),
            fishInventories: _.times(5, function(n) {
                return {
                    id: 5 + 1,
                    name: faker.name.findName(),
                    level: Math.floor(Math.random() * 10) + 1,
                    pictureUrl: faker.internet.avatar(),
                    fishes: [
                        {
                            id: Math.floor(Math.random() * 134) + 1,
                            count: 10
                        }
                    ],
                    hasVisited: false
                }
            })
        })
        .write()
}

function initInbox(id) {
    db.get('inboxes')
        .push({
            id: id,
            userId: id,
            mails: [
            {
                id: 1,
                iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/128/email-icon.png',
                timestamp: 1534550400,
                title: 'FB CONNECT BONUS',
                desc: 'Welcome to MY AQUA CASINO!',
                bonusValue: 100000,
                isOpened: false
            },
            {
                id: 2,
                iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/128/email-icon.png',
                timestamp: 1534647600,
                title: 'APOLOZIZING COMPENSATION',
                desc: 'Please forgive our mistake!',
                bonusValue: 30000,
                isOpened: false
            },
            {
                id: 3,
                iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/128/email-icon.png',
                timestamp: 1534744800,
                title: 'CHEER UP BONUS',
                desc: 'We served for your more fun.',
                bonusValue: 50000,
                isOpened: false
            },
            {
                id: 4,
                iconUrl: 'http://icons.iconarchive.com/icons/graphicloads/100-flat-2/128/email-icon.png',
                timestamp: 1534842000,
                title: `WELCOME ${faker.name.findName()}`,
                desc: 'We miss you and wish your more fun.',
                bonusValue: 50000,
                isOpened: false
            },
            {
                id: 5,
                iconUrl: faker.internet.avatar(),
                timestamp: 1534939200,
                title: 'REWARD FOR INVITAION',
                desc: `${faker.name.findName()} accepted your invitation!`,
                bonusValue: 50000,
                isOpened: false
            },
            {
                id: 6,
                iconUrl: faker.internet.avatar(),
                timestamp: 1535036400,
                title: 'FRIENDS’ GIFT',
                desc: `${faker.name.findName()} gift to you.`,
                bonusValue: 10000,
                isOpened: false
            },
            {
                id: 7,
                iconUrl: faker.internet.avatar(),
                timestamp: 1535133600,
                title: "SEND GIFT",
                desc: `${faker.name.findName()} will like your gift.`,
                bonusValue: 10000,
                isOpened: false
            },
            {
                id: 8,
                iconUrl: faker.internet.avatar(),
                timestamp: 1535230800,
                title: "SEND GIFT",
                desc: `${faker.name.findName()} will like your gift.`,
                bonusValue: 20000,
                isOpened: false
            },
            {
                id: 9,
                iconUrl: faker.internet.avatar(),
                timestamp: 1535328000,
                title: "SEND GIFT",
                desc: `${faker.name.findName()} will like your gift.`,
                bonusValue: 100000,
                isOpened: false
            }]
        })
        .write()
}

function initSurprisingBonus(id) {
    db.get('surprisingBonuses')
        .push({ id: id, userId: id })
        .write()

    db.get('visitBonuses')
        .push({
            id: id,
            visitCount: 6,
            visitPresents: [
                { day: 2, isOpened: false },
                { day: 5, isOpened: false },
                { day: 7, isOpened: false },
                { day: 10, isOpened: false },
                { day: 15, isOpened: false },
            ],
            surprisingBonusId: id,
            bonusTableId: 1
        })
        .write()
    
    if (db.get('bonusTables').size().value() == 0) {
        db.get('bonusTables')
            .push(
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
            })
            .write()
    }

    db.get('myaquaBonuses')
        .push({
            id: id,
            timestamp: Math.floor(Date.now() / 1000),
            surprisingBonusId: id
        })
        .write()

    db.get('friendsBonuses')
        .push({
            id: id,
            timestamp: Math.floor(Date.now() / 1000),
            friendsInventories: _.times(10, function(n) {
                const levelGenerated = Math.floor(Math.random() * 10) + 1;
                return {
                    id: n + 1,
                    name: faker.name.findName(),
                    level: levelGenerated,
                    pictureUrl: faker.internet.avatar(),
                    aquas: [
                        {
                            id: Math.floor(Math.random() * 20) + 1,
                            level: Math.floor(Math.random() * 4) + 1,
                            fishes: [
                                {
                                    id: Math.floor(Math.random() * 134) + 1,
                                    count: 10,
                                }
                            ]
                        }
                    ],
                    hasVisited: false, 
                    bonusValue: 10000 * levelGenerated
                } 
            }), 
            surprisingBonusId: id
        })
        .write()

    db.get('instantBonuses')
        .push({
            id: id,
            timestamp: Math.floor(Date.now() / 1000) + 15,
            surprisingBonusId: id,
            bonusTableId: 2
        })
        .write()
}
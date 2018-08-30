// const fs = require('fs')
// const content = fs.readFileSync('template.db.json')
// fs.writeFileSync('db.json', content)

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
        }
        
        data.inventory = db.get('inventories').find({ id: id }).value()
        data.lobbyInventory = db.get('lobbyInventories').find({ id: id }).value()
        res.jsonp(data)
        
    } else if (req.method == 'GET' && req.path == '/users') {
        const { id } = req.body;
        const user = db
            .get('users')
            .find({ id: id })
            .value()
        
        user.inventory = db.get('inventories').find({ id: id }).value()
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
            created: Date.now(),
            level: 1,
            xp: 0,
            coin: 10000000,
            inventoryId: id
        })
        .write()
}

function initInventory(id) {
    if (db.get('shopTables').size().value() == 0) {
        db.get('shopTables')
            .push(
            {
                id: 1, // lobby shop
                values: [
                    { id: 1, isNew: true, soldCount: 1, state: "Arizona", releaseTime: 1533195389, memorialTime: -1826582400 },
                    { id: 2, isNew: false, soldCount: 2, state: "", releaseTime: 1533195388, memorialTime: 0 },
                    { id: 3, isNew: false, soldCount: 3, state: "New Jersey", releaseTime: 1533195387, memorialTime: -5744563200},
                    { id: 4, isNew: false, soldCount: 4, state: "", releaseTime: 1533195386, memorialTime: 0 },
                    { id: 5, isNew: false, soldCount: 5, state: "Ohio", releaseTime: 1533195385, memorialTime: -5264956800 },
                    { id: 6, isNew: false, soldCount: 1, state: "", releaseTime: 1533195384, memorialTime: 0 },
                    { id: 7, isNew: false, soldCount: 1, state: "", releaseTime: 1533195383, memorialTime: 0 },
                    { id: 8, isNew: false, soldCount: 1, state: "", releaseTime: 1533195382, memorialTime: 0 },
                    { id: 9, isNew: false, soldCount: 1, state: "", releaseTime: 1533195381, memorialTime: 0 },
                    { id: 10, isNew: false, soldCount: 1, state: "", releaseTime: 1533195380, memorialTime: 0 }
                ]
            },
            {
                id: 2, 
                
            })
            .write();
    }

    db.get('lobbyInventories')
        .push({
            id: id,
            lobbyIndex: 0,
            lobbies: [
            {
                id: 6,
                purchaseTime: 1533285485
            },
            {
                id: 7,
                purchaseTime: 1533285484
            },
            {
                id: 8,
                purchaseTime: 1533285483
            },
            {
                id: 9,
                purchaseTime: 1533285482
            },
            {
                id: 10,
                purchaseTime: 1533285481
            }],
            userId: id,
            shopTableId: 1
        })
        .write()
    
    db.get('inventories')
        .push({
            id: id,
            aquaIndex: 0,
            aquas: [
            {
                id: 1,
                level: 1,
                fishCounts: [
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
            },
            {
                id: 2,
                level: 1,
                fishCounts: [
                    {
                        id: 5,
                        count: 1,
                        added: 0
                    }
                ]
            }],
            fishCounts: [

            ]
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
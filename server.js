const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const db = router.db;
const faker = require("faker");
var _ = require("lodash");

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
    
    if (req.method == 'POST') {
        const { id } = data
        const surprisingBonus = db
            .get('surprisingBonuses')
            .find({ id: id })
            .value()
        
        if (surprisingBonus == null) {
            initUser(id);
            initSurprisingBonus(id)
        }

        res.jsonp(data)
        
    } else if (req.method == 'GET' && req.path == '/users') {
        const { id } = req.body;
        const user = db
            .get('users')
            .find({ id: id })
            .value()

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
            aquaIndex: 0,
            aquas: [
                {
                    id: 1,
                    level: 1,
                    fishCounts: [
                        {
                            id: 100,
                            count: 5
                        },
                        {
                            id: 111,
                            count: 3
                        },
                        {
                            id: 124,
                            count: 1
                        },
                        {
                            id: 120,
                            count: 1
                        },
                        {
                            id: 132,
                            count: 1
                        },
                        {
                            id: 134,
                            count: 1
                        }
                    ]
                }
            ],
            fishCounts: [

            ]
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
                                    count: 10
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
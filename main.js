let _ = require('lodash');

let harvester = require('harvester');
let upgrader = require('upgrader');
let builder = require('builder');

module.exports.loop = function () {


    // TODO: clean up memory

    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    // TODO: prototyping stuff

    // TODO: random walk to avoid traffic jamming

    // TODO: invent relevance scheme -> action queue
    // recalculate action queue maybe on ever 5th tick (is that even necessary ?)
    // calculate optimal path matrix (maybe recalculate once something of interest is added)
    // -> tick counter

    // what creep(s) to build next
    // which building to repair next
    // where to build (roads)


    // TODO: one time calculate :
    // - optimale distribution to harvest recourse for room
    // - where to build the walls


    // creating creep example :
    // Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
    // { roles: 'harvester', working: false});

    // TODO: create new creeps and assign them their roles (creep factory)
    // roles: harvester, builder, upgrader, carry?, defender, repairer, planner, claimer, miner

    // Memory.
    Memory.buildingQueue = Game.spawns.Spawn1.room.find(FIND_MY_CONSTRUCTION_SITES);


    let harvesters = _.filter(Game.creeps, (c) => c.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (c) => c.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (c) => c.memory.role === 'builder');

    const MaxHarvester = 4; // calculate based on Sources entries
    const MaxUpgrader = 2;
    const MaxBuilders = 2;

    let name = undefined;
    let numberOfHarvesters = 0;
    harvesters.forEach( () => numberOfHarvesters++); //(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgrader = 0;
    upgraders.forEach( () => numberOfUpgrader++);
        //_.sum(upgraders); //(Game.creeps, (c) => c.memory.role === 'upgrader');
    let numberOfBuilders = 0;
    builders.forEach( () => numberOfBuilders++);

    // console.log("number of upgraders" + numberOfUpgrader );
    // console.log("max number of upgraders" +  MaxUpgrader);
    // console.log("number < max " + numberOfUpgrader < MaxUpgrader);
    // console.log("number of harvesters" + numberOfHarvesters );
    // console.log("max number of harvesters" +  MaxHarvester);
    // console.log("number < max " + numberOfHarvesters < MaxHarvester);


    // if there are less then the min amount of harvesters create new
    if (numberOfUpgrader < MaxUpgrader) {
        // TODO: add to building queue
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
            {role: 'upgrader', working: false});
    }
    else if (numberOfHarvesters < MaxHarvester) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'harvester', working: false});
    }
    else if(numberOfBuilders < MaxBuilders){
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'buidler', working: false});
    }

    // var queue = [];
    // queue.push(2);         // queue is now [2]
    // queue.push(5);         // queue is now [2, 5]
    // var i = queue.shift(); // queue is now [5]
    // alert(i);              // displays 2

    harvesters.forEach(creep =>{
            harvester.run(creep);
    });

    upgraders.forEach(creep =>{
        upgrader.run(creep);
    });
    builders.forEach(creep =>{
        builder.run(creep);//, buildingQueue);
    })


    //TODO:  Memory.creepBuildingQueue = [];


};
let _ = require('lodash');

let harvester = require('harvester');
let upgrader = require('upgrader');

module.exports.loop = function () {


    // TODO: clean up memory

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


    let harvesters = _.filter(Game.creeps, (c) => c.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (c) => c.memory.role === 'upgrader');

    console.log("list of harvesters: " + harvesters);
    console.log("list of upgraders: " + upgraders);

    const MinHarvester = 10; // calculate based on Sources
    const MinUpgrader = 2;

    let name = undefined;
    let numberOfHarvesters = _.sum(harvesters); //(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgrader = _.sum(upgraders); //(Game.creeps, (c) => c.memory.role === 'upgrader');

    // if there are less then the min amount of harvesters create new
    if (numberOfUpgrader < MinUpgrader) {
        // TODO: add to building queue
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
            {role: 'upgrader', working: false});
    }
    else if (numberOfHarvesters < MinHarvester) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
            {role: 'harvester', working: false});
    }

    // var queue = [];
    // queue.push(2);         // queue is now [2]
    // queue.push(5);         // queue is now [2, 5]
    // var i = queue.shift(); // queue is now [5]
    // alert(i);              // displays 2

    harvesters.forEach(creep =>{
        console.log("Harvester: " + creep);
        // if(!creep.working){
            harvester.run(creep);
        // }
    });

    upgraders.forEach(creep =>{
        console.log("Harvester: " + creep);
        // if(!creep.working){
        upgrader.run(creep);
        // }
    });


    //TODO:  Memory.creepBuildingQueue = [];


};
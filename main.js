let _ = require('lodash');

let harvester = require('harvester');
let upgrader = require('upgrader');

module.exports.loop = function () {



    // TODO: clean up memory

    // TODO: prototyping stuff

    // TODO: random walk to avoid traffic jamming

    // TODO: invent relevance scheme -> action queue
    // recalculate action queue maybe on ever 5th tick (is that even necessary ?)
    // calculate optimale path matrix (maybe recalculate once somthing of interest is added)
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


    const MinHarvester = 10;
    const MinUpgrader = 2;

    let name = undefined;
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgrader = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
    // if there are less then the min amount of harvesters create new
    if (numberOfUpgrader < MinUpgrader) {
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


    Memory.creepBuildingQueue = [];

    // let a = _.filter(Game.creeps, { memory: {role: 'harvester'} } );
    // console.log("a" + a[0]);

    for(let i = 0; i < numberOfHarvesters; i++){
        harvester.harvest(_.filter(Game.creeps, { memory: {role: 'harvester'} }[i]));
    }

    for(let i = 0; i < numberOfUpgrader; i++){
        upgrader.upgrade(_.filter(Game.creeps, { memory: {role: 'upgrader'} }[i]));
    }

    // for(creep in  _.filter(Game.creeps, { memory: {role: 'upgrader'} } )){
    //     console.log("Upgrader: " + creep);
    //     upgrader.upgrade(creep);
    // }

    // run commands for every creep
    // for (let creep in Game.creeps) {
    //
    //     creep = Game.creeps[creep];
    //
    //     if (creep.working === false) {
    //         console.log("arbeit zuweisen");
    //         switch (creep) {
    //             case 'harvester':
    //                 harvester.harvest(creep);
    //                 break;
    //             case 'upgrader':
    //                 upgrader.upgrade(creep);
    //                 break;
    //         }
    //
    //
    //     }
    //     else{
    //
    //         console.log("keine arbeit zuweisen");
    //     }
    //
    // }
};
/**
 * Created by Max on 15.07.2017.
 */

let harvester = require('harvester');

module.exports = {

    run: function (creep) {

        let repairPriorityQueue = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < 650 && structure.hits > 0)
            }
        });

        if (repairPriorityQueue .length > 0) {
            // repair with priority
            if (creep.repair(repairPriorityQueue [0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(repairPriorityQueue [0]);
            }
        } else {

            // repair other structures then walls and ramparts
            let repairQueue = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax && structure.hits > 0 &&
                    structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART)
                }
            });

            let repairWalls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax &&
                    structure.hits > 0 || structure.hits < structure.hitsMax && structure.hits > 0 &&
                    structure.structureType === STRUCTURE_WALL)
                }
            });

            if (repairQueue.length > 0) {
                if (creep.repair(repairQueue[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairQueue[0]);
                }
            } else {

                if (repairWalls.length > 0) {
                    if (creep.repair(repairWalls[repairWalls.length - 1]) === ERR_NOT_IN_RANGE) { //omgekeerde volgorde zodat ramparts eerst gerepaird worden
                        creep.moveTo(repairWalls[0]);
                    }
                } else {
                    harvester.run(creep); // so it will alway's will be busy. DO NOT FORGET TO IMPORT(var roleHarvester = require('role.harvester');) IT
                }
            }
        }
    }
};
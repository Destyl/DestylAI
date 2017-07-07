/**
 * Created by Max on 03.07.2017.
 */

module.exports = {
    // a function to run the logic for this roles
    run: function (creep) {
        // if creep is bringing energy to the spawn but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn
        if (creep.memory.working === true) {

            if (Game.spawns.Spawn1.energy === Game.spawns.Spawn1.energyCapacity) {

                let extensions = creep.room.find(FIND_STRUCTURES,
                    (s) => s.structureType === STRUCTURE_EXTENSION && s.energy !== s.energyCapacity).map(c => c.id);
                console.log(extensions);

                // if there are free extensions, try to transfer energy to extension
                if (extensions.length > 0 && creep.transfer(Game.getObjectById(extensions[0]), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the spawn
                    creep.moveTo(Game.getObjectById(extensions[0]), {visualizePathStyle: {stroke: '#ffffff'}});
                }

            }
            // try to transfer energy, if the spawn is not in range
            else if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                // move towards the spawn
                creep.moveTo(Game.spawns.Spawn1, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // get assigned source
            let source = Game.getObjectById(creep.memory.sourceID);//creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
// try to harvest energy, if the source is not in range
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
;
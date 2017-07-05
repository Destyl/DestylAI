
modules.exports = {

    run: (creep, buildingQueue) => {

        // there is no work to do
        if (buildingQueue.length < 1) {
            // TODO: repair
        }
        else {

            // a function to run the logic for this role
            if (creep.memory.building === true && creep.carry.energy === 0) {
                creep.memory.building = false;
            }
            else if (creep.memory.building === false && creep.carry.energy === creep.carryCapacity) {
                // switch state
                creep.memory.working = true;
            }

            // if creep is supposed to transfer energy to the building
            if (creep.memory.working === true) {

                // delete construction site from memory if it no longer exists
                if(Game.getObjectById(creep.memory.structure.id) === null){
                    creep.memory.structure = null;
                }

                // get destination of next structure
                let dest;
                if (creep.memory.structure === null) {
                    dest = buildingQueue[0];
                    creep.memory.structure = buildingQueue[0];
                    buildingQueue.shift();
                }
                else {
                    dest = creep.memory.structure;
                }

                // try to build
                if (creep.transfer(creep.room.controller, dest) === ERR_NOT_IN_RANGE) {
                    // if not in range, move towards the structure
                    creep.moveTo(dest);
                }
            }
            // if creep is supposed to harvest energy from source
            else {
                // find closest source
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
    }
};
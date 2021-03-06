var setFilter;
const setCheckboxes = [];

var gearFilter;
const gearCheckboxes = [];

module.exports = {

    initialize: () => {
        setupEventListeners();

        // document.getElementById('updateGear').addEventListener("click", () => {
        //     module.exports.redraw();
        // });

        document.getElementById('editGear').addEventListener("click", () => {
            editGear();
        });
        document.getElementById('addGear').addEventListener("click", () => {
            addGear();
        });
        document.getElementById('removeGear').addEventListener("click", () => {
            removeGear();
        });
        document.getElementById('unequipGear').addEventListener("click", () => {
            unequipGear();
        });
        document.getElementById('lockGear').addEventListener("click", () => {
            lockGear();
        });
        document.getElementById('unlockGear').addEventListener("click", () => {
            unlockGear();
        });

        document.getElementById('tab3label').addEventListener("click", () => {
            module.exports.redraw();
        });
    },

    redraw: () => {
        ItemsGrid.redraw().then(x => {
            ItemsGrid.refreshFilters(setFilter, gearFilter)
            // setFilter = null;
            // for (var checkbox of setCheckboxes) {
            //     checkbox.checked = false;
            // }
            // gearFilter = null;
            // for (var checkbox of gearCheckboxes) {
            //     checkbox.checked = false;
            // }
        });
    }
}


async function editGear() {
    const items = ItemsGrid.getSelectedGear();
    if (!items || items.length != 1) {
        return;
    }

    const item = items[0]

    const editedItem = await Dialog.editGearDialog(item, true);
    console.warn("EDITITEMS", editedItem);

    await Api.editItems([editedItem]);

    module.exports.redraw();
    Saves.autoSave();
}

async function addGear() {
    const newItem = await Dialog.editGearDialog(null, false);
    console.warn("NEWITEM", newItem);

    module.exports.redraw();
    Saves.autoSave();
}

async function removeGear() {
    const items = ItemsGrid.getSelectedGear();

    await Api.deleteItems(items.map(x => x.id));

    module.exports.redraw();
    Saves.autoSave();
}

async function unequipGear() {
    const items = ItemsGrid.getSelectedGear();

    await Api.unequipItems(items.map(x => x.id));

    module.exports.redraw();
    Saves.autoSave();
}

async function lockGear() {
    const items = ItemsGrid.getSelectedGear();

    await Api.lockItems(items.map(x => x.id));

    module.exports.redraw();
    Saves.autoSave();
}

async function unlockGear() {
    const items = ItemsGrid.getSelectedGear();

    await Api.unlockItems(items.map(x => x.id));

    module.exports.redraw();
    Saves.autoSave();
}

function setupEventListeners() {
    // Sets

    const sets = Object.keys(Assets.getAssetsBySet())
    console.log("SETUP", sets);
    for (var set of sets) {
        const checkbox = document.getElementById('checkboxImage' + set);
        checkbox.addEventListener('change', function(event) {
            var eventSet = event.target.id.split("checkboxImage")[1];
            if (event.target.checked) {
                setFilter = eventSet
                for (var checkbox of setCheckboxes) {
                    if (checkbox != event.target)
                        checkbox.checked = false;
                }
            } else {
                setFilter = null;
            }

            ItemsGrid.refreshFilters(setFilter, gearFilter);
        });
        setCheckboxes.push(checkbox);
    }

    document.getElementById('checkboxImageClearSets').addEventListener('change', function(event) {
        console.log(event);
        if (event.target.checked) {
            setFilter = null;
            for (var checkbox of setCheckboxes) {
                checkbox.checked = false;
            }
        } else {

        }

        ItemsGrid.refreshFilters(setFilter, gearFilter);
    });

    // Gear

    const gears = Object.keys(Assets.getAssetsByGear())
    console.log("SETUP", gears);
    for (var gear of gears) {
        const checkbox = document.getElementById('checkboxImage' + gear);
        checkbox.addEventListener('change', function(event) {
            var eventGear = event.target.id.split("checkboxImage")[1];
            if (event.target.checked) {
                gearFilter = eventGear
                for (var checkbox of gearCheckboxes) {
                    if (checkbox != event.target)
                        checkbox.checked = false;
                }
            } else {
                gearFilter = null;
            }

            ItemsGrid.refreshFilters(setFilter, gearFilter);
        });
        gearCheckboxes.push(checkbox);
    }

    document.getElementById('checkboxImageClearGears').addEventListener('change', function(event) {
        console.log(event);
        if (event.target.checked) {
            gearFilter = null;
            for (var checkbox of gearCheckboxes) {
                checkbox.checked = false;
            }
        } else {

        }

        ItemsGrid.refreshFilters(setFilter, gearFilter);
    });
}
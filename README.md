


# Fribbels Epic 7 Gear Optimizer

This is a tool for organizing gear and optimizing gear and unit builds for Epic 7. Gearing units can be time consuming and it's not easy to find optimal combinations of gear within the game, so I made this to help make the gearing process easier.

Please see the [**Getting Started**](https://github.com/fribbels/Fribbels-Epic-7-Optimizer#getting-started) section for instructions on how to use it.

Features include:
 - Built in image recognition to import gear from screenshots
 - Filter gear optimizer with main stats/sub stats/sets/etc
 - Automatic data updates from EpicSevenDB for new heroes
 - Hero bonus stats for imprints/artifacts
 - Gear substat efficiency scoring
 - Color coded results sorting

Here's what it looks like currently:

![](https://i.imgur.com/vVR4ZMq.png)

## Requirements
- Windows or MacOS 64-bit
- Java 8 installed (Please download if you don't yet have it: https://www.java.com/en/download/)
_________________

**Table of Contents**:
  * [Optimizer Tab](#optimizer-tab)
    + [Settings panel](#settings-panel)
    + [Primary stat filter](#primary-stat-filter)
    + [Calculated stat filter](#calculated-stat-filter)
    + [Substat force filter](#substat-force-filter)
    + [Substat priority filter](#substat-priority-filter)
    + [Main stat and set filters](#main-stat-and-set-filters)
    + [Optimization Results](#optimization-results)
  * [Gear Tab](#gear-tab)
  * [Heroes Tab](#heroes-tab)
  * [Importer tab](#importer-tab)
    + [Creating a new gear set from screenshots](#creating-a-new-gear-set-from-screenshots)
    + [Importing a gear set from a file](#importing-a-gear-set-from-a-file)
    + [Save/Load gear and heroes](#save-load-gear-and-heroes)
    + [Import gear from Zarroc optimizer](#import-gear-from-zarroc-optimizer)
  * [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Troubleshooting](#troubleshooting)
  * [Closing thoughts](#closing-thoughts)
  * [Contact me](#contact-me)


## Optimizer Tab

Here I'll go through the different parts of the optimizer tab, using a tank Ruele build as an example. There are a bunch of panels with options for filtering the gear that I'll walk through in detail.

_________________

### Settings panel

![](https://i.imgur.com/IvYnxpk.png)

This panel tracks settings for the other panels to use.

- **Hero**: Select the hero you want to optimize for from the drop down.
- **Force mode**: Selects the number of substats to enforce from the options selected in the force panel. (See force panel for more details).
- **Permutations**: Displays the current number of gear permutations possible from your filter choices. The more permutations there are, the more gear the optimizer has to calculate, and the longer the optimization will take. Try to adjust your filters to shrink this number down.
- **Locked items**: When checked, locked items will be used in the optimization. When unchecked, locked items are ignored.
- **Equipped items**: When checked, equipped items will be used in the optimization. When unchecked, equipped items are ignored EXCEPT for the unit's own equipped items.
- **Keep current**: When checked, the unit will be forced to use the gear that it currently has, and the optimizer will only try to optimize the gear slots that the unit has unequipped.
- **Can reforge**: When checked, the results will only contain builds with at least one piece of 85 gear that can be reforged.
- **Submit**: Click to start to optimization request.
- **Filter**: Once an optimization is complete, click to filter the results by the stats on the filter panels.
- **Cancel**: Interrupts and cancels an ongoing optimization request.

_________________

### Primary stat filter

![](https://i.imgur.com/j8ZcSCv.png)

This panel defines the stats to filter your optimization results by. The left boxes represent the minimum (inclusive) and the right boxes represent the maximum (inclusive). In this example, we're looking for a Ruele build with:
- At least 20,000 HP
- At least 2,400 def
- Between 180 and 200 speed

The filter will apply on your optimization results after you click Submit. Once the results have been generated, you can apply more restrictive filters by changing the numbers here, then clicking the **Filter** button. This will narrow down your results without having to do another search.

_________________

### Calculated stat filter

![](https://i.imgur.com/fp4C5mf.png)

This panel is similar to the primary stats panel, but applies for calculated stats. These stats you won't see in-game but are various ratings that can help decide between different builds.

- **Hp*s** -- `Health * Speed` rating. Useful for optimizing units where you want a combination of speed and pure health.
- **Ehp** -- Effective HP, calculated by: `HP * (Defense/300 + 1)`. EHP is a measure of how much damage your unit can take before dying and is useful for rating the tankiness of units.
- **Ehp*s** -- `Effective HP * Speed` rating. Useful for optimizing units where you want a combination of speed and hp/def for tankiness.
- **Dmg** --  Average damage, calculated by: `Attack * Crit Chance * Crit Damage`. Measures how much damage your unit will deal on average. Note that this takes crit chance into account, so lowering your crit chance impacts the Dmg rating because you'll crit less often, which lowers your average output.
- **Dmg*s** -- DPS rating, calculated by: `Attack * Crit Chance * Crit Damage * Speed`. This measures how fast your unit can dish out damage.
- **Mcdmg** -- Max Crit Damage, calculated by: `Attack * Crit Damage`. This does not take into account Crit Chance, as opposed to Dmg, and assumes your unit is at 100% Crit Chance. Useful for measuring damage of units like CDom that only need 50% Crit Chance, or PVE units that only need 85% with elemental advantage.
- **Mcdmg*s** -- Max DPS rating, calculated by `Attack * Crit Damage * Speed`. Similar to Dmg*s, just without Crit Chance.
- **CP** -- This is the CP you would see on the unit's stat page ingame, but doesn't take skill enhances into account. Useful for optimizing unused characters with leftover gear for world boss.

In this example we're looking for Ruele builds with at least 200,000 Effective HP.

_________________

### Substat force filter

![](https://i.imgur.com/83nF7ID.png)

Note that in the settings panel previously we set Force mode to "At least 2 stats". Here we have 3 substats we want to force, and with the force mode, we're only optimizing with gear that match at least 2 of these substats:
- At least 3 Speed
- At least 1 Hp %
- At least 1 Def %

For example:
- A gear with substats: 4 Speed / 8% Atk / 16% Hp / 8% Res would pass this filter because it matches at least 2 stats: Hp% and Speed.
- A gear with substats: 2 Speed / 8% Atk / 16% HP / 8% Res would fail this filter, because only 1 substat matches the filter: Hp% . This gear will not be used in the optimizations.

Setting the substat force filter is useful for narrowing down the search space for the optimizer, and reducing the number of permutations it needs to go calculate will make it go faster. Do be careful about filters you set, because an overly aggressive filter could exclude good gears that are useable for this unit. You could have a gear with 2 Speed/ 40% Hp / 100 flat Def / 200 flat HP, and it would fail this filter because only Hp% matches, even though the gear would still be useful.

_________________

### Substat priority filter

![](https://i.imgur.com/i60uzCg.png)

**This is probably the most useful filter but please read before using it. Using this wrong can exclude good results from the search.**

This filter is applied AFTER the force and set/main stat filters. It works by assigning a rating to each of your gears based on your priority, and then filters by only the top N% of the rated gears. In this example we're mostly looking for a fast and tanky Ruele so we assign:
- HP and Def a high rating of 3, since those are the highest priority stats
- Speed a slightly lower rating of 2
- And Res a rating of 1, as its a nice-to-have stat and can still be useful for her
- We don't particularly care about Attack/Crit Chance/Crit Damage/Effectiveness, so we leave those at 0

Then, we set the Top % slider to 30%. This will take all your weapons, score them based on the priority defined above, then only considers the Top 30% of the scores for optimization. Then it does the same for helmets, armors, etc, and then the optimizer generates permutations based on those Top 30% gears.

**The Top % slider must be set to something other than 100% for this filter to work**, otherwise you're just using the Top 100% of your gears and nothing is being filtered. Worth noting that this rating is a heuristic so it doesn't always produce optimal results if your percent is set too low. I find that 30-50% is a good range to work with, because 50% filters out most of the irrelevant gears (like dps stats on a tank build, or vice versa). Below 30%, the filter gets very sensitive and you might not have enough gears to produce optimal results, so the results can be missing some permutations when some useful gears get filtered out.

An example priority filter for a DPS unit like Arby could be something like this, where you only want damage stats:

![](https://i.imgur.com/sdIG6xQ.png)

Or for a tanky Champion Zerato, where you want a mix of tankiness, damage, and effectiveness, but NOT resistance, you can set resistance to -1 to decrease the gear rating if it has resist substats:

![](https://i.imgur.com/CF3KmxT.png)

Choosing a good priority filter makes the optimization a lot easier since you won't have to consider irrelevant or low-rolled gears as much.

_________________

### Main stat and set filters

![](https://i.imgur.com/Ce0Osot.png)

This one's fairly straightforward, we're looking for:
- Necklaces with Health % OR Defense %
- Rings with Health % OR Defense %
- Boots with Speed
- Speed set
- Resist set OR immunity set

If we don't care about sets as much for a tanky/damage ML Ken or something, this allows for broken sets as well. Here we only care that he has an immunity set, and no preference for any other sets, so they're left blank.

![](https://i.imgur.com/8HEsbvY.png)

_________________

### Optimization Results

![](https://i.imgur.com/7KakkCR.png)

Here you can see all the results from the optimization, sort by stat, and equip/lock the results.
- The top row shows your currently equipped gear stats
- Each column is color coded based on the min/max ranges of the stat on each page
- You can use the arrows at the bottom to navigate between multiple pages of results
- Select All/Deselect All modifies the little checkbox on each gear, or alternatively you can click individual boxes
- Equip Selected will equip those checked gears onto the hero (while unequipping anything they were holding before)
- Lock Selected will mark those checked gears as locked, which affects later optimizations that have "Locked Items" unchecked in settings.

## Gear Tab

![](https://i.imgur.com/EVfm8z3.png)

Here you can find a table of all your gears, and sort/filter them. The icons at the bottom enable filters for set and gear slot, and the X clears the filters.
The **Score** column is a stat I made up which is similar to WSS, with the difference that it takes flat stats into consideration while WSS ignores them. The calculation is:

    Score = Attack %
    + Defense %
    + Hp %
    + Effectiveness
    + Effect Resistance
    + Speed * (8/4)
    + Crit Damage * (8/7)
    + Crit Chance * (8/5)
    + Flat Attack / 39 * 0.5
    + Flat Defense / 31 * 0.5
    + Flat Hp / 174 * 0.5
Its used as a measure of how well your gear rolled, scaled by the max roll for 85 gear (using max of 4, not 5 for speed). I found the average rolls for flat stats and used that as a measure of how well the flat stats rolled. The 0.5 multiplier is completely arbitrary, but represents that flat stats are generally slightly less desirable than percent stats.

![](https://i.imgur.com/fwqjtkF.png)

You can edit existing gears or add new gears with this page, and filling in the relevant fields.


## Heroes Tab

![](https://i.imgur.com/czOpXvo.png)

Here you can add new heroes and manage existing ones. I think most of the buttons are fairly self explanatory, the one thing worth noting is the **Add Bonus Stats** page, which lets you add artifact/imprint stats to the hero for optimization.

![](https://i.imgur.com/tAytvsb.png)

SSS Krau with +30 Aurius will have 91 Atk / 819 Hp / and 18% imprint Hp.

## Importer tab

![](https://i.imgur.com/gbgjOgv.png)

This tab lets you do various things with importing/exporting files.

_________________

### Creating a new gear set from screenshots

Select the folder you have your screenshots in and the app will start reading your screenshots. Make sure the folder only contains your screenshots and nothing else. This will then output your gear.txt file, and you can export it somewhere for the next step. If there are any errors reading the screenshots, the list of failed files will be shown.


### Importing a gear set from a file

Once you have the gear.txt file from the OCR step, choose the file and it will import the gear into the optimizer.

* *Append data* will add the new gears to your existing gears.
* *Overwrite data* will load in the new data, removing all previous items and heroes

If you have new screenshot files to add to a save, use the Append option.


### Save/Load gear and heroes

Once you make changes to your items/heroes, the changes should be saved before you close the app. You can choose a file to save it to, and then later on load that file to import the data back in.

The app also does autosave to an 'autosave.json' upon changes being made, and will autoload whatever was saved to the autosave file the next time the app opens.


### Import gear from Zarroc optimizer

If you're already a user of Zarroc's gear optimizer, this lets you import your data directly from your existing save file. All gear, heroes, and artifacts will be imported.


## Getting Started

Please read these instructions carefully!

**Installation:**

1. On the [Releases](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/releases) page, choose the latest release, and download the file that looks like ``FribbelsE7Optimizer-x.x.x...``
    * There should will be a Windows and Mac version, choose the one you're running on. Mac version is still experimental.
    * Do not download the Source Code options, those won't work <br><br>
2. Install **Java 8 - 64 bit** https://www.java.com/en/download/
   * After installing, restart your computer (required!)<br><br>
   * Mac apparently requires both the JRE and JDK. Get the JDK here: https://www.oracle.com/java/technologies/javase-downloads.html
3. Install an emulator to run Epic 7 on
    * I used LDPlayer, but others have work as well: MeMu, BlueStacks, Nox, etc<br><br>
4. Set the emulator's screen resolution to **1600 x 900**. [Example](https://i.imgur.com/kyUQ86a.png)<br><br>
5. Set Epic 7 to enable **High Quality Support** in settings [Example](https://i.imgur.com/iEbfVN3.png)<br><br>

6. Unzip the downloaded file, and run FribbelsE7Optimizer.exe (or FribbelsE7Optimizer.dmg on Mac) [Example](https://i.imgur.com/jltdg0U.png)<br><br>


**Importing gear screenshots:**

1. Open the Gear Management screen in Epic 7 and sort by Max Enhance<br><br>
2. Click each of the gears that you want to import, and screenshot it. Every screenshot should be 1600x900 and look EXACTLY like this:

![https://i.imgur.com/ny7uaa8.jpg](https://i.imgur.com/ny7uaa8.jpg)


* Most emulators have a screenshot hotkey to make this easier: Ctrl + 0 for LDPlayer
* I would recommend screenshotting just a few gears to start with, then testing the rest of the steps to make sure the screenshots work before doing them all. I usually only screenshot the +9 to +15 gears.
3. Collect all your screenshots into a single folder.<br><br>
4. Go to the Importer tab, click on "Choose folder" under *Creating a new gear set from screenshots*, find your screenshots folder, and click Open Folder.<br><br>
5. The app will start reading the screenshots and your progress will be displayed. Once it is done, click Export, and save the *gear.txt* file.<br><br>
6. Under the *Importing a gear set from a file* section, click on Append data, and select your *gear.txt* file.<br><br>
7. Now you should see your imported gears under the Gears tab.

**Optimizing a unit:**

1. Add a unit on the Heroes tab, by selecting their name and clicking Add New Hero.
2. Select the new hero and click Add Bonus Stats. Here add any stats from your artifact, imprint, or EE. [Example](https://i.imgur.com/2aC22mN.png)
3. Go to the Optimizer tab, then select the hero. Fill in the main stats and set that you want into the right panel. [Example](https://i.imgur.com/3yfbkrE.png)
4. Fill in any filters you would like to apply. Each filter is described in detail in this section: https://github.com/fribbels/Fribbels-Epic-7-Optimizer#optimizer-tab
5. Hit Submit, and after processing a bit you should see a table of results.
6. Navigate the results with your arrow keys or mouse, select the result you want, and click Equip Selected.
7. You should now see your hero using those gears.
8. If you want to manually equip a certain item on a unit, go to the Gear tab -> Edit Selected Item -> Equipped. [Example](https://i.imgur.com/Bqs3ETL.png)

Here's a video that covers most of the importing process: https://www.youtube.com/watch?v=i_QW4INcZIE


**Tips to get good optimization results:**

* Here's some quick tips on getting the best results. This is assuming you've read the [Optimization panel](https://github.com/fribbels/Fribbels-Epic-7-Optimizer#optimizer-tab) descriptions
* The goal is to add filters to narrow down results so the optimizer doesn't take forever, but keep the search range wide enough that you don't lose good options.
* Input the sets and main stats whenever possible. This is the easiest way to narrow down results.
* Don't narrow down your results too much. If you see your # of permutations at like 10,000 or so, your filters might be too narrow, you can expand/remove some filters for more/better results.
* Make sure to set your stat priority correctly! DPS units should have high priority on Atk / Cr / Cd / Speed. Tank units should have high priority on Hp / Def / Speed for example. Bad priorities will lead to bad results because good options get filtered out.
* Adjust the Top n% bar on the priority filter to see what your results look like. Too high % will take a long time, but too low % will exclude good results. Most of the time I use 30-50%, sometimes lower if I want my best gear on the unit.
* The Top n%/priority filter is applied AFTER the set and force filters. If your result permutations are already low enough after those two filters, you don't need the priority filter - it might start excluding good results.
* If you want a certain piece of gear to stay on a hero, go to the Gear tab -> Edit Selected Item -> Equipped and equip it on them first. [Example](https://i.imgur.com/oNO9ivL.png) Then you can use the optimizer with "Keep current" checked to keep that piece on them.

## Closing thoughts

Hopefully this is useful for anyone looking for an easier way to gear their units. I know the [Zarroc optimizer](https://github.com/Zarroc2762/E7-Gear-Optimizer) does a lot of similar things but it has been pretty unmaintained and out of date, so I decided to build my own app with a different optimization algorithm. There's still a lot of room to improve and I plan on adding new stuff as feedback comes in. I only work on this in my spare time, so please be patient with new features, and I welcome other contributors to the code as well.

**TODO - high priority:**
 - Release 1.1.0

 **Medium priority:**
 - Improvements to the priority ranking filter
 - Fix: Update WSS/Score when gear stats changed
 - Clear out item previews on refresh
 - Enable cross platform for Linux
 - Clean up optimization panel - getting too cluttered
 - Fix: Keep current position of a page when edits are made, currently refreshes the entire grid
 - Add can reforge, can enhance columns
 - Save hero's filter preferences
 - Option to equip gear from heroes page
 - Customize result limit

 **Low priority:**
 - Investigate decrypting cache for imports
 - Simulate reforged stats on non-reforged piece
 - Move save/load to File menu
 - Optimize multiple heroes at once
 - Fix: Decimal numbers for imprints
 - Optimize results with a missing piece(s)
 - Add different level/awakening options
 - Tools for optimizing HP scaling units/skill scaling
 - Fix: See unit stats for whatever gear they have currently, not just for 6 pieces
 - Class/Element filter for Heroes tab
 - Gear page, option to use more than one set/gear filter at time
 - Score per roll column in gear
 - Gear enhance filters
 - Option to select a location to save zarroc import

**Version 1.1.0 Release:**
 - Fix: Crit chance/crit damage uncapped in CP calculation
 - Fix: Add the 3 new sets through the edit item page
 - Fix: Add a limit to color coded boxes for 100% crit and for crit dmg
 - Show current stats for the hero in the Optimizer tab
 - Button to delete items
 - Add CP on heroes page + optimizer screen
 - Fix: Throw error when adding invalid item
 - Add percent options for the bonus stats page
 - Add a filter for reforge-able optimization results
 - Remove dual attack chance
 - Fix: Damage calculations with overcapped crit damage/chance
 - Add more confirmation dialogs/output text for the optimizer page
 - Merge gear files
 - Import heroes from Zarroc optimizer file
 - Fix: Don't deselect filters when editing items
 - Autoload save file
 - Import artifact data from Zarroc file
 - Add stats for specialty change heroes
 - Fix: Update # of permutations when a filter is removed.
 - Memory cleanup, attempt garbage collection on new optimization request
 - Arrow keys for going up and down the grids
 - Multi select
 - Show percentage equivalent of flat stats on Optimizer page
 - Fix: Remove hero should unequip items
 - Add counts for filtered items
 - Added lock/unlock multiple items button
 - Fix: Prevent saving invalid items without set/type/etc
 - Fix: Update score when item is updated
 - Enable cross platform for Mac
 - Update instructions
 - Autosave more frequently, autosave on manual save
 - Fix calculations for 3 new sets

## Troubleshooting

- Restart your computer and retry first (there might be an child process still kicking around)
- Try killing any java.exe processes in Task Manager that came from this app
- Error message: 'java is not recognized as an internal or external command' upon opening the app. Install Java 8 64-bit version to fix.
- After selecting a screenshot folder and pressing submit, nothing happens or gets stuck. Check if there are any invalid screenshots in your folder. They should all look like exactly like https://i.imgur.com/ny7uaa8.jpg in 1600x900 resolution
- If you don't see the .exe file, you might have downloaded the Source code instead of the binaries. Go to https://github.com/fribbels/Fribbels-Epic-7-Optimizer/releases
 And click on the 'FribbelsE7Optimizer-x.x.x...' file (for whatever the latest version is)
- If you see a "Error: EPERM: operation not permitted" error in the dev console, there are a couple potential fixes:
  - Restart your computer, especially if you installed Java recently
  - Your antivirus might be blocking the app, try disabling it
  - Your file or folder contents might be compressed, uncheck this box on the folder: https://i.imgur.com/kSzTqek.png
  - Run the app as administrator
  - Move the app and screenshots folder to a new file location
- Gear shows up as +45 or i90 pieces show as i20, etc
  - Make sure your screenshots are 1600x900, and on the correct page.
  - Make sure Epic 7 has High Quality Support enabled
- If you get a error that contains "Current relative path is C:\Windows\system32..."
  - I don't actually know the cause of this one, but one way to fix it is copying the data/tessdata/eng.traineddata/eng.traineddata file into the system32 path that its looking for
- If your optimization suddenly stops working completely, check if you have one of these weird looking items in your gear tab: https://i.imgur.com/BzAgRjR.png. If one is there, edit it to fill in all the fields, but just leave the stats at 0. https://i.imgur.com/wDKDaE5.png
- If a hero is missing from the drop down list, the data is being pulled from Epic7DB API. If the hero is available in the API but not in the app, contact me.
- Mac - "The application "FribbelsE7Optimizer" can't be opened.
  - Try unzipping the file using Unarchiver from the app store instead of Archive Utility. [Example](https://i.imgur.com/y9uGQcH.png)
  - Try downloading the .dmg file if you were using the zip file.

## Contact me

Feel free to contact me on discord at fribbels#7526 with questions or comments. If you ran into any issues, please check out the troubleshooting steps above first.

If you want to show support for the optimizer, you can [buy me a coffee!](https://www.buymeacoffee.com/fribbels)
![screenshot](/screenshot.png)

## General Approach

### Read only
- Compact layout (text only)
- Draw bubbles with text
- Ellipsizing
- Pan left and right, up and down
- Draw vertical date lines
- Add annotations
- Zoom in and zoom out

### Editing
- Moving whole event
- Move left and right bound
- Add tips for dates

## What I like about this implementation
Once I established the grid (especially) lining up the annotations, I felt like I was working in a pretty predictable coordinate system.  Things like the editing of dates were straight forward.  The code is generally readable, although it could use a lot more fine tuning and the demo functions without jank.

## Improvements
### Code
In terms of code, there are areas where I feel like I could make some container components to encapsulate adding and removing eventListeners and handlers or nest some components inside of other components where the components generally occur together.  Also, there are still areas where I'm using magic constants that were used to tweak things.  I think a constants file that can be imported would a step in the right direction.

Layout could also be improved.  They way layout is done, it doesn't support stacking within rows with variable height content.  I just keep track of the last xMax in the row without any consideration to the yMax at a certain x value.  It works in its current form because everything in one row is a uniform height.

### UI/UX
I would have liked to add some animation to the implementation (on zoom, on relayout), but I left it out because I felt like spending time on the functionality was more important.  The styling is crude.  The dates at the bottom are not that human readable.

When a user drags an event block around, it sometimes goes behind existing blocks.  I would have to insert that svg below all the others since there's no z-index for svgs.  When you're editing a date, it also runs into other events.  If I re-rendered on every whole date change, it would move conflicting events out of the way, but it also might move the y position of the base element being edited.

When moving an event, moving closer to the edge of the timeline should initiate an auto-pan of the timeline with a velocity proportional to the distance to either edge zone but capped at a certain speed.

Lastly, I did not give any consideration to performance on mobile where the cursor hover states don't give the user hints as to where they can interact with the timeline.  The easiest option would be to make mobile read only.

### Design decisions
Most of the design inspiration came from playing with the atbl implementation.  As always, intentional trade offs due to time constraints can dictate how something turns out.  In this case, most things were left simple and without much styling because I prioritized building functionality.

### Testing
The functions that are responsible for layout are very testable.  All of the positioning data is in the output of the layout function.  You could easily set up various begin and end date test cases to make sure things stack appropriately.  Other parts of the code are also testable like the utilities that I use for performing date calculations and enzyme provides a tool to make sure the markup looks the way it should given for instance an event that `isMouseDown: true` with a `start === end` should only have 1 tooltip.

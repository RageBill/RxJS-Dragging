const {fromEvent} = rxjs;
const {switchMap, map, takeUntil} = rxjs.operators;

const box = document.querySelector("#draggable");

const mousedown$ = fromEvent(box, "mousedown");
const mousemove$ = fromEvent(document, "mousemove");
const mouseup$ = fromEvent(document, "mouseup");

mousedown$.pipe(switchMap(mdEvent => {
    const startPos = {
        x: box.getBoundingClientRect().left,
        y: box.getBoundingClientRect().top,
    };
    box.innerHTML = "Dragging!";
    return mousemove$.pipe(
        map(mmEvent => ({
            x: mmEvent.x - (mdEvent.x - startPos.x),
            y: mmEvent.y - (mdEvent.y - startPos.y),
        })),
        takeUntil(mouseup$)
    )
})).subscribe(coor => {
    box.style.left = `${coor.x}px`;
    box.style.top = `${coor.y}px`;
});

mouseup$.pipe().subscribe(_ => box.innerHTML = "Drag Me!");
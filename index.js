const {fromEvent} = rxjs;
const {switchMap, map, takeUntil} = rxjs.operators;

const box = document.querySelector("#draggable");

const mousedown$ = fromEvent(box, "mousedown");
const mousemove$ = fromEvent(document, "mousemove");
const mouseup$ = fromEvent(box, "mouseup");

mousedown$.pipe(switchMap(_ => {
    box.innerHTML = "Dragging!";
    return mousemove$.pipe(
        map(e => ({x: e.x, y: e.y})),
        takeUntil(mouseup$)
    )
})).subscribe(coor => {
    box.style.left = `${coor.x - 100}px`;
    box.style.top = `${coor.y - 100}px`;
});

mouseup$.pipe().subscribe(_ => box.innerHTML = "Drag Me!");
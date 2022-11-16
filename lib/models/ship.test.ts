import { ShipModel } from "./ship";

const testShip = new ShipModel({
  coords: [
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
  ],
  id: "1",
  length: 3,
  hits: 3,
  sunk: false,
});
const testShip2 = new ShipModel({
  coords: [
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
  id: "2",
  length: 3,
  hits: 2,
  sunk: false,
});
test("ShipModel isSunkMethod (ship shunk)", () => {
  expect(testShip.isSunk()).toBe(true);
});
test("ShipModel isSunkMethod (ship notSunk)", () => {
  expect(testShip2.isSunk()).toBe(false);
});
test("ShipModel hitMethod", () => {
  expect(testShip2.hit()).toBe(3);
});

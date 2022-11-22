import { ShipModel } from "./ship";

const testShip = new ShipModel({
  coords: [
    { x: 1, y: 5 },
    { x: 1, y: 6 },
    { x: 1, y: 7 },
  ],
  id: "1",
  length: 3,
  hits: 2,
  sunk: false,
});
const testShip2 = new ShipModel({
  coords: [
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
  id: "2",
  length: 4,
  hits: 2,
  sunk: false,
});
test("ShipModel hitMethod", () => {
  testShip2.hit();
  expect(testShip2.hits).toBe(3);
  expect(testShip2.hit()).toBe(true);
});

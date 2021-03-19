import { System } from "../../src/entity/System";
import { distance } from "../../src/utils/systemUtils";

const sol = new System();
sol.position_x = 0;
sol.position_y = 0;
sol.position_z = 0;

const systemToSol = [
  {
    x: 3.03125,
    y: -0.09375,
    z: 3.15625,
    distance: 4.38
  },
  {
    x: -1.15625,
    y: -11.03125,
    z: 21.875,
    distance: 24.53
  },
  {
    x: 2.875,
    y: -47.65625,
    z: 54.1875,
    distance: 72.22
  }
]

const betweenTwoSystem = [
  {
    a: {
      x: -8.375,
      y: 6.1875,
      z: -70.53125
    },
    b: {
      x: -1.5625,
      y: 19.65625,
      z: -70.9375
    },
    distance: 15.10
  }
]

describe('distance', function() {
  it('distance between same system must be 0', function() {
    const system = new System();
    system.position_x = 1;
    system.position_y = 1;
    system.position_z = 1;
    
    expect(distance(system, system)).toBe(0);
  });

  describe.each(systemToSol) ('Distance to Sol', data => {
    it(`System at ${data.x},${data.y},${data.z} should be at distance ${data.distance} `, () => {
      const system = new System();
      system.position_x = data.x;
      system.position_y = data.y;
      system.position_z = data.z;

      expect(distance(system, sol).toFixed(2)).toBe(data.distance.toFixed(2));
    })
  });

  describe.each(betweenTwoSystem) ('Distance between two system', data => {
    it(`should be at distance ${data.distance} `, () => {
      const systemA = new System();
      systemA.position_x = data.a.x;
      systemA.position_y = data.a.y;
      systemA.position_z = data.a.z;

      const systemB = new System();
      systemB.position_x = data.b.x;
      systemB.position_y = data.b.y;
      systemB.position_z = data.b.z;

      expect(distance(systemA, systemB).toFixed(2)).toBe(data.distance.toFixed(2));
    })
  });
});

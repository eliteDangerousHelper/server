import { System } from "../entity/System"

export const distance = (systemA: System, systemB: System) => {
  if (systemA.position_x === null
    || systemA.position_y === null
    || systemA.position_z === null
    || systemB.position_x === null
    || systemB.position_y === null
    || systemB.position_z === null
  ) {
    throw new Error("Coordinate error");
  }
  const x = Math.pow(systemA.position_x - systemB.position_x, 2);
  const y = Math.pow(systemA.position_y - systemB.position_y, 2);
  const z = Math.pow(systemA.position_z - systemB.position_z, 2);

  return Math.sqrt(x+y+z);
}
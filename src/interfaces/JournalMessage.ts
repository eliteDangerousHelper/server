import Message from "./Message";

interface State {
  State: string;
}

interface AtmosphereCompositionElement {
  Name: string;
  Percent: number;
}

interface Faction {
  ActiveStates?: State[];
  Allegiance: string;
  FactionState: string;
  Government: string;
  Happiness: string;
  Influence: number;
  Name: string;
}

interface SystemFaction {
  FactionState: string;
  Name: string;
}

export default interface JournalMessage extends Message {
  Body: string;
  BodyID: number;
  BodyType: string;
  Factions?: Faction[];
  Population?: number;
  StarPos: number[];
  StarSystem: string;
  SystemAddress: number;
  SystemAllegiance?: string;
  SystemEconomy?: string;
  SystemFaction?: SystemFaction;
  SystemGovernment?: string;
  SystemSecondEconomy?: string;
  SystemSecurity?: string;
  Atmosphere?: string;
  AtmosphereComposition?: AtmosphereCompositionElement[];
  AtmosphereType?: string;
  AxialTilt?: number;
  BodyName?: string;
  Composition?: { [name: string]: number };
  DistanceFromArrivalLS?: string;
  Eccentricity?: number;
  Landable?: boolean;
  MassEM?: number;
  OrbitalInclination?: number;
  OrbitalPeriod?: number;
  Parents?: { [system: string]: number }[];
  Periapsis?: number;
  PlanetClass?: string;
  Radius?: string;
  RotationPeriod?: string;
  ScanType?: string;
  SemiMajorAxis?: number;
  SurfaceGravity?: number;
  SurfacePressure?: number;
  SurfaceTemperature?: number;
  TerraformState?: string;
  TidalLock?: boolean;
  Volcanism?: string;
  WasDiscovered?: boolean;
  WasMapped?: boolean;

}
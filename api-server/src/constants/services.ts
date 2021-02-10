import { randomChoice } from "../utilities/random";

export const services = (): any[] => [
  {
    id: "1",
    name: "Web",
    status: randomChoice(["up", "down"]),
  },
  {
    id: "2",
    name: "Mobile",
    status: randomChoice(["up", "down"]),
  },
];

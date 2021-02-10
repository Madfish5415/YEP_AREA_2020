type Random = {
  min?: number;
  max?: number;
};

export function random({
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
}: Random): number {
  return Math.random() * (max - min) + min;
}

export function randomChoice(array: any[], min = 0, max = array.length): any {
  return array[Math.floor(random({ min, max }))];
}

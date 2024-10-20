export interface LatestData {
  temp: number | null;
  humidity: number | null;
  time: string;
}

interface ExtremaValue {
  value: number | null;
  time: string;
}

export interface Extrema {
  temp: {
    min: ExtremaValue;
    max: ExtremaValue;
  };
  humidity: {
    min: ExtremaValue;
    max: ExtremaValue;
  };
}

export interface LatestOutputData {
  latest: LatestData;
  extrema: Extrema;
}

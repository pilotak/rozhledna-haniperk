import { LatestOutputData, DbExtremaRow } from '../../types';

export const sanitizeTemperature = (temperature: number | null): number | null => {
  if (temperature === null || temperature > 125 || temperature < -55) {
    return null;
  }

  return Math.round(temperature * 10) / 10;
};

export const sanitizeHumidity = (humidity: number | null): number | null => {
  if (humidity === null || humidity > 100 || humidity < 0) {
    return null;
  }

  return Math.round(humidity * 10) / 10;
};

export const extractExtrema = (input: DbExtremaRow[], output: LatestOutputData): LatestOutputData => {
  input.forEach((array) => {
    // loop through rows
    for (let i = 1; i < input.length; i++) {
      // loop through columns
      for (let j = 1; j < input[i].length; j++) {
        switch (j) {
          case 1: // max temp
            if (output.extrema.temp.max.value === null) {
              output.extrema.temp.max.value = sanitizeTemperature(array[j]);
              output.extrema.temp.max.time = array[0];
            }
            break;

          case 2: // min temp
            if (output.extrema.temp.min.value === null) {
              output.extrema.temp.min.value = sanitizeTemperature(array[j]);
              output.extrema.temp.min.time = array[0];
            } else {
            }
            break;

          case 3: // max humidity
            if (output.extrema.humidity.max.value === null) {
              output.extrema.humidity.max.value = sanitizeHumidity(array[j]);
              output.extrema.humidity.max.time = array[0];
            }
            break;

          case 4: // min humidity
            if (output.extrema.humidity.min.value === null) {
              output.extrema.humidity.min.value = sanitizeHumidity(array[j]);
              output.extrema.humidity.min.time = array[0];
            }
            break;
        }
      }
    }
  });

  return output;
};

export const emptyData = (): LatestOutputData => {
  return {
    latest: {
      temp: null,
      humidity: null,
      time: '',
    },
    extrema: {
      temp: {
        max: {
          value: null,
          time: '',
        },
        min: {
          value: null,
          time: '',
        },
      },
      humidity: {
        max: {
          value: null,
          time: '',
        },
        min: {
          value: null,
          time: '',
        },
      },
    },
  };
};

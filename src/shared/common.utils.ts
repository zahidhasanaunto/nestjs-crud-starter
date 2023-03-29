import slugify from 'slugify';

export const gen6digitOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const slugifyString = (str: string) => {
  const slug = slugify(str, {
    replacement: '-',
    remove: undefined,
    lower: true,
  });
  return slug;
};

export const getPaddedCode = (val: number) => {
  return val.toString().padStart(8, '0');
};

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const groupItemBy = (array, property): any => {
  const groupedData = {},
    props = property.split('.');
  for (let i = 0; i < array.length; i++) {
    let key = props.reduce((acc, prop) => {
      return acc && acc[prop];
    }, array[i]);
    if (!groupedData[key]) groupedData[key] = [];
    groupedData[key].push(array[i]);
  }
  return groupedData;
};

export const getMinValueContainedItem = <T>(array: T[], prop: string): T => {
  return (
    (array.length &&
      array.reduce((prev: T, curr: T) => {
        return prev[prop] < curr[prop] ? prev : curr;
      })) ||
    null
  );
};

export const getMaxValueContainedItem = <T>(array: T[], prop: string): T => {
  return (
    (array.length &&
      array.reduce((prev: T, curr: T) => {
        return prev[prop] > curr[prop] ? prev : curr;
      })) ||
    null
  );
};

export const getPaginationData = (payload: any) => {
  let { page, limit } = payload;
  page = Number(page || 1);
  limit = Number(limit || 10);
  const skip = (page - 1) * limit;
  return { skip, limit, page };
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function getDiffPercentage(min: number, max: number) {
  return Number(100 * Math.abs((max - min) / ((max + min) / 2))).toFixed(0);
}

export const removeDuplicateFromArray = <T>(
  data: T[],
  property: string
): T[] => {
  return data.filter(
    (val: T, index: number, arr: T[]) =>
      arr.findIndex((val2) => val2[property] === val[property]) === index
  );
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

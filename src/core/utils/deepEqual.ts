function deepEqual(elm1: unknown, elm2: unknown): boolean {
  const elm1Type = typeof elm1;
  const elm2Type = typeof elm2;

  if (elm1Type !== elm2Type) {
    return false;
  } else if (['undefined', 'string', 'number', 'boolean'].includes(elm1Type)) {
    if (Number.isNaN(elm1) && Number.isNaN(elm2)) {
      return true;
    } else {
      return elm1 === elm2;
    }
  } else if (elm1 === null) {
    return elm1 === elm2;
  } else if (Array.isArray(elm1) && Array.isArray(elm2)) {
    if (elm1.length === elm2.length) {
      return elm1.every((value, index) => deepEqual(value, elm2[index]));
    }

    return false;
  } else if (elm1Type === 'object') {
    const obj1 = elm1 as Record<string, unknown>;
    const obj2 = elm2 as Record<string, unknown>;

    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length === obj2Keys.length) {
      return obj1Keys.every(key => deepEqual(obj1[key], obj2[key]));
    }

    return false;
  }

  return false;
}

export { deepEqual };

// Merge two arrays

export const mergeArray = (array1, array2, array1Ref, array2Ref) => {
  let mergedAll = [];
  array1.forEach((child1) => {
    array2.forEach((child2) => {
      if (array2.array2Ref === array1Ref) {
        let mergedEach = { ...child1, ...child2 };
        mergedAll.push(mergedEach);
      }
    });
  });

  return mergedAll;
};

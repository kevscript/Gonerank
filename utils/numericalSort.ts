export type NumericalSortParams = {
  rowA: any;
  rowB: any;
  id: string;
};

export const numericalSort = ({ rowA, rowB, id }: NumericalSortParams) => {
  let a = Number.parseFloat(rowA.getValue(id));
  let b = Number.parseFloat(rowB.getValue(id));
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = Number.NEGATIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = Number.NEGATIVE_INFINITY;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

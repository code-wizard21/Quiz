const descendingComparator = (a, b, sort_by) => {
  if (b[sort_by] < a[sort_by]) {
    return -1;
  }

  if (b[sort_by] > a[sort_by]) {
    return 1;
  }

  return 0;
};

export const applySort = (rows, sort, sort_by) => {
  if (!rows || !sort) {
    return rows;
  }

  return rows.sort((a, b) =>
    sort === "desc" ? descendingComparator(a, b, sort_by) : -descendingComparator(a, b, sort_by)
  );
};

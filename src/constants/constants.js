export const FilterTypes = Object.freeze({
  TEXT: "TEXT",
  SELECT: "SELECT",
  NONE: "NONE"
});

export const ColumnFilterTypes = Object.freeze({
  name: FilterTypes.TEXT,
  height: FilterTypes.NONE,
  mass: FilterTypes.NONE,
  hair_color: FilterTypes.SELECT,
  skin_color: FilterTypes.SELECT,
  eye_color: FilterTypes.SELECT,
  birth_year: FilterTypes.NONE,
  gender: FilterTypes.SELECT
});

export const IsColumnNumeric = Object.freeze({
  name: false,
  height: true,
  mass: true,
  hair_color: false,
  skin_color: false,
  eye_color: false,
  birth_year: true,
  gender: false
});

export const SortOrders = Object.freeze({
  MIN_TO_MAX: "MIN_TO_MAX",
  MAX_TO_MIN: "MAX_TO_MIN"
});

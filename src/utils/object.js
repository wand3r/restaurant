import * as R from 'ramda'

export const withoutKey = key =>
  R.pickBy((v, k) => k != key)

export const any = pred => R.pipe(
  R.map(pred),
  R.values,
  R.any(x => x),
)

export const allValues = pred => R.pipe(
  R.map(pred),
  R.values,
  R.all(x => x),
)

export const mapToArray = fn => R.pipe(
  R.mapObjIndexed(fn),
  R.values
)

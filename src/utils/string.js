import * as R from 'ramda'

export const isEmpty = R.pipe(R.trim, R.isEmpty)
export const length = R.pipe(R.trim, R.length)
export const isString = R.is(String)

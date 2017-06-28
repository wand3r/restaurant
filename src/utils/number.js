import * as R from 'ramda'
import * as Str from './string'

export const fromStr = R.ifElse(Str.isEmpty, R.always(undefined), Number)

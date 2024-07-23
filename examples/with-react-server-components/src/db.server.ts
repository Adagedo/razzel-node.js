/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import path from 'path'
import sqlite from 'better-sqlite3'

export const db = sqlite(path.join(process.cwd(), 'db.sqlite3'))

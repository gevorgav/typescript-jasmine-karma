import { getMinutesFromDate } from './util/util'
import { LogLevel } from './model/level'
import { LogModel } from './model/log.model'

export class Logger {

	private _cache = new Map<LogLevel, Array<LogModel>>()

	constructor () {
		this._cache.set(LogLevel.Info, Array.of(new LogModel(new Date(), 'App has been run in the background.')))
	}

	get cache (): Map<LogLevel, Array<LogModel>> {
		return this._cache
	}

	has (level: LogLevel): boolean {
		return this._cache.has(level)
	}

	getLogsByLevel (level: LogLevel): Array<LogModel> | undefined {
		return this._cache.get(level)
	}

	setLog (level: LogLevel, message: string): boolean {
		if ((!level && level !== 0) || !LogLevel[level]){
			return false;
		}
		if (this.cache.get(level)) {
			this.cache.get(level).push(new LogModel(new Date(), message))
		} else {
			this._cache.set(level, Array.of(new LogModel(new Date(), message)))
		}
		return true;
	}

	getLogsByMinutes (lastMinutes: number, logLevel: LogLevel): Array<LogModel> {
		const result: LogModel[] = []
		let now = getMinutesFromDate(new Date())
		if (this.cache.get(logLevel)) {
			this.cache.get(logLevel).forEach(value => {
				if (getMinutesFromDate(value.createDate) > now - lastMinutes) {
					result.push(value)
				}
			})
		}
		return result
	}
}


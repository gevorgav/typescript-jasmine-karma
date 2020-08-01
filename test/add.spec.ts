import { LogLevel } from '../src/model/level'
import { Logger } from '../src/logger'
import { stringToNumber} from '../src/util/util'

declare global {
	namespace jasmine {
		interface Matchers<T> {
			logsCount (expected: number): boolean;
		}
	}
}

describe('Logger class testing', () => {
	let builder = new Logger();

	beforeEach(() => {
		jasmine.addMatchers({
			logsCount: function () {
				return {
					compare: function (actual: Logger, expected: number) {
						let count = 0;
						let keys = Object.values(LogLevel)
							.filter((value) => !isNaN(Number(value)))
							.map((value) => Number(value));
						keys.forEach(value => {
							if (actual.has(value)) {
								count += actual.getLogsByLevel(value).length
							}
						});
						if (count === expected) {
							return {pass: true}
						} else {
							return {pass: false, message: `Actual log count is ${count} expected ${expected}`}
						}
					}
				}
			}
		});

		builder.setLog(LogLevel.Warning, 'Start test mode.');
	});

	afterEach(() => {
		builder = new Logger()
	});

	it('Test getLogsByLevel method.', function () {
		expect(builder.getLogsByLevel(LogLevel.Warning).length).toBe(1);
		expect(builder.getLogsByLevel(LogLevel.Info).length).toBe(1);
		expect(builder.getLogsByLevel(LogLevel.Error)).toBeUndefined();
		expect(builder.getLogsByLevel(null)).toBeUndefined();
	});

	it('Test has method with using Spy', function () {
		spyOn(builder, 'has').and.returnValue(true);
		expect(builder.has(null)).toBeTruthy();
		expect(builder.has).toHaveBeenCalled();
		expect(builder.has).toHaveBeenCalledTimes(1);
	});

	it('Test has method.', function () {
		expect(builder.has(LogLevel.Error)).toBeFalsy();
		builder.setLog(LogLevel.Error, "New Error Log.");
		expect(builder.has(LogLevel.Warning)).toBeTruthy();
		expect(builder.has(LogLevel.Warning)).toBeTruthy();
	});

	it('Test setLog method.', function () {
		expect(builder.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(builder.getLogsByLevel(LogLevel.Error).length).toEqual(1);
		expect(builder.setLog(undefined, 'Has error.')).toBeFalsy();
		expect(builder.getLogsByLevel(undefined)).toBeUndefined();
		expect(builder.setLog(5, 'Has error.')).toBeFalsy();
		expect(builder.getLogsByLevel(5)).toBeUndefined();
	});

	it('Test getLogsByMinutes method.', function () {
		expect(builder.getLogsByMinutes(1, LogLevel.Error)).not.toBeNull();
		expect(builder.getLogsByMinutes(15, LogLevel.Warning).length).toBe(1);
		expect(builder.getLogsByMinutes(0, LogLevel.Warning).length).toBe(0);
	});

	it('should be undefined', function () {
		expect(builder.getLogsByLevel(LogLevel.Error)).toBeUndefined();
	});

	it('should be define', function () {
		expect(builder.cache).toBeDefined();
	});

	it('Expect with custom matcher, check log count in cache.', function () {
		expect(builder.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(builder.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(builder).logsCount(4);
	});

	xit('Ignore test.', function () {
		expect(builder.setLog(LogLevel.Error, "66")).toBeTruthy();
	})
});

describe('Testing "stringToNumber" function', () => {
	it('should throw Error for boolean, null, undefined', function () {
		let value: any = true;
		expect(() => {
			stringToNumber(value)
		}).toThrow(new Error(`${value} is not a string`));
		value = null;
		expect(() => {
			stringToNumber(value)
		}).toThrow(new Error(`${value} is not a string`));
		value = undefined;
		expect(() => {
			stringToNumber(value)
		}).toThrow(new Error(`${value} is not a string`))
	});

	it('should be success for "55" string.', () => {
		expect(stringToNumber('55')).toEqual(55);
	});

	it('should throw Error for not number string case.', () => {
		let value = 'Hello';
		expect(() => {
			stringToNumber(value);
		}).toThrow(new Error(`${value} can't be casted to number.`));
	});
});

xdescribe('Skip suit.', () => {
	it('Skip because with xdescribe.', function () {
		let builder = new Logger();
		expect(builder.setLog(LogLevel.Error, "66")).toBeTruthy();
	});
});

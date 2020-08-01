import {Logger} from "../src/logger";
import {LogLevel} from "../src/model/level";

/**
 * @author Gevorg Avetisyan on 8/1/2020.
 */
declare global {
	namespace jasmine {
		interface Matchers<T> {
			logsCount (expected: number): boolean;
		}
	}
}

describe('Logger class testing', () => {
	let logger = new Logger();

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

		logger.setLog(LogLevel.Warning, 'Start test mode.');
	});

	afterEach(() => {
		logger = new Logger()
	});

	it('Test getLogsByLevel method.', function () {
		expect(logger.getLogsByLevel(LogLevel.Warning).length).toBe(1);
		expect(logger.getLogsByLevel(LogLevel.Info).length).toBe(1);
		expect(logger.getLogsByLevel(LogLevel.Error)).toBeUndefined();
		expect(logger.getLogsByLevel(null)).toBeUndefined();
	});

	it('Test has method with using Spy', function () {
		let spy = spyOn(logger, 'has').and.callThrough();
		expect(logger.has(LogLevel.Warning)).toBeTruthy();
		spy.and.returnValue(false);
		expect(logger.has(LogLevel.Warning)).toBeFalsy();
		spy.and.callFake((logLevel :LogLevel)=>{
			console.log(`Fake call, there is no logLevel - ${logLevel}`);
			return true;
		});
		expect(logger.has(6)).toBe(true);
		expect(logger.has).toHaveBeenCalled();
		expect(logger.has).toHaveBeenCalledTimes(3);
	});

	it('Test has method.', function () {
		expect(logger.has(LogLevel.Error)).toBeFalsy();
		logger.setLog(LogLevel.Error, "New Error Log.");
		expect(logger.has(LogLevel.Warning)).toBeTruthy();
		expect(logger.has(LogLevel.Error)).toBeTruthy();
	});

	it('Test setLog method.', function () {
		expect(logger.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(logger.getLogsByLevel(LogLevel.Error).length).toEqual(1);
		expect(logger.setLog(undefined, 'Has error.')).toBeFalsy();
		expect(logger.getLogsByLevel(undefined)).toBeUndefined();
		expect(logger.setLog(5, 'Has error.')).toBeFalsy();
		expect(logger.getLogsByLevel(5)).toBeUndefined();
	});

	it('Test getLogsByMinutes method.', function () {
		expect(logger.getLogsByMinutes(1, LogLevel.Error)).not.toBeNull();
		expect(logger.getLogsByMinutes(15, LogLevel.Warning).length).toBe(1);
		expect(logger.getLogsByMinutes(0, LogLevel.Warning).length).toBe(0);
	});

	it('Should be undefined', function () {
		expect(logger.getLogsByLevel(LogLevel.Error)).toBeUndefined();
	});

	it('Should be define', function () {
		expect(logger.cache).toBeDefined();
	});

	it('Expect with custom matcher, check log count in cache.', function () {
		expect(logger.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(logger.setLog(LogLevel.Error, 'Has error.')).toBeTruthy();
		expect(logger).logsCount(4);
	});

	xit('Ignore test.', function () {
		expect(logger.setLog(LogLevel.Error, "66")).toBeTruthy();
	});

	describe('Inner describe.', ()=>{
		beforeEach(()=>{
			logger.setLog(LogLevel.Error, "66");
		});

		it('Check inner it.', function () {
			expect(logger.cache.size).toBeGreaterThan(2);
		});
	});

});

xdescribe('Skip suit.', () => {
	it('Skip because with xdescribe.', function () {
		let builder = new Logger();
		expect(builder.setLog(LogLevel.Error, "66")).toBeTruthy();
	});
});

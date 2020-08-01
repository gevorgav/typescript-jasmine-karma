import { LogLevel } from '../src/model/level'
import { Logger } from '../src/logger'
import { stringToNumber} from '../src/util/util'



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
		}).toThrow(new Error(`${value} is not a string`));
		value = 'Hello';
		expect(() => {
			stringToNumber(value);
		}).toThrow(new Error(`${value} can't be casted to number.`));
		value = '55';
		expect(stringToNumber(value)).toEqual(55);
	});
});

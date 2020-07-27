/**
 * @author Gevorg Avetisyan on 7/21/2020.
 */
export function stringToNumber (value: any): number {
	if (typeof value !== 'string') {
		throw Error(`${value} is not a string`)
	}
	let number: number = Number(value)
	if (isNaN(number)) {
		throw Error(`${value} can't be casted to number.`)
	}
	return number
}

export function getMinutesFromDate(date: Date): number {
	return date.getTime()/1000/60;
}

/**
 * @author Gevorg Avetisyan on 7/20/2020.
 */
export class LogModel {
	public createDate: Date;
	public message: string;

	constructor (createDate: Date, message: string) {
		this.createDate = createDate;
		this.message = message;
	}
}

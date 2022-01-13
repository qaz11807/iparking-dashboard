/**
 *
 */
export class Factory<U, T> {
    /**
     */
    constructor(private ICreator: new (data: U) => T) {
    }

    /**
     * @param {U} data
     * @return {any}
     */
    produce(data: U ) : T {
        return new this.ICreator(data);
    }
}

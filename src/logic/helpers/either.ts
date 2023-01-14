export class Either<T, U> {
  private constructor(private _is: 'left' | 'right', private _value: T | U) {}

  public static newLeft<T, U>(value: T) {
    return new Either<T, U>('left', value);
  }

  public static newRight<T, U>(value: U) {
    return new Either<T, U>('right', value);
  }

  public get isLeft(): boolean {
    return this._is === 'left';
  }

  public get isRight(): boolean {
    return this._is === 'right';
  }

  public get value(): T | U {
    return this._value;
  }

  public get left(): T | undefined {
    if (this.isLeft) {
      return this._value as T;
    }
    return undefined;
  }

  public get right(): U | undefined {
    if (this.isLeft) {
      return this._value as U;
    }
    return undefined;
  }
}

export function makeLeft<T, U>(value: T): Either<T, U> {
  return Either.newLeft(value);
}

export function makeRight<T, U>(value: U): Either<T, U> {
  return Either.newRight(value);
}
